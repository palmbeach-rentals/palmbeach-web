import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, 'public');
const imagesRoot = path.join(publicDir, 'media', 'images');
const outputRoot = path.join(publicDir, 'media', 'generated');
const generatedManifestPath = path.join(projectRoot, 'src', 'app', 'shared', 'media', 'media-manifest.generated.ts');
const strictBudgets = process.argv.includes('--strict-budgets');

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);

const SLOT_CONFIG = {
  hero: {
    widths: [768, 1280, 1600],
    budgetBytes: 180 * 1024,
    formats: [
      { format: 'avif', quality: 48 },
      { format: 'webp', quality: 72 },
      { format: 'jpeg', quality: 78 },
    ],
  },
  card: {
    widths: [480, 768, 1024],
    budgetBytes: 220 * 1024,
    formats: [
      { format: 'avif', quality: 45 },
      { format: 'webp', quality: 68 },
      { format: 'jpeg', quality: 76 },
    ],
  },
  thumb: {
    widths: [160, 320],
    budgetBytes: 35 * 1024,
    formats: [
      { format: 'webp', quality: 58 },
      { format: 'jpeg', quality: 62 },
    ],
  },
  logo: {
    widths: [120, 240, 360],
    budgetBytes: 60 * 1024,
    formats: [
      { format: 'webp', quality: 86 },
      { format: 'png' },
    ],
  },
};

const keyAliases = new Map([
  ['logo/logo-color.png', 'logo-color'],
  ['logo/logo-white.png', 'logo-white'],
  ['cars/supercars-trio-front-lineup-coastal-hero.jpg', 'hero-poster'],
]);

function toPublicPath(absPath) {
  return `/${path.relative(publicDir, absPath).replace(/\\/g, '/')}`;
}

function slugify(relativePath) {
  return relativePath
    .replace(/\.[^/.]+$/, '')
    .replace(/[\\/]+/g, '-')
    .replace(/[^a-zA-Z0-9-]+/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function getSlots(relativePath) {
  if (relativePath.startsWith('logo/')) return ['logo'];
  if (relativePath.includes('supercars-trio-front-lineup-coastal-hero')) return ['hero', 'card', 'thumb'];
  return ['card', 'thumb'];
}

async function walkFiles(dir, collected = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkFiles(fullPath, collected);
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    if (IMAGE_EXTENSIONS.has(ext)) {
      collected.push(fullPath);
    }
  }
  return collected;
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function generateVariant(inputPath, outputPath, formatConfig, width) {
  let transformer = sharp(inputPath).resize({
    width,
    withoutEnlargement: true,
    fit: 'inside',
  });

  if (formatConfig.format === 'avif') {
    transformer = transformer.avif({ quality: formatConfig.quality });
  } else if (formatConfig.format === 'webp') {
    transformer = transformer.webp({ quality: formatConfig.quality, effort: 5 });
  } else if (formatConfig.format === 'jpeg') {
    transformer = transformer.jpeg({ quality: formatConfig.quality, mozjpeg: true });
  } else if (formatConfig.format === 'png') {
    transformer = transformer.png({ compressionLevel: 9, palette: true });
  }

  return transformer.toFile(outputPath);
}

function formatToExtension(format) {
  if (format === 'jpeg') return 'jpg';
  return format;
}

function getKey(relativePath) {
  return keyAliases.get(relativePath) ?? slugify(relativePath);
}

async function main() {
  await ensureDir(outputRoot);

  const files = await walkFiles(imagesRoot);
  const manifestByKey = {};
  const budgetViolations = [];
  let generatedCount = 0;

  for (const absInputPath of files) {
    const relativePath = path.relative(imagesRoot, absInputPath).replace(/\\/g, '/');
    const source = `/media/images/${relativePath}`;
    const slots = getSlots(relativePath);
    const key = getKey(relativePath);

    const metadata = await sharp(absInputPath).metadata();
    if (!metadata.width || !metadata.height) {
      continue;
    }

    const slug = slugify(relativePath);
    const slotResults = {};

    for (const slot of slots) {
      const config = SLOT_CONFIG[slot];
      if (!config) continue;

      const targetWidths = [...new Set(config.widths.map((w) => Math.min(w, metadata.width)))].sort((a, b) => a - b);
      const variants = [];

      for (const width of targetWidths) {
        for (const formatConfig of config.formats) {
          const ext = formatToExtension(formatConfig.format);
          const outDir = path.join(outputRoot, slot);
          await ensureDir(outDir);
          const outPath = path.join(outDir, `${slug}-w${width}.${ext}`);

          const outInfo = await generateVariant(absInputPath, outPath, formatConfig, width);
          variants.push({
            src: toPublicPath(outPath),
            width: outInfo.width,
            height: outInfo.height,
            format: ext,
            bytes: outInfo.size,
          });
          generatedCount += 1;
        }
      }

      variants.sort((a, b) => a.width - b.width || a.bytes - b.bytes);
      slotResults[slot] = variants;

      const largestVariant = variants.reduce((max, candidate) => Math.max(max, candidate.bytes), 0);
      if (largestVariant > config.budgetBytes) {
        budgetViolations.push({
          source,
          slot,
          bytes: largestVariant,
          budget: config.budgetBytes,
        });
      }
    }

    manifestByKey[key] = {
      key,
      source,
      slots: slotResults,
    };
  }

  const persistedKeys = ['hero-poster', 'logo-color', 'logo-white'];
  const persistedManifest = {};
  for (const key of persistedKeys) {
    if (manifestByKey[key]) {
      persistedManifest[key] = manifestByKey[key];
    }
  }

  const manifestFile = `import { MediaManifest } from '../types/assets';

// Auto-generated by scripts/media/generate-media-variants.mjs
// Do not edit manually.
export const generatedMediaManifestByKey: MediaManifest = ${JSON.stringify(persistedManifest, null, 2)};
`;

  await fs.writeFile(generatedManifestPath, manifestFile, 'utf8');

  console.log(`[media:build] Processed ${files.length} source images and generated ${generatedCount} variants.`);
  console.log(`[media:build] Wrote manifest: ${path.relative(projectRoot, generatedManifestPath)}`);

  if (budgetViolations.length > 0) {
    console.warn('[media:build] Budget warnings:');
    for (const violation of budgetViolations) {
      console.warn(
        `  - ${violation.source} (${violation.slot}) => ${(violation.bytes / 1024).toFixed(1)}KB > ${(violation.budget / 1024).toFixed(1)}KB`,
      );
    }
    if (strictBudgets) {
      process.exitCode = 1;
    }
  } else {
    console.log('[media:build] All generated variants are within configured budgets.');
  }
}

main().catch((error) => {
  console.error('[media:build] Failed:', error);
  process.exit(1);
});
