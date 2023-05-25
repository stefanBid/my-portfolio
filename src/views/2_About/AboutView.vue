<script setup lang="ts">
    import TheSection from '@/components/TheSection.vue';
    import { AppButtonType } from '@/types';
    import { computed, onMounted, ref } from 'vue';


    const breakPoint = ref<number>(768);
    const changeTitlePosition = ref<boolean>(false);

    const isMore = ref<boolean>(false);
    const info = computed(()=>{
    const aboutMeArray = 
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

    const titlePosition = computed(() => {
        return changeTitlePosition.value ? 'center' : 'left';
    });

    const addResizeEvent = function(){
        window.addEventListener('resize',()=>{
            (window.innerWidth>breakPoint.value)? changeTitlePosition.value = false : changeTitlePosition.value = true;
        });
    };

    onMounted(() => {
        addResizeEvent();
        (window.innerWidth>breakPoint.value)? changeTitlePosition.value = false : changeTitlePosition.value = true;
    });
</script>

<template>
    <!--About Me Section-->
    <TheSection is-mirrored :distance="10">
        <template #default>
            <AppTitle dimension="big" :position="titlePosition">
                <template #default>
                    About
                </template>
                <template #prettyText>
                    Me
                </template>
            </AppTitle>
            <template v-for="(inf,index) of info" :key="index">
                <h3 :style="{paddingTop: (index==0)?'2rem':'0'}"> {{ inf.head }} </h3>
                <p>{{ inf.content }}</p>
            </template>
            <AppButton :type="AppButtonType.CLASSIC" @click="(_$event:any) =>{isMore = !isMore}">
                {{ btnInfo.text }}<i :class="[btnInfo.icon, 'animate-bounce']" />
            </AppButton>
        </template>
        <template #next>
            <img src="@images/myPhoto.jpg" alt="profile">
        </template>
    </TheSection>
</template>

<style scoped>
    h2 span{
        color: var(--main-color);
    }
</style>