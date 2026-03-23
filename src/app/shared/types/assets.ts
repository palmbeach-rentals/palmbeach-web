export type AssetSlot = 'hero' | 'card' | 'thumb' | 'logo';

export type AssetFormat = 'avif' | 'webp' | 'jpg' | 'jpeg' | 'png';

export interface AssetVariant {
  src: string;
  width: number;
  height: number;
  format: AssetFormat;
  bytes: number;
}

export interface AssetSet {
  key: string;
  source: string;
  slots: Partial<Record<AssetSlot, AssetVariant[]>>;
}

export type MediaManifest = Record<string, AssetSet>;
