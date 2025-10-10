// src/config/cache.ts
export const CACHE_CMS_NAMESPACE = import.meta.env.VITE_CMS_CACHE_NS ?? 'cms';
export const CACHE_GENERAL_NAMESPACE = import.meta.env.VITE_GENERAL_CACHE_NS ?? 'general';

export const CACHE_VERSION = import.meta.env.VITE_CMS_CACHE_VER ?? '1';

// Specific TTL (sec)
export const TTL = {
  locale: Number(import.meta.env.VITE_TTL_LOCALE ?? 86400),
  portfolio: Number(import.meta.env.VITE_TTL_PORTFOLIO ?? 3600),
  skills: Number(import.meta.env.VITE_TTL_SKILLS ?? 900),
  projects: Number(import.meta.env.VITE_TTL_PROJECTS ?? 900),
} as const;

// Default TTL (sec)
export const DEFAULT_TTL_SEC = 3600;
