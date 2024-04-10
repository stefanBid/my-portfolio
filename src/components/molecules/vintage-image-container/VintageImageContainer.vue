<script setup lang="ts">
import { useGlobalBreakpoints } from '@/hooks';

interface VintageImageContainerProps {
  imageUrl: string;
  text?: string;
}

const props = withDefaults(defineProps<VintageImageContainerProps>(), {
	text: undefined
});

const { xs, sm } = useGlobalBreakpoints();
</script>

<template>
  <div
    v-bind="$attrs"
    :class="
      {
        'w-[23.06rem] h-[28rem] px-4 pt-4': !xs && !sm,
        'w-[20rem] h-[24rem] px-3.5 pt-3.5': xs || sm
      }
    "
    class="overflow-hidden transition-all duration-300 ease-in-out bg-white rounded"
  >
    <img
      :src="props.imageUrl"
      alt="Placeholder"
      :class="
        {
          'h-[20rem]': !xs && !sm,
          'h-[17rem]': xs || sm
        }
      "
      class="object-cover object-center w-full transition-all duration-300 ease-in-out"
    />
    <p
      :class="
        {
          'py-8 mt-4 text-base': !xs && !sm,
          'py-7 mt-3.5 text-sm': xs || sm
        }"
      class="text-sm font-bold text-center truncate whitespace-normal text-secondary font-roboto"
    >
      {{ props.text }}
    </p>
  </div>
</template>