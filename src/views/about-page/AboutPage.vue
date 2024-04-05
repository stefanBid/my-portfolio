<script setup lang="ts">
import { PageHeading, VintageImageContainer } from '@/components';
import img from '@/assets/media/graduationPhoto.jpg';

</script>

<template>
  <div class="div_container">
    <PageHeading
      title="Who am I?"
    />

    <div class="flex flex-col mt-20 border gap-y-20">
      <div
        v-for="i in 3"
        :key="i"
        :class="{
          'flex-row': i % 2 === 0,
          'flex-row-reverse': i % 2 !== 0,
        }"
        class="flex px-8 gap-x-10"
      >
        <VintageImageContainer
          :image-url="img"
          text="Graduation Day 15-12-2023"
          :class="{
            '-rotate-2': i % 2 === 0,
            'rotate-2': i % 2 !== 0,
          }"
          class="shrink-0 h-fit"
        />
        <div class="flex flex-col justify-center flex-1">
          <h1 class="font-bebas text-[3rem] text-white">
            About my journey
          </h1>
          <p class="text-justify text-white whitespace-normal font-roboto">
            Nostrud consectetur id anim amet quis amet ipsum aliquip ad veniam. Est aliquip culpa deserunt sunt qui do excepteur ullamco est irure proident deserunt consectetur. Veniam mollit cillum voluptate laborum occaecat nisi ut sint occaecat nostrud qui. Amet commodo exercitation aute laboris esse nisi sunt sit dolor qui ad anim Lorem adipisicing. Duis consectetur minim laboris enim amet nisi proident. Dolore nostrud occaecat proident in esse. Consectetur dolor dolor aliquip reprehenderit nisi amet culpa eiusmod excepteur est.
            Nostrud consectetur id anim amet quis amet ipsum aliquip ad veniam. Est aliquip culpa deserunt sunt qui do excepteur ullamco est irure proident deserunt consectetur. Veniam mollit cillum voluptate laborum occaecat nisi ut sint occaecat nostrud qui. Amet commodo exercitation aute laboris esse nisi sunt sit dolor qui ad anim Lorem adipisicing. Duis consectetur minim laboris enim amet nisi proident. Dolore nostrud occaecat proident in esse. Consectetur dolor dolor aliquip reprehenderit nisi amet culpa eiusmod excepteur est.
            Nostrud consectetur id anim amet quis amet ipsum aliquip ad veniam. Est aliquip culpa deserunt sunt qui do excepteur ullamco est irure proident deserunt consectetur. Veniam mollit cillum voluptate laborum occaecat nisi ut sint occaecat nostrud qui. Amet commodo exercitation aute laboris esse nisi sunt sit dolor qui ad anim Lorem adipisicing. Duis consectetur minim laboris enim amet nisi proident. Dolore nostrud occaecat proident in esse. Consectetur dolor dolor aliquip reprehenderit nisi amet culpa eiusmod excepteur est.
            Nostrud consectetur id anim amet quis amet ipsum aliquip ad veniam. Est aliquip culpa deserunt sunt qui do excepteur ullamco est irure proident deserunt consectetur. Veniam mollit cillum voluptate laborum occaecat nisi ut sint occaecat nostrud qui. Amet commodo exercitation aute laboris esse nisi sunt sit dolor qui ad anim Lorem adipisicing. Duis consectetur minim laboris enim amet nisi proident. Dolore nostrud occaecat proident in esse. Consectetur dolor dolor aliquip reprehenderit nisi amet culpa eiusmod excepteur est.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.div_container {
  overflow-y: hidden;
}
</style>
