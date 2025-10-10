<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useHead } from '@unhead/vue';
import { usePortfolioStore } from '@/stores';

import AppPageContainer from '@/components/layouts/page-container/AppPageContainer.vue';
import AppDivider from '@/components/layouts/divider/AppDivider.vue';
import BaseSection from '@/components/base/section/BaseSection.vue';
import VintagePicture from '@/pages/about-page/components/VintagePicture.vue';

// Dependencies
const { aboutMeData } = storeToRefs(usePortfolioStore());

// State
useHead({
  title: computed(() => aboutMeData.value.pageMeta.title),
  meta: computed(() => [
    {
      name: 'description',
      content: aboutMeData.value.pageMeta.description,
    },
  ]),
});
</script>

<template>
  <AppPageContainer :page-intro-text="aboutMeData.startTitle">
    <template #page-content>
      <AppDivider v-for="(bs, index) in aboutMeData.bio" :key="index" animation="scaleAndFade">
        <template #default="{ isVisible }">
          <BaseSection
            :inverted="index % 2 === 0 ? false : true"
            :title="bs.title"
            :subtitle="bs.subtitle"
            :paragraph="bs.paragraph || ''"
          >
            <template #extra-content>
              <VintagePicture
                v-if="bs.cover"
                :image-path="bs.cover.formats?.large.url || ''"
                :text="bs.cover.caption || ''"
                :is-visible="isVisible"
                :class="{
                  '-rotate-2': index % 2 === 0,
                  'rotate-2': index % 2 !== 0,
                }"
                class="shrink-0"
              />
            </template>
          </BaseSection>
        </template>
      </AppDivider>
    </template>
  </AppPageContainer>
</template>
