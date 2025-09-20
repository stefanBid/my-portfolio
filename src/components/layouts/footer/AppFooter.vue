<script setup lang="ts">
import { useI18nStore } from '@/stores';
import { openLink } from '@/utils';

import BaseIcon from '@/components/base/icon/BaseIcon.vue';

//Store Declarations
const i18nStore = useI18nStore();
</script>

<template>
  <footer
    class="w-full container-p text-white transition-all duration-300 ease-in-out bg-sb-secondary-300 py-4 sm:py-5 md:py-5 lg:py-6"
  >
    <div
      class="grid grid-cols-1 gap-6 px-4 pb-4 sm:grid-cols-[2fr_1fr] sm:gap-7 sm:px-5 sm:pb-5 md:grid-cols-[2fr_1fr] md:gap-7 md:px-5 md:pb-5 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-8 lg:px-6 lg:pb-6 w-full transition-all duration-300 ease-in-out"
    >
      <!--Logo and Info-->
      <div
        id="logo-and-info"
        class="flex flex-col w-full gap-y-2.5 transition-all duration-300 ease-in-out items-center sm:items-start md:items-start"
      >
        <!--Logo-->
        <div id="logo" class="flex items-center gap-2 text-white">
          <img
            src="/images/logo.png"
            class="transition-all duration-300 ease-in-out shrink-0 w-4 h-[19px] sm:w-6 sm:h-[29px] md:w-6 md:h-[29px] lg:w-8 lg:h-[38px]"
          />
          <span
            class="flex-1 font-semibold transition-all duration-300 ease-in-out font-bebas text-size-m"
          >
            {{ i18nStore.footerI18nContent.intro.title }}
          </span>
        </div>
        <!--Description-->
        <p
          id="description"
          class="text-white transition-all duration-300 ease-in-out font-roboto text-size-xs text-center sm:text-left md:text-left"
        >
          {{ i18nStore.footerI18nContent.intro.description }}
        </p>
        <!--Social Media-->
        <div id="social-media" class="flex gap-4">
          <BaseIcon
            v-for="(social, index) in i18nStore.footerI18nContent.intro.socials"
            :key="index"
            :icon="social.icon"
            :tabindex="0"
            class="text-white transition-all duration-300 ease-in-out outline-none cursor-pointer hover:text-sb-tertiary-100 focus-visible:text-sb-tertiary-100 ring-0 icon-size-s"
            @click.stop="openLink(social.link)"
            @keydown.enter.stop="openLink(social.link)"
          />
        </div>
      </div>
      <!--Quik Links-->
      <div
        id="quik-links"
        class="flex flex-col w-full transition-all duration-300 ease-in-out items-center sm:items-start md:items-start"
      >
        <!--Title-->
        <span
          class="mb-2.5 font-semibold transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas text-size-s text-center sm:text-left md:text-left"
        >
          {{ i18nStore.footerI18nContent.quickLinks.title }}
        </span>

        <!--Links-->
        <router-link
          v-for="(link, index) in i18nStore.footerI18nContent.quickLinks.links"
          :key="link.text"
          :to="link.link"
          :tabindex="0"
          class="text-size-xs text-white transition-all duration-300 ease-in-out outline-none w-fit ring-0 font-roboto hover:text-sb-tertiary-100 focus-visible:text-sb-tertiary-100 hover:text-shadow-luminous-tertiary focus-visible:text-shadow-luminous-tertiary text-center sm:text-left md:text-left"
          :class="[
            {
              'mb-1': index !== i18nStore.footerI18nContent.quickLinks.links.length - 1,
            },
          ]"
        >
          {{ link.text }}
        </router-link>
      </div>
      <!--Contact and Info-->
      <div
        id="contact"
        class="flex flex-col w-full transition-all duration-300 ease-in-out items-center sm:items-start md:items-start"
      >
        <!--Title-->
        <span
          class="text-size-s mb-2.5 font-semibold transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas text-center sm:text-left md:text-left"
        >
          {{ i18nStore.footerI18nContent.contacts.title }}
        </span>
        <!--Contact Info-->
        <span
          v-for="(channel, index) in i18nStore.footerI18nContent.contacts.channels"
          :key="index"
          :class="[
            {
              'mb-1': index !== i18nStore.footerI18nContent.contacts.channels.length - 1,
            },
          ]"
          class="text-size-xs inline-flex items-center text-white transition-all duration-300 ease-in-out font-roboto gap-x-2 text-center sm:text-left md:text-left"
        >
          <BaseIcon
            :icon="channel.icon"
            class="transition-all duration-300 ease-in-out shrink-0 icon-size-xs"
          />
          {{ channel.value }}
        </span>
      </div>
      <!--Help And Support-->
      <div
        id="help-and-support"
        class="flex flex-col w-full transition-all duration-300 ease-in-out items-center sm:items-start md:items-start"
      >
        <!--Title-->
        <span
          class="text-size-s font-semibold transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas mb-2.5 text-center sm:text-left md:text-left"
        >
          {{ i18nStore.footerI18nContent.helpAndSupport.title }}
        </span>
        <!--Links-->
        <router-link
          v-for="(link, index) in i18nStore.footerI18nContent.helpAndSupport.links"
          :key="link.text"
          :to="link.link"
          :tabindex="0"
          class="text-size-xs text-white transition-all duration-300 ease-in-out outline-none w-fit ring-0 font-roboto hover:text-sb-tertiary-100 focus-visible:text-sb-tertiary-100 hover:text-shadow-luminous-tertiary focus-visible:text-shadow-luminous-tertiary text-center sm:text-left md:text-left"
          :class="[
            {
              'mb-1': index !== i18nStore.footerI18nContent.helpAndSupport.links.length - 1,
            },
          ]"
        >
          {{ link.text }}
        </router-link>
      </div>
    </div>
    <!--Easter Egg-->
    <div
      id="easter-egg"
      class="px-4 pt-4 sm:px-5 sm:pt-5 md:px-5 md:pt-5 lg:px-6 lg:pt-6 inline-flex items-center justify-center w-full transition-all duration-300 ease-in-out border-t border-sb-tertiary-100 gap-x-1"
    >
      <span
        class="text-size-xs text-center text-white transition-all duration-300 ease-in-out font-roboto"
      >
        Designed and Developed by
      </span>
      <div
        :tabindex="0"
        class="inline-flex items-center text-white transition-all duration-300 ease-in-out cursor-pointer gap-x-1 outline-white ring-0"
        @click.stop="openLink('https://www.linkedin.com/in/stefano-biddau/')"
        @keydown.enter.stop="openLink('https://www.linkedin.com/in/stefano-biddau/')"
      >
        <img
          src="/images/logo.png"
          class="transition-all duration-300 ease-in-out shrink-0 w-3 h-[14px] md:w-4 md:h-[19px] lg:w-4 lg:h-[19px]"
        />
        <span class="flex-1 transition-all duration-300 ease-in-out font-roboto text-size-xs">
          Stefano Biddau
        </span>
      </div>
    </div>
  </footer>
</template>
