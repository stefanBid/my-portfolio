<script setup lang="ts">
import AppContainer from '@/components/layouts/app-container/AppContainer.vue';
import { CACHE, makeCacheKey } from '@/lib/cache/cache-helpers';

const key = makeCacheKey('/portfolio', { locale: 'en' }, 'en');

const value = { hello: 'world' } as const; // <-- DEFINITA qui
CACHE.set<typeof value>(key, value, 60); // TTL 5s

const hitNow = CACHE.get<typeof value>(key);
console.log('GET subito:', hitNow); // -> { hello: "world" }

setTimeout(() => {
  const hitLater = CACHE.get<typeof value>(key);
  console.log('GET dopo 6s:', hitLater); // -> null (scaduta)
}, 6000);
</script>

<template>
  <AppContainer />
</template>
