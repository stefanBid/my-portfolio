import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type { Lang, Skill, SkillType, StrapiV5Collection } from '@/types';

import { CACHE_CMS, makeCacheKey } from '@/lib/cache/cache-helpers';
import { TTL } from '@/config/cache.config';
import { buildSkillParams, getSkills } from '@/services';

export const useSkillsStore = defineStore('skills', () => {
  // State
  const _searchKey = ref<string>('');
  const _filterType = ref<Record<SkillType, boolean>>({
    feLanguage: true,
    beLanguage: true,
    feFramework: true,
    beFramework: true,
    database: true,
    tool: true,
    other: true,
  });
  const _skills = ref<Skill[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const skills = computed(() => {
    let filteredSkills = _skills.value;
    // Filter by type
    const activeTypes = Object.entries(_filterType.value)
      .filter(([, isActive]) => isActive)
      .map(([type]) => type as SkillType);

    filteredSkills = filteredSkills.filter((skill) => activeTypes.includes(skill.type));

    // Filter by search key
    if (_searchKey.value.trim().length > 0) {
      const searchKeyLower = _searchKey.value.toLowerCase();
      filteredSkills = filteredSkills.filter((skill) =>
        skill.name.toLowerCase().includes(searchKeyLower),
      );
    }

    // Sort by name
    filteredSkills.sort((a, b) => a.name.localeCompare(b.name));

    return filteredSkills;
  });

  // Getters

  const loadSkills = async (lang: Lang): Promise<void> => {
    isLoading.value = true;
    error.value = null;

    // 1) Try cache
    const params = buildSkillParams(lang);
    const cacheKey = makeCacheKey('/skills', params, lang);
    const cached = CACHE_CMS.get<StrapiV5Collection<Skill>>(cacheKey);

    if (cached) {
      _fillFromResponse(cached);
      isLoading.value = false;
      return;
    }

    try {
      // 2) Try fetch
      const data = await getSkills(lang);
      CACHE_CMS.set(cacheKey, data, TTL.skills);
      _fillFromResponse(data);
    } catch (e: Error | unknown) {
      error.value = (e as Error)?.message ?? 'Unable to fetch skills data';
    } finally {
      isLoading.value = false;
    }
  };

  // Setters
  const setSearchKey = (value: string): void => {
    if (value === _searchKey.value) return;
    _searchKey.value = value;
  };
  const setFilterType = (value: Record<SkillType, boolean>): void => {
    const isDifferent = Object.entries(value).some(
      ([key, val]) => _filterType.value[key as SkillType] !== val,
    );
    if (!isDifferent) return;
    _filterType.value = { ...value };
  };

  // Helpers

  function _fillFromResponse(payload: StrapiV5Collection<Skill>): void {
    _skills.value = [...payload.data];
  }

  return {
    skills,
    isLoading,
    error,
    loadSkills,
    setSearchKey,
    setFilterType,
  };
});
