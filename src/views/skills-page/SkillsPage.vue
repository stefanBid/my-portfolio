<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/24/outline';
import { vIntersectionObserver } from '@vueuse/components';
import { ref } from 'vue';

import { PageHeading, CustomButton, CustomIcon } from '@/components';
import { useCommonStyle } from '@/hooks';

// Feature 0: Manage Style Classes
const { xs, sm, md, containerStyle, containerGapElements, containerPadding } = useCommonStyle();

// Feature 1: Manage Visibility for effects
const root = ref(null);
const isVisible = ref<boolean[]>([false]);

const onIntersectionObserver = (index: number) => ([{ isIntersecting }]: IntersectionObserverEntry[]) => {
	isVisible.value[index] = isIntersecting;
};

// Feature 2: Manage Skills

const feSkills = [
	{
		name: 'Angular',
		icon: 'AngularIcon',
	},
	{
		name: 'Vue',
		icon: 'VueIcon',
	},
	{
		name: 'React',
		icon: 'ReactIcon',
	},
	{
		name: 'TypeScript',
		icon: 'TypeScriptIcon',
	},
	{
		name: 'JavaScript',
		icon: 'JavaScriptIcon',
	},
	{
		name: 'Html',
		icon: 'HtmlIcon',
	},
	{
		name: 'Css',
		icon: 'CssIcon',
	}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
] as { name: string; icon: any }[];
</script>

<template>
  <div
    ref="root"
    :style="containerStyle"
  >
    <PageHeading
      title="Get to know me!"
    />

    <div
      :class="[containerPadding, containerGapElements]"
      class="flex flex-col mt-5 mb-10"
    >
      <div
        v-for="(el, index) in isVisible.length"
        :key="el"
        v-intersection-observer="[onIntersectionObserver(index), {root, threshold: 0.05}]"
        class="flex px-4 text-white transition-all duration-500 ease-in-out"
        :class="{
          'flex-col gap-y-20 justify-center': xs || sm || md,
          'flex-row gap-x-20': !xs && !sm && !md,
          'opacity-0': !isVisible[index],
          'opacity-100': isVisible[index],
        }"
      >
        <div
          class="space-y-8 "
          :class="{
            'w-full': xs || sm || md,
            'w-[60%]': !xs && !sm && !md,
          }"
        >
          <div class="block">
            <h1 class="text-white font-bebas text-sb-5xl">
              Lorem ipsum
            </h1>
            <p class="text-justify text-white whitespace-normal font-roboto">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam voluptate nam molestias nostrum, earum deleniti dicta praesentium, veritatis atque temporibus voluptates placeat debitis inventore numquam quo nisi sed reiciendis commodi.
            </p>
          </div>

          <div class="block">
            <h2 class="font-semibold text-white font-roboto text-sb-xl">
              Sei una Risorsa Umana?
            </h2>
            <p class="text-justify text-white whitespace-normal font-roboto">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam voluptate nam molestias nostrum, earum deleniti dicta praesentium, veritatis atque temporibus voluptates placeat debitis inventore numquam quo nisi sed reiciendis commodi.
            </p>
            <CustomButton
              custom-dimensions
              variant="secondary"
              class="px-4 py-2 mt-4"
            >
              Visita la sezione dedicata
              <ArrowRightIcon class="size-6" />
            </CustomButton>
          </div>
        </div>
        <div
          class="flex flex-row flex-wrap items-center justify-between gap-x-10 gap-y-10 h-fit"
          :class="{
            'w-full': xs || sm || md,
            'w-[40%]': !xs && !sm && !md,
          }"
        >
          <span
            v-for="(s) in feSkills"
            :key="s.name"
            class="flex-1 inline-flex gap-x-1.5 items-center justify-center font-bold text-sb-xl font-roboto"
          >
            <CustomIcon
              :name="s.icon"
              class="size-12"
            />
            {{ s.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>