<script setup lang="ts">
import { ref, onMounted, markRaw } from 'vue';

import { Icon } from '@iconify/vue';

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
    class="relative flex items-center justify-center size-[600px] transition-all duration-300 ease-in-out scale-50 sm:scale-75 md:scale-75 lg:scale-90 my-[-160px] sm:my-[-96px] md:my-[-96px] lg:my-[-48px]"
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
        <Icon :icon="orbit.planetIcon" class="size-8" />
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
