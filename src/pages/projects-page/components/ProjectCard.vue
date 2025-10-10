<script setup lang="ts">
import { h } from 'vue';

import type { Project } from '@/types';
import { openLink } from '@/utils';

import { Icon } from '@iconify/vue';
import BaseButton from '@/components/base/button/BaseButton.vue';

interface ProjectCardProps {
  project: Project;
}

const props = defineProps<ProjectCardProps>();
</script>

<template>
  <div
    :tabindex="0"
    class="box-border relative flex flex-col items-center justify-center w-full overflow-hidden transition-all duration-300 ease-in-out border-2 rounded-lg outline-none h-52 sm:h-56 md:h-56 lg:h-64 border-sb-secondary-200 group ring-0 hover:scale-105 focus-visible:scale-105"
  >
    <!--Black Filter-->
    <div class="absolute inset-0 rounded-md bg-black/50 z-[200]"></div>
    <!--Image-->
    <img
      :alt="props.project.cover?.caption || 'Project Cover Image'"
      class="absolute inset-0 object-cover transition-all duration-300 ease-in-out rounded-md size-full z-[100]"
      :src="props.project.cover?.formats?.medium.url || ''"
    />

    <!--Title-->
    <h4
      class="absolute text-size-l left-4 top-4 sm:left-5 sm:top-5 md:left-5 md:top-5 lg:left-6 lg:top-6 text-center text-white transition-all duration-300 ease-in-out group-hover:text-sb-tertiary-100 group-focus-visible:text-sb-tertiary-100 font-bebas z-[300]"
    >
      {{ props.project.name }}
    </h4>

    <!--Buttons-->
    <div
      class="absolute flex items-center transition-all duration-300 ease-in-out z-[300] tot-gap-s right-4 bottom-4 sm:right-5 sm:bottom-5 md:right-5 md:bottom-5 lg:right-6 lg:bottom-6"
    >
      <BaseButton
        v-if="props.project.deployCta"
        :variant="props.project.deployCta.variant"
        :size="props.project.deployCta.size"
        :icon="() => h(Icon, { icon: props.project.deployCta!.icon || '' })"
        @click.stop="
          () => (props.project.deployCta!.link ? openLink(props.project.deployCta!.link) : null)
        "
      >
        {{ props.project.deployCta.text }}
      </BaseButton>

      <BaseButton
        v-if="props.project.codebaseCta"
        :variant="props.project.codebaseCta.variant"
        :size="props.project.codebaseCta.size"
        :icon="
          () =>
            props.project.codebaseCta!.icon
              ? h(Icon, { icon: props.project.codebaseCta!.icon })
              : undefined
        "
        @click.stop="
          () => (props.project.codebaseCta!.link ? openLink(props.project.codebaseCta!.link) : null)
        "
      >
        {{ props.project.codebaseCta.text }}
      </BaseButton>
    </div>
  </div>
</template>
