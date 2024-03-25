<script setup lang="ts">
import { PageHeading } from '@/components';
import { ClipboardDocumentListIcon } from '@heroicons/vue/16/solid';

</script>

<template>
  <div class="h-screen border">
    <PageHeading
      title="About Page"
      :icon="ClipboardDocumentListIcon"
    />
  </div>
</template>