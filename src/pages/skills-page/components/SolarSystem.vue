<script setup lang="ts">
import { ref, onMounted, markRaw, computed } from 'vue';
import { BaseIcon } from '@/components';
import { useStyleStore } from '@/stores';

interface SkillSolarSystemProps {
  starName: string;
  planetsIcons: string[];
}

interface Orbits {
  orbitId: string;
  orbitZIndex: number;
  orbitHeight: number;
  orbitWidth: number;
  orbitSpeed: number;
  planetName: string;
  planetIcon: string;
}

const props = withDefaults(defineProps<SkillSolarSystemProps>(), {
  starName: 'Sun',
});

// Store Declarations
const styleStore = useStyleStore();

const scaleMargin = computed(() => {
  let scale = 1;
  let margin = 0;

  if (styleStore.activeBreakpoint === 'xs') {
    scale = 0.5;
    margin = 64; // Original gap for xs (gap-y-16 in Tailwind is 64px)
  }
  if (styleStore.activeBreakpoint === 'sm') {
    scale = 0.75;
    margin = 80; // Original gap for sm (gap-y-20 in Tailwind is 80px)
  }
  if (styleStore.activeBreakpoint !== 'xs' && styleStore.activeBreakpoint !== 'sm') {
    scale = 0.9;
    margin = 96; // Original gap for md/lg (gap-y-24 in Tailwind is 96px)
  }

  return `-${4 * (1 - scale) * margin}px`;
});

// Feature 2: Create Solar System
const maxNumberOfPlanets = 6;
const orbits = ref<Orbits[]>([]);

const createStarSistem = (planets: string[]): void => {
  const baseSpeed = 12;
  const baseOrbitSize = 100;
  planets.forEach((icon, index) => {
    const newIndex = index + 1;
    const newSpeed = baseSpeed * newIndex;
    const newOrbitSize = baseOrbitSize + newIndex * 75.8;
    orbits.value.push({
      orbitId: `orbit-${newIndex}`,
      orbitZIndex: newIndex,
      orbitHeight: newOrbitSize,
      orbitWidth: newOrbitSize,
      orbitSpeed: newSpeed,
      planetName: `planet-${newIndex}`,
      // Fixes the error: Argument of type 'string | Component | FunctionalComponent<{}, {}, any, {}>' is not assignable to parameter of type 'object'.
      // Type 'string' is not assignable to type 'object'.
      // We use markRaw to ensure that Vue does not make the component reactive, which avoids unnecessary performance overhead.
      planetIcon: typeof icon === 'string' ? icon : markRaw(icon),
    });
  });
};

onMounted(() => {
  const icons: string[] = [...props.planetsIcons] as string[];
  const randomIcons = icons.sort(() => Math.random() - 0.5).slice(0, maxNumberOfPlanets);
  createStarSistem(randomIcons);
});
</script>

<template>
  <div
    :class="{
      'scale-50': styleStore.activeBreakpoint === 'xs',
      'scale-75': styleStore.activeBreakpoint === 'sm',
      'scale-90': styleStore.activeBreakpoint !== 'xs' && styleStore.activeBreakpoint !== 'sm',
    }"
    :style="{ marginTop: scaleMargin, marginBottom: scaleMargin }"
    class="relative flex items-center justify-center size-[600px] transition-all duration-300 ease-in-out"
  >
    <div class="absolute rounded-full size-[100px] sun z-40 flex justify-center items-center p-1">
      <span class="truncate font-bebas text-sb-2xl text-orange-950">{{ props.starName }}</span>
    </div>
    <div
      v-for="orbit in orbits"
      :key="orbit.orbitId"
      :style="{
        zIndex: orbit.orbitZIndex,
        height: `${orbit.orbitHeight}px`,
        width: `${orbit.orbitWidth}px`,
        animationDuration: `${orbit.orbitSpeed}s`,
      }"
      :class="orbit.orbitSpeed"
      class="absolute bg-transparent border border-white rounded-full orbit"
    >
      <div
        class="absolute top-0 flex items-center justify-center p-1 transform -translate-x-1/2 -translate-y-1/2 left-1/2"
      >
        <BaseIcon :icon="orbit.planetIcon" class="size-8" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.sun {
  background: radial-gradient(circle, rgba(255, 223, 0, 1), rgba(255, 140, 0, 1));
  box-shadow: 0 0 20px rgba(255, 223, 0, 0.8);
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.orbit {
  animation: rotate linear infinite;
}
</style>
