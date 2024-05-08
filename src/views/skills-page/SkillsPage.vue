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
          class="my-auto space-y-8"
          :class="{
            'w-full': xs || sm || md,
            'w-[40%]': !xs && !sm && !md,
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
          class="grid gap-10 p-4 border-2 border-slate-700 rounded-xl"
          :class="{
            'w-full': xs || sm || md,
            'w-[60%]': !xs && !sm && !md,
            'grid-cols-2': !xs,
            'grid-cols-1': xs,
          }"
        >
          <div
            v-for="(s, i) in feSkills"
            :key="i"
            class="inline-flex items-center p-4 font-bold border-2 rounded-xl gap-x-2 font-roboto border-slate-700 bg-secondary h-fit"
            :class="{
              'text-sb-lg': !xs && !sm,
              'text-sb-base ': sm || xs,
            }"
          >
            <CustomIcon
              :name="s.icon"
              class=" shrink-0"
              :class="{
                'size-8': xs || sm,
                'size-9': md && !sm && !xs,
                'size-11': !xs && !sm && !md,
              }"
            />
            {{ s.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>