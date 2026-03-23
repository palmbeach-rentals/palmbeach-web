import { ImgHTMLAttributes } from 'react';
import { AssetSlot } from '../types/assets';
import { resolveAssetFallbackSrc, resolveAssetVariants } from './media-manifest';

type NativeImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'>;

interface ResponsiveImageProps extends NativeImageProps {
  assetKey: string;
  slot: AssetSlot;
  fallbackSrc?: string;
  pictureClassName?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
}

function buildSrcSetByFormat(
  variants: ReturnType<typeof resolveAssetVariants>,
  format: 'avif' | 'webp',
): string {
  return variants
    .filter((variant) => variant.format === format)
    .map((variant) => `${variant.src} ${variant.width}w`)
    .join(', ');
}

export function ResponsiveImage({
  assetKey,
  slot,
  fallbackSrc,
  pictureClassName,
  alt,
  loading = 'lazy',
  decoding = 'async',
  width,
  height,
  sizes,
  fetchPriority,
  ...imgProps
}: ResponsiveImageProps) {
  const variants = resolveAssetVariants(assetKey, slot);
  const avifSrcSet = buildSrcSetByFormat(variants, 'avif');
  const webpSrcSet = buildSrcSetByFormat(variants, 'webp');

  const fallbackVariant =
    variants.find((variant) => variant.format === 'webp') ??
    variants.find((variant) => variant.format === 'jpg' || variant.format === 'jpeg' || variant.format === 'png') ??
    variants[variants.length - 1];

  const resolvedSrc = resolveAssetFallbackSrc(assetKey, slot, fallbackSrc);
  const resolvedWidth = width ?? fallbackVariant?.width;
  const resolvedHeight = height ?? fallbackVariant?.height;

  return (
    <picture className={pictureClassName}>
      {avifSrcSet && <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />}
      {webpSrcSet && <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />}
      <img
        src={resolvedSrc}
        alt={alt}
        loading={loading}
        decoding={decoding}
        width={resolvedWidth}
        height={resolvedHeight}
        sizes={sizes}
        // @ts-expect-error -- fetchPriority is valid HTML, but older React typings can lag.
        fetchPriority={fetchPriority}
        {...imgProps}
      />
    </picture>
  );
}
