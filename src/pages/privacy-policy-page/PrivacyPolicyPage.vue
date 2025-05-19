<script setup lang="ts">
import { ThePageContainer, TheDivider } from '@/components';
import { usePageMeta } from '@/hooks';
import { useI18nStore, useStyleStore } from '@/stores';
import { computed } from 'vue';

// Store Declarations
const styleStore = useStyleStore();
const i18nStore = useI18nStore();

// SEO Feature Manage Meta Tags
usePageMeta({
  meta: computed(() => i18nStore.privacyPolicyPageI18nContent.metaDescription),
  currentLang: computed(() => i18nStore.currentLanguage),
});
</script>

<template>
  <ThePageContainer :page-intro-text="i18nStore.privacyPolicyPageI18nContent.pageHeading">
    <template #page-content>
      <TheDivider
        :intersection-observer-settings="{ rootElement: null, threshold: 0.1 }"
        animation="fade"
      >
        <div
          :class="[
            styleStore.elementTotalPaddingM,
            {
              'space-y-6':
                styleStore.activeBreakpoint !== 'xs' &&
                styleStore.activeBreakpoint !== 'sm' &&
                styleStore.activeBreakpoint !== 'md',
              'space-y-5': styleStore.activeBreakpoint === 'md',
              'space-y-4':
                styleStore.activeBreakpoint === 'sm' || styleStore.activeBreakpoint === 'xs',
            },
          ]"
          class="text-white transition-all duration-300 ease-in-out border-2 border-dashed rounded-lg border-sb-secondary-200 font-roboto"
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

            <p
              class="text-justify whitespace-normal"
              :class="[
                styleStore.textSizeS,
                {
                  'mt-4':
                    styleStore.activeBreakpoint !== 'xs' &&
                    styleStore.activeBreakpoint !== 'sm' &&
                    styleStore.activeBreakpoint !== 'md',
                  'mt-3': styleStore.activeBreakpoint === 'md',
                  'mt-2.5':
                    styleStore.activeBreakpoint === 'sm' || styleStore.activeBreakpoint === 'xs',
                },
              ]"
            >
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

            <p
              class="text-justify whitespace-normal"
              :class="[
                styleStore.textSizeS,
                {
                  'mt-4':
                    styleStore.activeBreakpoint !== 'xs' &&
                    styleStore.activeBreakpoint !== 'sm' &&
                    styleStore.activeBreakpoint !== 'md',
                  'mt-3': styleStore.activeBreakpoint === 'md',
                  'mt-2.5':
                    styleStore.activeBreakpoint === 'sm' || styleStore.activeBreakpoint === 'xs',
                },
              ]"
            >
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

            <p
              class="text-justify whitespace-normal"
              :class="[
                styleStore.textSizeS,
                {
                  'mt-4':
                    styleStore.activeBreakpoint !== 'xs' &&
                    styleStore.activeBreakpoint !== 'sm' &&
                    styleStore.activeBreakpoint !== 'md',
                  'mt-3': styleStore.activeBreakpoint === 'md',
                  'mt-2.5':
                    styleStore.activeBreakpoint === 'sm' || styleStore.activeBreakpoint === 'xs',
                },
              ]"
            >
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
            <p
              class="text-justify whitespace-normal"
              :class="[
                styleStore.textSizeS,
                {
                  'mt-4':
                    styleStore.activeBreakpoint !== 'xs' &&
                    styleStore.activeBreakpoint !== 'sm' &&
                    styleStore.activeBreakpoint !== 'md',
                  'mt-3': styleStore.activeBreakpoint === 'md',
                  'mt-2.5':
                    styleStore.activeBreakpoint === 'sm' || styleStore.activeBreakpoint === 'xs',
                },
              ]"
            >
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

            <p
              class="text-justify whitespace-normal"
              :class="[
                styleStore.textSizeS,
                {
                  'mt-4':
                    styleStore.activeBreakpoint !== 'xs' &&
                    styleStore.activeBreakpoint !== 'sm' &&
                    styleStore.activeBreakpoint !== 'md',
                  'mt-3': styleStore.activeBreakpoint === 'md',
                  'mt-2.5':
                    styleStore.activeBreakpoint === 'sm' || styleStore.activeBreakpoint === 'xs',
                },
              ]"
            >
              {{
                i18nStore.privacyPolicyPageI18nContent.privacyPolicy.thirdPartyServices.description
              }}
              <a
                :href="
                  i18nStore.privacyPolicyPageI18nContent.privacyPolicy.thirdPartyServices.linkUrl
                "
                target="_blank"
                rel="noopener noreferrer"
                class="underline transition-all duration-300 ease-in-out outline-none cursor-pointer text-sb-tertiary-100 hover:text-sb-tertiary-200 focus-visible:text-sb-tertiary-200 ring-0"
              >
                {{
                  i18nStore.privacyPolicyPageI18nContent.privacyPolicy.thirdPartyServices.linkText
                }}
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

            <p
              class="text-justify whitespace-normal"
              :class="[
                styleStore.textSizeS,
                {
                  'mt-4':
                    styleStore.activeBreakpoint !== 'xs' &&
                    styleStore.activeBreakpoint !== 'sm' &&
                    styleStore.activeBreakpoint !== 'md',
                  'mt-3': styleStore.activeBreakpoint === 'md',
                  'mt-2.5':
                    styleStore.activeBreakpoint === 'sm' || styleStore.activeBreakpoint === 'xs',
                },
              ]"
            >
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

            <p
              class="text-justify whitespace-normal"
              :class="[
                styleStore.textSizeS,
                {
                  'mt-4':
                    styleStore.activeBreakpoint !== 'xs' &&
                    styleStore.activeBreakpoint !== 'sm' &&
                    styleStore.activeBreakpoint !== 'md',
                  'mt-3': styleStore.activeBreakpoint === 'md',
                  'mt-2.5':
                    styleStore.activeBreakpoint === 'sm' || styleStore.activeBreakpoint === 'xs',
                },
              ]"
            >
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

            <p
              class="text-justify whitespace-normal"
              :class="[
                styleStore.textSizeS,
                {
                  'mt-4':
                    styleStore.activeBreakpoint !== 'xs' &&
                    styleStore.activeBreakpoint !== 'sm' &&
                    styleStore.activeBreakpoint !== 'md',
                  'mt-3': styleStore.activeBreakpoint === 'md',
                  'mt-2.5':
                    styleStore.activeBreakpoint === 'sm' || styleStore.activeBreakpoint === 'xs',
                },
              ]"
            >
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

            <p
              class="text-justify whitespace-normal"
              :class="[
                styleStore.textSizeS,
                {
                  'mt-4':
                    styleStore.activeBreakpoint !== 'xs' &&
                    styleStore.activeBreakpoint !== 'sm' &&
                    styleStore.activeBreakpoint !== 'md',
                  'mt-3': styleStore.activeBreakpoint === 'md',
                  'mt-2.5':
                    styleStore.activeBreakpoint === 'sm' || styleStore.activeBreakpoint === 'xs',
                },
              ]"
            >
              {{ i18nStore.privacyPolicyPageI18nContent.privacyPolicy.legalBasis.content }}
            </p>
          </div>
        </div>
      </TheDivider>
    </template>
  </ThePageContainer>
</template>
