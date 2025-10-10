<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useHead } from '@unhead/vue';

import { usePortfolioStore } from '@/stores';

import AppPageContainer from '@/components/layouts/page-container/AppPageContainer.vue';
import AppDivider from '@/components/layouts/divider/AppDivider.vue';

// Dependencies
const { privacyPolicyData } = storeToRefs(usePortfolioStore());

// State
useHead({
  title: computed(() => privacyPolicyData.value.pageMeta.title),
  meta: computed(() => [
    {
      name: 'description',
      content: privacyPolicyData.value.pageMeta.description,
    },
  ]),
});

const getPolicy = computed(() => {
  return privacyPolicyData.value.policy;
});
</script>

<template>
  <AppPageContainer :page-intro-text="privacyPolicyData.startTitle">
    <template #page-content>
      <AppDivider
        :intersection-observer-settings="{ rootElement: null, threshold: 0.1 }"
        animation="fade"
      >
        <div
          class="text-white transition-all duration-300 ease-in-out border-2 border-dashed rounded-lg border-sb-secondary-200 font-roboto tot-pad-m space-y-4 sm:space-y-5 md:space-y-5 lg:space-y-6"
        >
          <!-- Privacy Policy Content -->
          <div id="privacyPolicyContent">
            <h2
              class="whitespace-normal transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas text-size-xl el-text-orientation"
            >
              {{ privacyPolicyData.title }}
            </h2>

            <span class="italic text-size-s transition-all duration-300 ease-in-out">
              {{ privacyPolicyData.lastUpdate }}
            </span>

            <p
              class="text-justify whitespace-normal text-size-s el-margin-top transition-all duration-300 ease-in-out"
            >
              {{ privacyPolicyData.description }}
            </p>
          </div>

          <!-- Privacy Policy Data Controller -->
          <div id="privacyPolicyDataController">
            <h3
              class="whitespace-normal transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas text-size-l el-text-orientation"
            >
              {{ getPolicy.dataController.title }}
            </h3>

            <p
              class="text-justify whitespace-normal text-size-s el-margin-top transition-all duration-300 ease-in-out"
            >
              {{ getPolicy.dataController.content }}
            </p>
          </div>

          <!-- Privacy Policy Data Collected -->
          <div id="privacyPolicyDataCollected">
            <h3
              class="whitespace-normal transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas text-size-l el-text-orientation"
            >
              {{ getPolicy.dataCollected.title }}
            </h3>

            <p
              class="text-justify whitespace-normal text-size-s el-margin-top transition-all duration-300 ease-in-out"
            >
              {{ getPolicy.dataCollected.description }}
            </p>
            <ul class="ml-8 list-disc">
              <li
                v-for="(data, index) in getPolicy.dataCollected.points"
                :key="index"
                class="mt-2 text-size-s transition-all duration-300 ease-in-out"
              >
                {{ data }}
              </li>
            </ul>
            <p
              class="text-justify whitespace-normal text-size-s el-margin-top transition-all duration-300 ease-in-out"
            >
              {{ getPolicy.dataCollected.note }}
            </p>
          </div>

          <!-- Privacy Policy Third Party Services  -->
          <div id="privacyPolicyThirdPartyServices">
            <h3
              class="whitespace-normal transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas text-size-l el-text-orientation"
            >
              {{ getPolicy.thirdPartyServices.title }}
            </h3>

            <p
              class="text-justify whitespace-normal text-size-s el-margin-top transition-all duration-300 ease-in-out"
            >
              {{ getPolicy.thirdPartyServices.description }}
              <a
                :href="getPolicy.thirdPartyServices.linkUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="underline transition-all duration-300 ease-in-out outline-none cursor-pointer text-sb-tertiary-100 hover:text-sb-tertiary-200 focus-visible:text-sb-tertiary-200 ring-0"
              >
                {{ getPolicy.thirdPartyServices.linkText }}
              </a>
            </p>
          </div>

          <!-- Privacy Policy Data Sharing -->
          <div id="privacyPolicyDataSharing">
            <h3
              class="whitespace-normal transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas text-size-l el-text-orientation"
            >
              {{ getPolicy.dataSharing.title }}
            </h3>

            <p
              class="text-justify whitespace-normal text-size-s el-margin-top transition-all duration-300 ease-in-out"
            >
              {{ getPolicy.dataSharing.content }}
            </p>
          </div>

          <!-- Privacy Policy User Rights -->
          <div id="privacyPolicyUserRights">
            <h3
              class="whitespace-normal transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas text-size-l el-text-orientation"
            >
              {{ getPolicy.userRights.title }}
            </h3>

            <p
              class="text-justify whitespace-normal text-size-s el-margin-top transition-all duration-300 ease-in-out"
            >
              {{ getPolicy.userRights.description }}
            </p>
            <ul class="ml-8 list-disc">
              <li
                v-for="(data, index) in getPolicy.userRights.rights"
                :key="index"
                class="mt-2 text-size-s transition-all duration-300 ease-in-out"
              >
                {{ data }}
              </li>
            </ul>

            <p
              class="text-justify whitespace-normal text-size-s el-margin-top transition-all duration-300 ease-in-out"
            >
              {{ getPolicy.userRights.note }}
            </p>
          </div>

          <!-- Privacy Policy Legal Basis -->
          <div id="privacyPolicyLegalBasis">
            <h3
              class="whitespace-normal transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas text-size-l el-text-orientation"
            >
              {{ getPolicy.legalBasis.title }}
            </h3>

            <p
              class="text-justify whitespace-normal text-size-s el-margin-top transition-all duration-300 ease-in-out"
            >
              {{ getPolicy.legalBasis.content }}
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
