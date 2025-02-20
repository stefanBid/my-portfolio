<script setup lang="ts">
import { CONTACT_CHANNEL_ICONS, MEDIA } from '@/constants';
import { useStyleStore, useI18nStore } from '@/stores';
import { openLink } from '@/utils';

//Store Declarations
const styleStore = useStyleStore();
const i18nStore = useI18nStore();
</script>

<template>
  <footer
    :class="[
      styleStore.containerPadding,
      {
        'py-4': styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
        'py-5': styleStore.activeBreakpoint === 'md',
        'py-6':
          styleStore.activeBreakpoint !== 'xs' &&
          styleStore.activeBreakpoint !== 'sm' &&
          styleStore.activeBreakpoint !== 'md',
      },
    ]"
    class="w-full text-white transition-all duration-300 ease-in-out bg-sb-secondary-300"
  >
    <div
      class="grid w-full transition-all duration-300 ease-in-out"
      :class="{
        'grid-cols-1 px-4 pb-4 gap-6':
          styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
        'grid-cols-[2fr_1fr] px-5 pb-5 gap-7': styleStore.activeBreakpoint === 'md',
        'grid-cols-[2fr_1fr_1fr_1fr] px-6 pb-6 gap-8':
          styleStore.activeBreakpoint !== 'xs' &&
          styleStore.activeBreakpoint !== 'sm' &&
          styleStore.activeBreakpoint !== 'md',
      }"
    >
      <!--Logo and Info-->
      <div
        id="logo-and-info"
        :class="{
          'items-center':
            styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
        }"
        class="flex flex-col w-full gap-y-2.5 transition-all duration-300 ease-in-out"
      >
        <!--Logo-->
        <div id="logo" class="flex items-center gap-2 text-white">
          <img
            :src="MEDIA.logoImg"
            :class="[styleStore.iconSizeS]"
            class="transition-all duration-300 ease-in-out shrink-0"
          />
          <span
            class="flex-1 font-semibold transition-all duration-300 ease-in-out font-bebas"
            :class="[styleStore.textSizeM]"
          >
            {{ i18nStore.footerI18nContent.intro.title }}
          </span>
        </div>
        <!--Description-->
        <p
          id="description"
          :class="[
            styleStore.textSizeXS,
            {
              'text-center':
                styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
            },
          ]"
          class="text-white transition-all duration-300 ease-in-out font-roboto"
        >
          {{ i18nStore.footerI18nContent.intro.description }}
        </p>
        <!--Social Media-->
        <div id="social-media" class="flex gap-4">
          <component
            :is="CONTACT_CHANNEL_ICONS[social.id]"
            v-for="social in i18nStore.footerI18nContent.intro.socials"
            :key="social.id"
            :tabindex="0"
            :class="[styleStore.iconSizeS]"
            class="text-white transition-all duration-300 ease-in-out outline-none cursor-pointer hover:text-sb-tertiary-100 focus-visible:text-sb-tertiary-100 ring-0 focus-visible:ring-0 focus-visible:outline-none"
            @click.stop="openLink(social.value)"
            @keydown.enter.stop="openLink(social.value)"
          />
        </div>
      </div>
      <!--Quik Links-->
      <div
        id="quik-links"
        :class="{
          'items-center':
            styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
        }"
        class="flex flex-col w-full transition-all duration-300 ease-in-out"
      >
        <!--Title-->
        <span
          class="mb-2.5 font-semibold transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas"
          :class="[
            styleStore.textSizeS,
            {
              'text-center':
                styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
            },
          ]"
        >
          {{ i18nStore.footerI18nContent.quickLinks.title }}
        </span>

        <!--Links-->
        <router-link
          v-for="(link, index) in i18nStore.footerI18nContent.quickLinks.links"
          :key="link.text"
          :to="link.link"
          tabindex="0"
          class="text-white transition-all duration-300 ease-in-out outline-none w-fit ring-0 focus-visible:ring-0 focus-visible:outline-none font-roboto hover:text-sb-tertiary-100 focus-visible:text-sb-tertiary-100 hover:text-shadow-luminous-tertiary focus-visible:text-shadow-luminous-tertiary"
          :class="[
            styleStore.textSizeXS,
            {
              'mb-1': index !== i18nStore.footerI18nContent.quickLinks.links.length - 1,
              'text-center':
                styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
            },
          ]"
        >
          {{ link.text }}
        </router-link>
      </div>
      <!--Contact and Info-->
      <div
        id="contact"
        :class="{
          'items-center':
            styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
        }"
        class="flex flex-col w-full transition-all duration-300 ease-in-out"
      >
        <!--Title-->
        <span
          class="mb-2.5 font-semibold transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas"
          :class="[
            styleStore.textSizeS,
            {
              'text-center':
                styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
            },
          ]"
        >
          {{ i18nStore.footerI18nContent.contacts.title }}
        </span>
        <!--Contact Info-->
        <span
          v-for="(channel, index) in i18nStore.footerI18nContent.contacts.channels"
          :key="channel.id"
          :class="[
            styleStore.textSizeXS,
            {
              'mb-1': index !== i18nStore.footerI18nContent.contacts.channels.length - 1,
              'text-center':
                styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
            },
          ]"
          class="inline-flex items-center text-white transition-all duration-300 ease-in-out font-roboto gap-x-2"
        >
          <component
            :is="CONTACT_CHANNEL_ICONS[channel.id]"
            :class="[styleStore.iconSizeXS]"
            class="transition-all duration-300 ease-in-out shrink-0"
          />
          {{ channel.value }}
        </span>
      </div>
      <!--Help And Support-->
      <div
        id="help-and-support"
        :class="{
          'items-center':
            styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
        }"
        class="flex flex-col w-full transition-all duration-300 ease-in-out"
      >
        <!--Title-->
        <span
          class="font-semibold transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas mb-2.5"
          :class="[
            styleStore.textSizeS,
            {
              'text-center':
                styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
            },
          ]"
        >
          {{ i18nStore.footerI18nContent.helpAndSupport.title }}
        </span>
        <!--Links-->
        <router-link
          v-for="(link, index) in i18nStore.footerI18nContent.helpAndSupport.links"
          :key="link.text"
          :to="link.link"
          tabindex="0"
          class="text-white transition-all duration-300 ease-in-out outline-none w-fit ring-0 focus-visible:ring-0 focus-visible:outline-none font-roboto hover:text-sb-tertiary-100 focus-visible:text-sb-tertiary-100 hover:text-shadow-luminous-tertiary focus-visible:text-shadow-luminous-tertiary"
          :class="[
            styleStore.textSizeXS,
            {
              'mb-1': index !== i18nStore.footerI18nContent.helpAndSupport.links.length - 1,
              'text-center':
                styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
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
      :class="{
        'px-4 pt-4': styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
        'px-5 pt-5': styleStore.activeBreakpoint === 'md',
        'px-6 pt-6':
          styleStore.activeBreakpoint !== 'xs' &&
          styleStore.activeBreakpoint !== 'sm' &&
          styleStore.activeBreakpoint !== 'md',
      }"
      class="inline-flex items-center justify-center w-full transition-all duration-300 ease-in-out border-t border-sb-tertiary-100 gap-x-1"
    >
      <span
        :class="[styleStore.textSizeXS]"
        class="text-center text-white transition-all duration-300 ease-in-out font-roboto"
      >
        Designed and Developed by
      </span>
      <div
        tabindex="0"
        class="inline-flex items-center text-white transition-all duration-300 ease-in-out cursor-pointer gap-x-1 outline-white outline-offset-0 ring-0 focus-visible:ring-0"
        @click.stop="openLink('https://www.linkedin.com/in/stefano-biddau/')"
        @keydown.enter.stop="openLink('https://www.linkedin.com/in/stefano-biddau/')"
      >
        <img
          :src="MEDIA.logoImg"
          :class="[styleStore.iconSizeXS]"
          class="transition-all duration-300 ease-in-out shrink-0"
        />
        <span
          class="flex-1 transition-all duration-300 ease-in-out font-roboto"
          :class="[styleStore.textSizeXS]"
        >
          Stefano Biddau
        </span>
      </div>
    </div>
  </footer>
</template>
