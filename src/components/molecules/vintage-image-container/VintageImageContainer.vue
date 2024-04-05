<script setup lang="ts">

interface VintageImageContainerProps {
  imageUrl: string;
  text?: string;
}

const props = withDefaults(defineProps<VintageImageContainerProps>(), {
	text: undefined
});

</script>

<template>
  <div
    v-bind="$attrs"
    class="px-8 pt-8 pb-20 bg-white rounded"
  >
    <img
      :src="props.imageUrl"
      alt="Placeholder"
      class="object-cover object-center size-96 "
    />
    <p class="w-full mt-4 text-lg text-center whitespace-normal text-secondary font-roboto">
      {{ props.text }}
    </p>
  </div>
</template>