<script setup lang="ts">
import { ThePageContainer } from '@/components';
import { useI18nStore, useTitleStore, useStyleStore } from '@/stores';
import { ref, watch } from 'vue';
import { vIntersectionObserver } from '@vueuse/components';

// Store Declarations
const styleStore = useStyleStore();
const i18nStore = useI18nStore();
const titleStore = useTitleStore();

// Feature 1: Page Title
watch(
  () => i18nStore.currentLanguage,
  (newValue) => {
    titleStore.setTitleSuffix(newValue === 'it' ? 'Termini e condizioni' : 'Terms and Conditions');
  },
  { immediate: true },
);

// Feature 2: Manage Intersection Observer
const isVisible = ref(false);

const onIntersectionObserver = ([{ isIntersecting }]: IntersectionObserverEntry[]): void => {
  if (isIntersecting !== isVisible.value) {
    isVisible.value = isIntersecting;
  }
};
</script>

<template>
  <ThePageContainer :page-intro-text="i18nStore.termsAndConditionsPageI18nContent.pageHeading">
    <template #page-content>
      <div
        v-intersection-observer="[onIntersectionObserver, { root: null, threshold: 0.1 }]"
        :class="{
          'opacity-0': !isVisible,
          'opacity-100': isVisible,
        }"
        class="p-8 space-y-10 text-white border-2 border-dashed rounded-lg border-sb-secondary-200 font-roboto transition-all duration-300 ease-in-out"
      >
        <!-- Terms and Conditions Content -->
        <div id="termsAndConditions">
          <h2
            class="whitespace-normal transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas"
            :class="[
              styleStore.textSizeXL,
              {
                'text-center':
                  styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
                'text-left':
                  styleStore.activeBreakpoint !== 'xs' && styleStore.activeBreakpoint !== 'sm',
              },
            ]"
          >
            {{ i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.title }}
          </h2>

          <span class="italic" :class="[styleStore.textSizeS]">
            {{ i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.lastUpdate }}
          </span>

          <p class="mt-4 text-justify whitespace-normal" :class="[styleStore.textSizeS]">
            {{ i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.description }}
          </p>
        </div>

        <!-- Terms and Conditions Services Description -->
        <div id="termsAndConditionsServicesDescription">
          <h3
            class="whitespace-normal transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas"
            :class="[
              styleStore.textSizeL,
              {
                'text-center':
                  styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
                'text-left':
                  styleStore.activeBreakpoint !== 'xs' && styleStore.activeBreakpoint !== 'sm',
              },
            ]"
          >
            {{
              i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.serviceDescription
                .title
            }}
          </h3>

          <p class="mt-4 text-justify whitespace-normal" :class="[styleStore.textSizeS]">
            {{
              i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.serviceDescription
                .content
            }}
          </p>
        </div>

        <!-- Terms And Conditions User Obligations -->
        <div id="termsAndConditionsUserObligations">
          <h3
            class="whitespace-normal transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas"
            :class="[
              styleStore.textSizeL,
              {
                'text-center':
                  styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
                'text-left':
                  styleStore.activeBreakpoint !== 'xs' && styleStore.activeBreakpoint !== 'sm',
              },
            ]"
          >
            {{
              i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.userObligations.title
            }}
          </h3>

          <p class="mt-4 text-justify whitespace-normal" :class="[styleStore.textSizeS]">
            {{
              i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.userObligations
                .description
            }}
          </p>
          <ul class="ml-8 list-disc">
            <li
              v-for="(data, index) in i18nStore.termsAndConditionsPageI18nContent.termsAndConditions
                .userObligations.points"
              :key="index"
              class="mt-2"
              :class="[styleStore.textSizeS]"
            >
              {{ data }}
            </li>
          </ul>
          <p class="mt-4 text-justify whitespace-normal" :class="[styleStore.textSizeS]">
            {{
              i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.userObligations.note
            }}
          </p>
        </div>

        <!-- Terms And Conditions Liability Limitation  -->
        <div id="termsAndConditionsLiabilityLimitation">
          <h3
            class="whitespace-normal transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas"
            :class="[
              styleStore.textSizeL,
              {
                'text-center':
                  styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
                'text-left':
                  styleStore.activeBreakpoint !== 'xs' && styleStore.activeBreakpoint !== 'sm',
              },
            ]"
          >
            {{
              i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.liabilityLimitations
                .title
            }}
          </h3>

          <p class="mt-4 text-justify whitespace-normal" :class="[styleStore.textSizeS]">
            {{
              i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.liabilityLimitations
                .description
            }}
          </p>
          <ul class="ml-8 list-disc">
            <li
              v-for="(data, index) in i18nStore.termsAndConditionsPageI18nContent.termsAndConditions
                .liabilityLimitations.points"
              :key="index"
              class="mt-2"
              :class="[styleStore.textSizeS]"
            >
              {{ data }}
            </li>
          </ul>
        </div>

        <!-- Terms And Conditions Intellectual Property -->
        <div id="termsAndConditionsIntellectualProperty">
          <h3
            class="whitespace-normal transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas"
            :class="[
              styleStore.textSizeL,
              {
                'text-center':
                  styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
                'text-left':
                  styleStore.activeBreakpoint !== 'xs' && styleStore.activeBreakpoint !== 'sm',
              },
            ]"
          >
            {{
              i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.intellectualProperty
                .title
            }}
          </h3>

          <p class="mt-4 text-justify whitespace-normal" :class="[styleStore.textSizeS]">
            {{
              i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.intellectualProperty
                .content
            }}
          </p>
        </div>

        <!-- Terms And Conditions Legal -->
        <div id="termsAndConditionsLegal">
          <h3
            class="whitespace-normal transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas"
            :class="[
              styleStore.textSizeL,
              {
                'text-center':
                  styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
                'text-left':
                  styleStore.activeBreakpoint !== 'xs' && styleStore.activeBreakpoint !== 'sm',
              },
            ]"
          >
            {{ i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.legal.title }}
          </h3>

          <p class="mt-4 text-justify whitespace-normal" :class="[styleStore.textSizeS]">
            {{ i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.legal.description }}
          </p>
          <ul class="ml-8 list-disc">
            <li
              v-for="(data, index) in i18nStore.termsAndConditionsPageI18nContent.termsAndConditions
                .legal.points"
              :key="index"
              class="mt-2"
              :class="[styleStore.textSizeS]"
            >
              {{ data }}
            </li>
          </ul>
        </div>

        <!-- Terms And Conditions Modification -->
        <div id="termsAndConditionsModification">
          <h3
            class="whitespace-normal transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas"
            :class="[
              styleStore.textSizeL,
              {
                'text-center':
                  styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
                'text-left':
                  styleStore.activeBreakpoint !== 'xs' && styleStore.activeBreakpoint !== 'sm',
              },
            ]"
          >
            {{ i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.modifications.title }}
          </h3>

          <p class="mt-4 text-justify whitespace-normal" :class="[styleStore.textSizeS]">
            {{
              i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.modifications.content
            }}
          </p>
        </div>
      </div>
    </template>
  </ThePageContainer>
</template>
