<template>

    <MySection invert :distance="10">
        <h2>About <span>Me</span></h2>
            <template v-for="(inf,index) of info">
                <h3 :style="{paddingTop: (index==0)?'2rem':'0'}">{{inf.head}}</h3>
                <p>{{inf.content}}</p>
            </template>
            <MyButton @click="$event =>{isMore = !isMore}" :type="ButtonType.CLASSIC">{{btnInfo.text}}<i :class="btnInfo.icon"></i></MyButton>
        <template #next>
            <img src="../assets/myPhoto.jpg" alt="profile">
        </template>
    </MySection>
 
</template>

<script setup lang="ts">
import MyButton from '@/components/MyButtonComponent.vue';
import MySection from '@/components/MySectionComponent.vue';
import { ButtonType } from '@/types';
import { computed, onMounted, ref } from 'vue';

const isMore = ref<boolean|undefined>();
const info = computed(()=>{
   let aboutMeArray = 
    [
        {head:'Frontend Developer', content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum distinctio iure in perspiciatis maxime ullam minus doloribus!'},
        {head:'Backend Developer', content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum distinctio iure in perspiciatis maxime ullam minus doloribus!'},
        {head:'Content Creator', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum distinctio iure in perspiciatis maxime ullam minus doloribus!'},
    ] 

    return isMore.value? aboutMeArray :[aboutMeArray[0]]
});

const btnInfo = computed(()=>{
    return isMore.value? {text:'Read less', icon:'bx bx-up-arrow-alt'}: {text:'Read more', icon:'bx bx-down-arrow-alt'};
});

onMounted(() => {
   isMore.value = false; 
});


</script>

<style scoped>
    h2 span{
        color: var(--main-color);
    }
</style>