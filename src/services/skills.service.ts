import { api } from '@/lib/api';
import type { Lang, StrapiV5Collection, Skill } from '@/types';

export function buildSkillParams(locale: Lang): Record<string, unknown> {
  return {
    locale,
    populate: {
      fields: ['name', 'type', 'icon', 'isGod'],
      overall: {
        fields: ['name', 'level'],
      },
    },
  } as const;
}

export async function getSkills(locale: Lang): Promise<StrapiV5Collection<Skill>> {
  const params = buildSkillParams(locale);
  const { data } = await api.get<StrapiV5Collection<Skill>>('/skills', { params });
  return data;
}
