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
  meta: computed(() => i18nStore.termsAndConditionsPageI18nContent.metaDescription),
  currentLang: computed(() => i18nStore.currentLanguage),
});
</script>

<template>
  <ThePageContainer :page-intro-text="i18nStore.termsAndConditionsPageI18nContent.pageHeading">
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
                i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.userObligations
                  .description
              }}
            </p>
            <ul class="ml-8 list-disc">
              <li
                v-for="(data, index) in i18nStore.termsAndConditionsPageI18nContent
                  .termsAndConditions.userObligations.points"
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
                i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.liabilityLimitations
                  .description
              }}
            </p>
            <ul class="ml-8 list-disc">
              <li
                v-for="(data, index) in i18nStore.termsAndConditionsPageI18nContent
                  .termsAndConditions.liabilityLimitations.points"
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
              {{ i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.legal.description }}
            </p>
            <ul class="ml-8 list-disc">
              <li
                v-for="(data, index) in i18nStore.termsAndConditionsPageI18nContent
                  .termsAndConditions.legal.points"
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
              {{
                i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.modifications.title
              }}
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
                i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.modifications.content
              }}
            </p>
          </div>
        </div>
      </TheDivider>
    </template>
  </ThePageContainer>
</template>
