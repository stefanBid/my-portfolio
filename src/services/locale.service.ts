import { api } from '@/lib/api';
import type { StrapiLocale } from '@/types';

export async function getLocales(): Promise<StrapiLocale[]> {
  const { data } = await api.get<StrapiLocale[]>('/i18n/locales');
  return data;
}
