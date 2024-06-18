<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';

import { ICONS_MAP, type CustomIcon } from '@/assets';
import { IntroSection, BaseButton, ThePageContent, BaseDataList, BaseToggle, BaseInput } from '@/components';
import PageUnderConstructionAlert from '@/components/temp/page-under-construction-alert/PageUnderConstructionAlert.vue';
import { useCommonStyleSingleton, useTypedI18nSingleton, useIntersectionObserver } from '@/hooks';

// Feature 0: Internationalization (i18n)
const { currentLanguage } = useTypedI18nSingleton();

// Feature 1: Manage Style Classes
const { xs, sm, md, containerGapElements, containerPadding } = useCommonStyleSingleton();

// Feature 2: Manage Visibility for effects
const { root, isVisible, onIntersectionObserver, vIntersectionObserver } = useIntersectionObserver(1);

// Feature 2: Manage Skills

const feSkills = [
	{
		id: '1',
		name: 'Angular',
		icon: 'AngularIcon',
	},
	{
		id: '2',
		name: 'Vue',
		icon: 'VueIcon',
	},
	{
		id: '3',
		name: 'React',
		icon: 'ReactIcon',
	},
	{
		id: '4',
		name: 'TypeScript',
		icon: 'TsIcon',
	},
	{
		id: '5',
		name: 'JavaScript',
		icon: 'JsIcon',
	},
	{
		id: '6',
		name: 'Html',
		icon: 'HtmlIcon',
	},
	{
		id: '7',
		name: 'Css',
		icon: 'CssIcon',
	},
	{
		id: '8',
		name: 'Sass',
		icon: 'SassIcon',
	},
	{
		id: '9',
		name: 'Tailwind',
		icon: 'TailwindIcon',
	},

] as { id:string, name: string; icon: string }[];

const test = ref(false);
const inputValue = ref('');
</script>

<template>
  <ThePageContent
    ref="root"
  >
    <template #intro-section>
      <IntroSection
        :title="currentLanguage === 'en' ? 'Get to know me!' : 'Conoscimi meglio!'"
      />
    </template>

    <template #main-content>
      <PageUnderConstructionAlert
        v-intersection-observer="[onIntersectionObserver(0), {root, threshold: 0.5}]"
        class="transition-all duration-500 ease-in-out"
        :class="{
          'opacity-0': !isVisible[0],
          'opacity-100': isVisible[0],
        }"
      />
      <div class="flex justify-center">
        <BaseDataList
          v-if="false"
          :custom-width-css="'w-full'"
          :data="feSkills"
        >
          <template #item-extra-box="{singleDataItem}">
            <component
              :is="ICONS_MAP[singleDataItem.icon as CustomIcon]"
              class="size-14"
            />
          </template>
          <template #content-box>
            <div class="h-full border">
              <BaseToggle v-model:enabled="test" />
              <BaseInput
                v-model:input-value="inputValue"
                type="search"
                :custom-input-width="500"
                :custom-menu-height="300"
                placeholder="Search a value"
                with-menu
              >
                <template #input-menu-box>
                  Ciao Bella gente
                </template>
              </BaseInput>
            </div>
          </template>
        </BaseDataList>
      </div>

      <div
        v-if="false"
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
              <BaseButton
                custom-dimensions
                variant="secondary"
                class="px-4 py-2 mt-4"
              >
                Visita la sezione dedicata
                <ArrowRightIcon class="size-6" />
              </BaseButton>
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
              {{ s.name }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </ThePageContent>
</template>