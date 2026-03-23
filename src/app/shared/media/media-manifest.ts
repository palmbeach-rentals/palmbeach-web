import { AssetSet, AssetSlot, AssetVariant } from '../types/assets';
import { generatedMediaManifestByKey } from './media-manifest.generated';

const ALIAS_TO_SOURCE: Record<string, string> = {
  'logo-color': '/media/images/logo/logo-color.png',
  'logo-white': '/media/images/logo/logo-white.png',
  'hero-poster': '/media/images/cars/supercars-trio-front-lineup-coastal-hero.jpg',
};

const SLOT_PRESETS: Record<AssetSlot, { widths: number[]; formats: ('avif' | 'webp' | 'jpg' | 'png')[] }> = {
  hero: { widths: [768, 1280, 1600], formats: ['avif', 'webp', 'jpg'] },
  card: { widths: [480, 768, 1024], formats: ['avif', 'webp', 'jpg'] },
  thumb: { widths: [160, 320], formats: ['webp', 'jpg'] },
  logo: { widths: [120, 240, 360], formats: ['webp', 'png'] },
};

const CARD_NO_1024_SOURCES = new Set([
  '/media/images/yachts/yacht-bathroom-full.jpeg',
  '/media/images/yachts/yacht-bathroom-shower-suite.jpeg',
  '/media/images/yachts/yacht-cabin-guest-twin-beds.jpeg',
  '/media/images/yachts/yacht-cabin-master-bed-wide.jpeg',
  '/media/images/yachts/yacht-cabin-master-front-view.jpeg',
  '/media/images/yachts/yacht-cabin-master-side-view.jpeg',
  '/media/images/yachts/yacht-galley-modern-bar.jpeg',
  '/media/images/yachts/yacht-salon-galley-open-layout.jpeg',
  '/media/images/yachts/yacht-salon-indoor-outdoor-flow.jpeg',
  '/media/images/yachts/yacht-salon-main-seating.jpeg',
]);

function normalizeSource(assetKeyOrSource: string): string | undefined {
  const source = ALIAS_TO_SOURCE[assetKeyOrSource] ?? assetKeyOrSource;
  if (source.startsWith('/media/images/')) return source;
  return undefined;
}

function slugifySource(source: string): string {
  return source
    .replace('/media/images/', '')
    .replace(/\.[^/.]+$/, '')
    .replace(/[\\/]+/g, '-')
    .replace(/[^a-zA-Z0-9-]+/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function getAspectRatio(source: string): number {
  if (source.includes('/logo/')) return 3;
  if (source.includes('supercars-trio-front-lineup-coastal-hero')) return 1.5;
  return 16 / 9;
}

function buildVariants(source: string, slot: AssetSlot): AssetVariant[] {
  const slug = slugifySource(source);
  const ratio = getAspectRatio(source);
  const preset = SLOT_PRESETS[slot];
  const widths =
    slot === 'card' && CARD_NO_1024_SOURCES.has(source)
      ? preset.widths.filter((width) => width <= 768)
      : preset.widths;

  const variants: AssetVariant[] = [];
  for (const width of widths) {
    for (const format of preset.formats) {
      variants.push({
        src: `/media/generated/${slot}/${slug}-w${width}.${format}`,
        width,
        height: Math.round(width / ratio),
        format,
        bytes: 0,
      });
    }
  }

  return variants;
}

function getPrimarySlots(source: string): AssetSlot[] {
  if (source.includes('/logo/')) return ['logo'];
  if (source.includes('supercars-trio-front-lineup-coastal-hero')) return ['hero', 'card', 'thumb'];
  return ['card', 'thumb'];
}

function buildAssetSet(assetKeyOrSource: string): AssetSet | undefined {
  const source = normalizeSource(assetKeyOrSource);
  if (!source) {
    const fromManifest = generatedMediaManifestByKey[assetKeyOrSource];
    return fromManifest ? { ...fromManifest } : undefined;
  }

  const key = Object.entries(ALIAS_TO_SOURCE).find(([, aliasSource]) => aliasSource === source)?.[0] ?? slugifySource(source);
  const fromManifest = generatedMediaManifestByKey[key];
  if (fromManifest) {
    return { ...fromManifest };
  }

  const slots = {} as AssetSet['slots'];
  for (const slot of getPrimarySlots(source)) {
    slots[slot] = buildVariants(source, slot);
  }

  return { key, source, slots };
}

function isMeaningfulSlot(variants: AssetVariant[] | undefined): variants is AssetVariant[] {
  return Array.isArray(variants) && variants.length > 0;
}

function getVariantsForSlot(set: AssetSet | undefined, slot: AssetSlot): AssetVariant[] {
  if (!set) return [];
  const primary = set.slots[slot];
  if (isMeaningfulSlot(primary)) return [...primary].sort((a, b) => a.width - b.width);

  if (slot !== 'card' && isMeaningfulSlot(set.slots.card)) {
    return [...set.slots.card].sort((a, b) => a.width - b.width);
  }

  if (slot !== 'hero' && isMeaningfulSlot(set.slots.hero)) {
    return [...set.slots.hero].sort((a, b) => a.width - b.width);
  }

  return [];
}

export function resolveAssetSet(assetKeyOrSource: string): AssetSet | undefined {
  return buildAssetSet(assetKeyOrSource);
}

export function resolveAssetVariants(assetKeyOrSource: string, slot: AssetSlot): AssetVariant[] {
  return getVariantsForSlot(resolveAssetSet(assetKeyOrSource), slot);
}

export function resolveAssetFallbackSrc(assetKeyOrSource: string, slot: AssetSlot, fallback?: string): string {
  const set = resolveAssetSet(assetKeyOrSource);
  if (!set) return fallback ?? assetKeyOrSource;

  const variants = getVariantsForSlot(set, slot);
  const preferred =
    variants.find((variant) => variant.format === 'webp') ??
    variants.find((variant) => variant.format === 'jpg' || variant.format === 'png') ??
    variants[variants.length - 1];

  return preferred?.src ?? fallback ?? set.source;
}
