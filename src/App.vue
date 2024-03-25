<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';

</script>

<template>
  <div class="flex flex-col gap-y-4">
    <router-link
      to="/"
      class="text-blue-500"
    >
      Home
    </router-link>

    <router-link
      to="/projects"
      class="text-blue-500"
    >
      Projects
    </router-link>

    <router-link
      to="/skills"
      class="text-blue-500"
    >
      Skills
    </router-link>

    <router-link
      to="/about"
      class="text-blue-500"
    >
      About
    </router-link>
  </div>
  <router-view />
</template>
