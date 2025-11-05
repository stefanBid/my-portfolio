import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type { Lang, Project, StrapiV5Collection } from '@/types';
import { ApiError } from '@/lib/api-error';
import { CACHE_CMS, makeCacheKey } from '@/lib/cache/cache-helpers';
import { TTL } from '@/config/cache.config';
import { buildProjectParams, getProjects } from '@/services';

export const useProjectsStore = defineStore('projects', () => {
  // State
  const _projects = ref<Project[]>([]);
  const isLoading = ref(false);
  const error = ref<ApiError | null>(null);

  const projects = computed(() => {
    let filteredProjects = _projects.value;
    return filteredProjects.sort((a, b) => a.name.localeCompare(b.name));
  });

  // Getters

  const loadProjects = async (lang: Lang): Promise<void> => {
    isLoading.value = true;
    error.value = null;

    // 1) Try cache
    const params = buildProjectParams(lang);
    const cacheKey = makeCacheKey('/projects', params, lang);
    const cached = CACHE_CMS.get<StrapiV5Collection<Project>>(cacheKey);

    if (cached) {
      _fillFromResponse(cached);
      isLoading.value = false;
      return;
    }

    try {
      // 2) Try fetch
      const data = await getProjects(lang);
      CACHE_CMS.set(cacheKey, data, TTL.projects);
      _fillFromResponse(data);
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const status = (err as any)?.response?.status ?? 0;
      const message = (err as Error).message ?? 'Unexpected error';

      error.value = new ApiError(status, message, err);
      throw error.value;
    } finally {
      isLoading.value = false;
    }
  };

  // Helpers

  function _fillFromResponse(payload: StrapiV5Collection<Project>): void {
    _projects.value = [...payload.data];
  }

  return {
    projects,
    isLoading,
    error,
    loadProjects,
  };
});
