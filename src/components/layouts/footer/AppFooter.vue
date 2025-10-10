<script setup lang="ts">
import type { BFooter } from '@/types';
import { openLink } from '@/utils';

import { Icon } from '@iconify/vue';

interface AppFooterProps {
  content: BFooter;
}

// Input / Output (Props / Emits)
const props = defineProps<AppFooterProps>();
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
            src="/logo.png"
            class="transition-all duration-300 ease-in-out shrink-0 w-4 h-[19px] sm:w-6 sm:h-[29px] md:w-6 md:h-[29px] lg:w-8 lg:h-[38px]"
          />
          <span
            class="flex-1 font-semibold transition-all duration-300 ease-in-out font-bebas text-size-m"
          >
            {{ props.content.title }}
          </span>
        </div>
        <!--Description-->
        <p
          id="description"
          class="text-white transition-all duration-300 ease-in-out font-roboto text-size-xs text-center sm:text-left md:text-left"
        >
          {{ props.content.description }}
        </p>
        <!--Social Media-->
        <div id="social-media" class="flex gap-4">
          <a
            v-for="(social, index) in props.content.social"
            :key="index"
            :href="social.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="social.label || `Open ${social.name || 'social link'}`"
            class="inline-flex items-center justify-center text-white transition-all duration-300 ease-in-out outline-none cursor-pointer hover:text-sb-tertiary-100 focus-visible:text-sb-tertiary-100 ring-0"
          >
            <Icon
              :icon="social.icon ?? ''"
              aria-hidden="true"
              tabindex="-1"
              class="pointer-events-none icon-size-s"
            />
          </a>
        </div>
      </div>
      <!--Quick Links-->
      <div
        v-if="props.content.quickLinks"
        id="quik-links"
        class="flex flex-col w-full transition-all duration-300 ease-in-out items-center sm:items-start md:items-start"
      >
        <!--Title-->
        <span
          class="mb-2.5 font-semibold transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas text-size-s text-center sm:text-left md:text-left"
        >
          {{ props.content.quickLinksTitle }}
        </span>

        <!--Links-->
        <router-link
          v-for="(ql, index) in props.content.quickLinks"
          :key="index"
          :to="ql.href"
          :tabindex="0"
          class="text-size-xs text-white transition-all duration-300 ease-in-out outline-none w-fit ring-0 font-roboto hover:text-sb-tertiary-100 focus-visible:text-sb-tertiary-100 hover:text-shadow-luminous-tertiary focus-visible:text-shadow-luminous-tertiary text-center sm:text-left md:text-left"
          :class="[
            {
              'mb-1': index !== props.content.quickLinks.length - 1,
            },
          ]"
        >
          {{ ql.label }}
        </router-link>
      </div>
      <!--Contact and Info-->
      <div
        v-if="props.content.contacts"
        id="contact"
        class="flex flex-col w-full transition-all duration-300 ease-in-out items-center sm:items-start md:items-start"
      >
        <!--Title-->
        <span
          class="text-size-s mb-2.5 font-semibold transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas text-center sm:text-left md:text-left"
        >
          {{ props.content.contactsTitle }}
        </span>
        <!--Contact Info-->
        <span
          v-for="(channel, index) in props.content.contacts"
          :key="index"
          :class="[
            {
              'mb-1': index !== props.content.contacts.length - 1 || 0,
            },
          ]"
          class="text-size-xs inline-flex items-center text-white transition-all duration-300 ease-in-out font-roboto gap-x-2 text-center sm:text-left md:text-left"
        >
          <Icon
            :icon="channel.icon ?? ''"
            class="transition-all duration-300 ease-in-out shrink-0 icon-size-xs"
          />
          {{ channel.value }}
        </span>
      </div>
      <!--Help And Support-->
      <div
        v-if="props.content.helpAndSupport"
        id="help-and-support"
        class="flex flex-col w-full transition-all duration-300 ease-in-out items-center sm:items-start md:items-start"
      >
        <!--Title-->
        <span
          class="text-size-s font-semibold transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas mb-2.5 text-center sm:text-left md:text-left"
        >
          {{ props.content.helpAndSupportTitle }}
        </span>
        <!--Links-->
        <router-link
          v-for="(hs, index) in props.content.helpAndSupport"
          :key="index"
          :to="hs.href"
          :tabindex="0"
          class="text-size-xs text-white transition-all duration-300 ease-in-out outline-none w-fit ring-0 font-roboto hover:text-sb-tertiary-100 focus-visible:text-sb-tertiary-100 hover:text-shadow-luminous-tertiary focus-visible:text-shadow-luminous-tertiary text-center sm:text-left md:text-left"
          :class="[
            {
              'mb-1': index !== props.content.helpAndSupport.length - 1,
            },
          ]"
        >
          {{ hs.label }}
        </router-link>
      </div>
    </div>
    <!--Easter Egg-->
    <div
      id="easter-egg"
      class="px-4 pt-4 sm:px-5 sm:pt-5 md:px-5 md:pt-5 lg:px-6 lg:pt-6 w-full transition-all duration-300 ease-in-out border-t border-sb-tertiary-100 gap-x-1"
    >
      <span
        class="text-nowrap text-size-xs text-white transition-all duration-300 ease-in-out font-roboto inline-flex items-center gap-x-1 justify-center w-full"
      >
        Designed and Developed by

        <button
          class="text-white transition-all duration-300 ease-in-out cursor-pointer outline-white ring-0 space-x-2"
          @click.stop="openLink('https://www.linkedin.com/in/stefano-biddau/')"
          @keydown.enter.stop="openLink('https://www.linkedin.com/in/stefano-biddau/')"
        >
          Stefano Biddau
        </button>
      </span>
    </div>
  </footer>
</template>
