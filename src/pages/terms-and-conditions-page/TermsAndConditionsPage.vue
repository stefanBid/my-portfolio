<script setup lang="ts">
import { computed } from 'vue';

import { usePageMeta } from '@/hooks';
import { useI18nStore } from '@/stores';

import AppPageContainer from '@/components/layouts/page-container/AppPageContainer.vue';
import AppDivider from '@/components/layouts/divider/AppDivider.vue';

// Store Declarations
const i18nStore = useI18nStore();

// SEO Feature Manage Meta Tags
usePageMeta({
  meta: computed(() => i18nStore.termsAndConditionsPageI18nContent.metaDescription),
  currentLang: computed(() => i18nStore.currentLanguage),
});
</script>

<template>
  <AppPageContainer :page-intro-text="i18nStore.termsAndConditionsPageI18nContent.pageHeading">
    <template #page-content>
      <AppDivider
        :intersection-observer-settings="{ rootElement: null, threshold: 0.1 }"
        animation="fade"
      >
        <div
          class="text-white transition-all duration-300 ease-in-out border-2 border-dashed rounded-lg border-sb-secondary-200 font-roboto tot-pad-m space-y-4 sm:space-y-5 md:space-y-5 lg:space-y-6"
        >
          <!-- Terms and Conditions Content -->
          <div id="termsAndConditions">
            <h2
              class="whitespace-normal transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas text-size-xl el-text-orientation"
            >
              {{ i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.title }}
            </h2>

            <span class="italic text-size-s transition-all duration-300 ease-in-out">
              {{ i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.lastUpdate }}
            </span>

            <p
              class="text-justify whitespace-normal text-size-s el-margin-top transition-all duration-300 ease-in-out"
            >
              {{ i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.description }}
            </p>
          </div>

          <!-- Terms and Conditions Services Description -->
          <div id="termsAndConditionsServicesDescription">
            <h3
              class="whitespace-normal transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas text-size-l el-text-orientation"
            >
              {{
                i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.serviceDescription
                  .title
              }}
            </h3>

            <p
              class="text-justify whitespace-normal text-size-s el-margin-top transition-all duration-300 ease-in-out"
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
              class="whitespace-normal transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas text-size-l el-text-orientation"
            >
              {{
                i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.userObligations.title
              }}
            </h3>

            <p
              class="text-justify whitespace-normal text-size-s el-margin-top transition-all duration-300 ease-in-out"
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
                class="mt-2 text-size-s transition-all duration-300 ease-in-out"
              >
                {{ data }}
              </li>
            </ul>
            <p
              class="text-justify whitespace-normal text-size-s el-margin-top transition-all duration-300 ease-in-out"
            >
              {{
                i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.userObligations.note
              }}
            </p>
          </div>

          <!-- Terms And Conditions Liability Limitation  -->
          <div id="termsAndConditionsLiabilityLimitation">
            <h3
              class="whitespace-normal transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas text-size-l el-text-orientation"
            >
              {{
                i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.liabilityLimitations
                  .title
              }}
            </h3>

            <p
              class="text-justify whitespace-normal text-size-s el-margin-top transition-all duration-300 ease-in-out"
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
                class="mt-2 text-size-s transition-all duration-300 ease-in-out"
              >
                {{ data }}
              </li>
            </ul>
          </div>

          <!-- Terms And Conditions Intellectual Property -->
          <div id="termsAndConditionsIntellectualProperty">
            <h3
              class="whitespace-normal transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas text-size-l el-text-orientation"
            >
              {{
                i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.intellectualProperty
                  .title
              }}
            </h3>

            <p
              class="text-justify whitespace-normal text-size-s el-margin-top transition-all duration-300 ease-in-out"
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
              class="whitespace-normal transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas text-size-l el-text-orientation"
            >
              {{ i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.legal.title }}
            </h3>

            <p
              class="text-justify whitespace-normal text-size-s el-margin-top transition-all duration-300 ease-in-out"
            >
              {{ i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.legal.description }}
            </p>
            <ul class="ml-8 list-disc">
              <li
                v-for="(data, index) in i18nStore.termsAndConditionsPageI18nContent
                  .termsAndConditions.legal.points"
                :key="index"
                class="mt-2 text-size-s transition-all duration-300 ease-in-out"
              >
                {{ data }}
              </li>
            </ul>
          </div>

          <!-- Terms And Conditions Modification -->
          <div id="termsAndConditionsModification">
            <h3
              class="whitespace-normal transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas text-size-l el-text-orientation"
            >
              {{
                i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.modifications.title
              }}
            </h3>

            <p
              class="text-justify whitespace-normal text-size-s el-margin-top transition-all duration-300 ease-in-out"
            >
              {{
                i18nStore.termsAndConditionsPageI18nContent.termsAndConditions.modifications.content
              }}
            </p>
          </div>
        </div>
      </AppDivider>
    </template>
  </AppPageContainer>
</template>

<style scoped>
@reference "@/style/index.css";
.el-margin-top {
  @apply mt-2.5 sm:mt-3 md:mt-3 lg:mt-4;
}
.el-text-orientation {
  @apply text-center md:text-left;
}
</style>
