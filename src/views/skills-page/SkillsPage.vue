<script setup lang="ts">
import { PageHeading, CustomButton, AngularIcon } from '@/components';
import { useGlobalBreakpoints } from '@/hooks';
import { computed } from 'vue';
import { ArrowRightIcon } from '@heroicons/vue/24/outline';

// Feature 0: Manage Style Classes
const { xs, sm, md } = useGlobalBreakpoints();

const sectionContainerCss = computed(() => {
	if (xs.value || sm.value) { return 'p-sb-side-sm gap-y-16'; }
	if (md.value) { return 'p-sb-side-base gap-y-20'; }
	return 'p-sb-side-lg gap-y-24';
});

</script>

<template>
  <PageHeading
    title="Get to know me!"
  />

  <div
    class="flex flex-col"
    :class="[sectionContainerCss,{
      'gap-y-16': xs || sm,
      'gap-y-20': md,
      'gap-y-24': !xs && !sm && !md,
    }]"
  >
    <div
      class="flex text-white "
      :class="{
        'flex-col gap-y-20 justify-center': xs || sm || md,
        'flex-row gap-x-20': !xs && !sm && !md,
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
        class="grid grid-cols-2 gap-x-10 gap-y-10 h-fit"
        :class="{
          'w-full': xs || sm || md,
          'w-[40%]': !xs && !sm && !md,
        }"
      >
        <span class="inline-flex items-center justify-center py-2 font-bold border-2 rounded-lg text-sb-xl font-roboto bg-secondary border-slate-700">
          <AngularIcon class="text-white size-12" />
          Angular
        </span>
        <span class="inline-flex items-center justify-center font-bold border-2 rounded-lg text-sb-xl font-roboto bg-secondary border-slate-700">
          <AngularIcon class="text-white size-12" />
          Angular
        </span>
        <span class="inline-flex items-center justify-center py-2 font-bold border-2 rounded-lg text-sb-xl font-roboto bg-secondary border-slate-700">
          <AngularIcon class="text-white size-12" />
          Angular
        </span>
        <span class="inline-flex items-center justify-center font-bold border-2 rounded-lg text-sb-xl font-roboto bg-secondary border-slate-700">
          <AngularIcon class="text-white size-12" />
          Angular
        </span>
        <span class="inline-flex items-center justify-center py-2 font-bold border-2 rounded-lg text-sb-xl font-roboto bg-secondary border-slate-700">
          <AngularIcon class="text-white size-12" />
          Angular
        </span>
        <span class="inline-flex items-center justify-center font-bold border-2 rounded-lg text-sb-xl font-roboto bg-secondary border-slate-700">
          <AngularIcon class="text-white size-12" />
          Angular
        </span>
      </div>
    </div>
  </div>
</template>