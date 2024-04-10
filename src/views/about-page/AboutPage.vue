<script setup lang="ts">
import { PageHeading, VintageImageContainer } from '@/components';
import { vIntersectionObserver } from '@vueuse/components';
import { useGlobalBreakpoints } from '@/hooks';

import bio from '@/data/bio.json';
import { ref } from 'vue';

const initializeBooleanArray = (structure: {[key:string]:string}[]) => {
	let arr: boolean[] = [];
	structure.forEach(() => arr.push(false));
	return arr;
};

const root = ref(null);
const isVisible = ref<boolean[]>(initializeBooleanArray(bio.sections));

const onIntersectionObserver = (index: number) => ([{ isIntersecting }]: IntersectionObserverEntry[]) => {
	isVisible.value[index] = isIntersecting;
};

const { xs, sm, md } = useGlobalBreakpoints();

</script>

<template>
  <div
    ref="root"
    class=" div_container"
  >
    <PageHeading
      title="Who am I?"
    />

    <div
      :class="
        {
          'gap-y-28': xs || sm || md,
          'gap-y-20': !xs && !sm && !md,
        }
      "
      class="flex flex-col mt-5 mb-10 "
    >
      <div
        v-for="(section, index) in bio.sections"
        :key="index"
        v-intersection-observer="[onIntersectionObserver(index), {root, threshold: 0.05}]"
        :class="{
          'flex-row gap-x-10': index % 2 === 0 && !xs && !sm && !md,
          'flex-row-reverse gap-x-10': index % 2 !== 0 && !xs && !sm && !md,
          'flex-col items-center gap-y-5': xs || sm || md,
          'opacity-0': !isVisible[index],
          'opacity-100': isVisible[index],
        }"
        class="flex px-8 transition-all duration-500 ease-in-out"
      >
        <VintageImageContainer
          :image-url="section.image"
          :text="section.imageDescription"
          :class="{
            '-rotate-2': index % 2 === 0,
            'rotate-2': index % 2 !== 0,
          }"
          class="mt-2 shrink-0 h-fit"
        />
        <div class="flex flex-col justify-center flex-1 ">
          <h1
            :class="{
              'text-[3.5rem]': !xs && !sm && !md,
              'text-[3rem]': xs || sm || md,
            }"
            class="text-white whitespace-normal transition-all duration-300 ease-in-out font-bebas"
          >
            {{ section.title }}
          </h1>
          <p
            :class="{
              'text-[1.25rem]': !xs && !sm && !md,
              'text-[1rem]': xs || sm || md,
            }"
            class="text-justify text-white whitespace-normal transition-all duration-300 ease-in-out font-roboto"
          >
            {{ section.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.div_container {
  overflow-y: hidden;
}
</style>
