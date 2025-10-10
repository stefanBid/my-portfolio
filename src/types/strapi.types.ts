export type Lang = 'en' | 'it';

export type StrapiV5Single<T> = {
  data: T;
  meta: Record<string, unknown>;
};

export type StrapiV5Collection<T> = {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export interface StrapiLocale {
  id: number;
  name: string;
  code: string;
  isDefault: boolean;
}

export interface StrapiFormatV5 {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number; // KB
  width: number;
  height: number;
  sizeInBytes?: number; // on strapi cloud
}

export interface StrapiMediaFileV5 {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats?: Record<'large' | 'medium' | 'small' | 'thumbnail', StrapiFormatV5> | null; // per immagini
  hash: string;
  ext: string | null; // ".png", ".mp4", ecc.
  mime: string; // "image/png", "video/mp4", ...
  size: number; // KB
  url: string; // absolute URL (if hosted on Strapi Cloud) or relative URL
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
