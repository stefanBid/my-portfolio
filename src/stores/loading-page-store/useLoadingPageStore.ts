import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoadingPageStore = defineStore('loadingPage', () => {
  const isLoading = ref(false);
  return { isLoading };
});
