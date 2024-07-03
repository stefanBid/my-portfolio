<script setup lang="ts">
import { ref, onMounted, markRaw } from 'vue';
import type { Component, FunctionalComponent } from 'vue';

import { useCommonStyleSingleton } from '@/hooks';

interface BublePictureProps {
  starName: string;
 planetsIcons: Component[] | FunctionalComponent[] | string[];
}

interface Orbits {
  orbitId: string;
  orbitZIndex: number;
  orbitHeight: number;
  orbitWidth: number;
  orbitSpeed: string;
  planetName: string;
  planetIcon: Component | FunctionalComponent | string;
}

const props = withDefaults(defineProps<BublePictureProps>(), {
	starName: 'Sun',

});

// Feature 1: Manage Style Classes
const { xs, sm, md, lg } = useCommonStyleSingleton();

const orbits = ref<Orbits[]>([]);

const createStarSistem = () => {
	props.planetsIcons.forEach((icon, index) => {
		if (index > 5) { return; }
		const newIndex = index + 1;
		const newSpeed = `speed-${newIndex}`;

		orbits.value.push({
			orbitId: `orbit-${newIndex}`,
			orbitZIndex: newIndex,
			orbitHeight: 100 + newIndex * 70,
			orbitWidth: 100 + newIndex * 70,
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
	createStarSistem();
});

</script>

<template>
  <div
    :class="{
      ' scale-50 -mb-32': xs && !sm && !md && !lg,
      'scale-75 -mb-24': sm && !md && !lg && !xs,
      'scale-90 mb-20': (md || lg) && !xs && !sm,

    }"
    class="flex items-center justify-center overflow-hidden size-[600px] transition-all duration-300 ease-in-out"
  >
    <div class="absolute rounded-full size-[100px] sun z-40  flex justify-center items-center p-1">
      <span class="truncate font-bebas text-sb-2xl text-orange-950">{{ props.starName }}</span>
    </div>
    <div
      v-for="orbit in orbits"
      :key="orbit.orbitId"
      :style="{ zIndex: orbit.orbitZIndex, height: `${orbit.orbitHeight}px`, width: `${orbit.orbitWidth}px`}"
      :class="orbit.orbitSpeed"
      class="absolute bg-transparent border rounded-full borde-white orbit"
    >
      <div
        class="absolute top-0 flex items-center justify-center p-1 transform -translate-x-1/2 -translate-y-1/2 left-1/2"
      >
        <component
          :is="orbit.planetIcon"
          class="size-8"
        />
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

.orbit.speed-1 {
  animation-duration: 12s;
}

.orbit.speed-2 {
  animation-duration: 14s;
}

.orbit.speed-3 {
  animation-duration: 18s;
}

.orbit.speed-4 {
  animation-duration: 24s;
}

.orbit.speed-5 {
  animation-duration: 32s;
}

.orbit.speed-6 {
  animation-duration: 42s;
}

.orbit.speed-7 {
  animation-duration: 54s;
}

</style>