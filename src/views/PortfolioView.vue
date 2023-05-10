<template>
    <section class="portfolio">
        <MyGrid :type="GridType.GRID">
            <template #title>
                <MyTitle position="center" dimension="big">
                Latest
                <template #prettyText>
                    Project
                </template>
            </MyTitle>
            </template>
            <MyCard :type="CardType.GRID" v-for="(project,index) of projects" class="portfolio-box">
                <template #header>
                    <img v-if="index === 0" src="../assets/gmn.jpg" alt="">
                    <img v-else-if="index === 1" src="../assets/pg.jpg" alt="">
                    <img v-else src="../assets/ai.jpg" alt="">
                </template>
                <h3>{{project.name}}</h3>
                <p>{{ project.description }}</p>
                <div class="links">
                    <MyButton :type="ButtonType.ROUNDED_MINIMAL"><i class='bx bx-link-external'></i></MyButton>
                    <MyButton v-if="project.playPath" :type="ButtonType.ROUNDED_MINIMAL"><i class='bx bx-joystick'></i></MyButton>
                </div>
            </MyCard>
        </MyGrid>
    </section>
</template>

<script setup lang="ts">
import MyGrid from '@/components/MyGridComponent.vue';
import MyCard from '@/components/MyCardComponent.vue';
import MyButton from '@/components/MyButtonComponent.vue';
import MyTitle from '@/components/MyTitleComponent.vue';
import { ButtonType, CardType, GridType } from '@/types';
import { useProjectStore } from '@/stores/project';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const projectStore = useProjectStore();
const {projects} = storeToRefs(projectStore);
const {getAllProjects} = projectStore;

onMounted(()=>{
    getAllProjects();
});
</script>

<style scoped>

h2 span{
    color: var(--main-color);
}


p{
    margin: .3rem 0 1rem;
}

.links{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
}

</style>