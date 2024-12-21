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
    titleStore.setTitleSuffix(newValue === 'it' ? 'Politica sulla riservatezza' : 'Privacy Policy');
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
  <ThePageContainer :page-intro-text="i18nStore.privacyPolicyPageI18nContent.pageHeading">
    <template #page-content>
      <div
        v-intersection-observer="[onIntersectionObserver, { root: null, threshold: 0.1 }]"
        :class="{
          'opacity-0': !isVisible,
          'opacity-100': isVisible,
        }"
        class="p-8 space-y-10 text-white border-2 border-dashed rounded-lg border-sb-secondary-200 font-roboto transition-all duration-300 ease-in-out"
      >
        <!-- Privacy Policy Content -->
        <div id="privacyPolicyContent">
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
            {{ i18nStore.privacyPolicyPageI18nContent.privacyPolicy.title }}
          </h2>

          <span class="italic" :class="[styleStore.textSizeS]">
            {{ i18nStore.privacyPolicyPageI18nContent.privacyPolicy.lastUpdate }}
          </span>

          <p class="mt-4 text-justify whitespace-normal" :class="[styleStore.textSizeS]">
            {{ i18nStore.privacyPolicyPageI18nContent.privacyPolicy.description }}
          </p>
        </div>

        <!-- Privacy Policy Data Controller -->
        <div id="privacyPolicyDataController">
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
            {{ i18nStore.privacyPolicyPageI18nContent.privacyPolicy.dataController.title }}
          </h3>

          <p class="mt-4 text-justify whitespace-normal" :class="[styleStore.textSizeS]">
            {{ i18nStore.privacyPolicyPageI18nContent.privacyPolicy.dataController.content }}
          </p>
        </div>

        <!-- Privacy Policy Data Collected -->
        <div id="privacyPolicyDataCollected">
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
            {{ i18nStore.privacyPolicyPageI18nContent.privacyPolicy.dataCollected.title }}
          </h3>

          <p class="mt-4 text-justify whitespace-normal" :class="[styleStore.textSizeS]">
            {{ i18nStore.privacyPolicyPageI18nContent.privacyPolicy.dataCollected.description }}
          </p>
          <ul class="ml-8 list-disc">
            <li
              v-for="(data, index) in i18nStore.privacyPolicyPageI18nContent.privacyPolicy
                .dataCollected.points"
              :key="index"
              class="mt-2"
              :class="[styleStore.textSizeS]"
            >
              {{ data }}
            </li>
          </ul>
          <p class="mt-4 text-justify whitespace-normal" :class="[styleStore.textSizeS]">
            {{ i18nStore.privacyPolicyPageI18nContent.privacyPolicy.dataCollected.note }}
          </p>
        </div>

        <!-- Privacy Policy Third Party Services  -->
        <div id="privacyPolicyThirdPartyServices">
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
            {{ i18nStore.privacyPolicyPageI18nContent.privacyPolicy.thirdPartyServices.title }}
          </h3>

          <p class="mt-4 text-justify whitespace-normal" :class="[styleStore.textSizeS]">
            {{
              i18nStore.privacyPolicyPageI18nContent.privacyPolicy.thirdPartyServices.description
            }}
            <a
              :href="
                i18nStore.privacyPolicyPageI18nContent.privacyPolicy.thirdPartyServices.linkUrl
              "
              target="_blank"
              rel="noopener noreferrer"
              class="underline cursor-pointer text-sb-tertiary-100 hover:text-sb-tertiary-200 transition-all duration-300 ease-in-out"
            >
              {{ i18nStore.privacyPolicyPageI18nContent.privacyPolicy.thirdPartyServices.linkText }}
            </a>
          </p>
        </div>

        <!-- Privacy Policy Data Sharing -->
        <div id="privacyPolicyDataSharing">
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
            {{ i18nStore.privacyPolicyPageI18nContent.privacyPolicy.dataSharing.title }}
          </h3>

          <p class="mt-4 text-justify whitespace-normal" :class="[styleStore.textSizeS]">
            {{ i18nStore.privacyPolicyPageI18nContent.privacyPolicy.dataSharing.content }}
          </p>
        </div>

        <!-- Privacy Policy User Rights -->
        <div id="privacyPolicyUserRights">
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
            {{ i18nStore.privacyPolicyPageI18nContent.privacyPolicy.userRights.title }}
          </h3>

          <p class="mt-4 text-justify whitespace-normal" :class="[styleStore.textSizeS]">
            {{ i18nStore.privacyPolicyPageI18nContent.privacyPolicy.userRights.description }}
          </p>
          <ul class="ml-8 list-disc">
            <li
              v-for="(data, index) in i18nStore.privacyPolicyPageI18nContent.privacyPolicy
                .userRights.rights"
              :key="index"
              class="mt-2"
              :class="[styleStore.textSizeS]"
            >
              {{ data }}
            </li>
          </ul>

          <p class="mt-4 text-justify whitespace-normal" :class="[styleStore.textSizeS]">
            {{ i18nStore.privacyPolicyPageI18nContent.privacyPolicy.userRights.note }}
          </p>
        </div>

        <!-- Privacy Policy Legal Basis -->
        <div id="privacyPolicyLegalBasis">
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
            {{ i18nStore.privacyPolicyPageI18nContent.privacyPolicy.legalBasis.title }}
          </h3>

          <p class="mt-4 text-justify whitespace-normal" :class="[styleStore.textSizeS]">
            {{ i18nStore.privacyPolicyPageI18nContent.privacyPolicy.legalBasis.content }}
          </p>
        </div>
      </div>
    </template>
  </ThePageContainer>
</template>
