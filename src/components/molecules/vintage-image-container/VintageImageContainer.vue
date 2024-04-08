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
    class=" px-4 pt-4 bg-white rounded w-[23.06rem] h-[28rem] overflow-hidden"
  >
    <img
      :src="props.imageUrl"
      alt="Placeholder"
      class="object-cover object-center w-full h-[20rem]"
    />
    <p class="mt-4 text-sm text-center truncate whitespace-normal border text-secondary font-roboto">
      {{ props.text }}
    </p>
  </div>
</template>