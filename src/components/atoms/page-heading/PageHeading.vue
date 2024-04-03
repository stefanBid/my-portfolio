<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getTransition } from '@/utils';

interface PageHeadingProps {
  title: string;
}

const props = defineProps<PageHeadingProps>();

const show = ref(false);
const showIcon = ref(false);
const transitionObj = getTransition('stretch');

onMounted(() => {
	show.value = true;
	setTimeout(() => {
		showIcon.value = true;
	}, 600);
});
</script>

<template>
  <div class="flex items-center justify-center p-8 h-[20%] bg-slate-700 gap-x-4">
    <transition
      :enter-active-class="transitionObj.enterActiveClass"
      :enter-from-class="transitionObj.enterFromClass"
      :enter-to-class="transitionObj.enterToClass"
      :leave-active-class="transitionObj.leaveActiveClass"
      :leave-from-class="transitionObj.leaveFromClass"
      :leave-to-class="transitionObj.leaveToClass"
    >
      <h1
        v-if="show"
        class=" text-[5rem] text-white duration-200 ease-in-out font-bebas md:text-2xl sm:text-xl xs:text-xl transition-all "
      >
        {{ props.title }}
      </h1>
    </transition>
  </div>
</template>