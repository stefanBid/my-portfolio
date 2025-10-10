import { api } from '@/lib/api';
import type { Lang, StrapiV5Collection, Project } from '@/types';

export function buildProjectParams(locale: Lang): Record<string, unknown> {
  return {
    locale,
    populate: {
      fields: ['name'],
      codebaseCta: true,
      cover: true,
      deployCta: true,
    },
  } as const;
}

export async function getProjects(locale: Lang): Promise<StrapiV5Collection<Project>> {
  const params = buildProjectParams(locale);
  const { data } = await api.get<StrapiV5Collection<Project>>('/projects', { params });
  return data;
}
