<script lang="ts">
import { defineComponent } from 'vue';
import MyGrid from '../components/MyGridComponent.vue'
import MyCard from '@/components/MyCardComponent.vue';
import MyButton from '../components/MyButtonComponent.vue';
import {useProjectStore} from '../stores/project'
import { ButtonType } from '@/types';

export default defineComponent({
    name:'PortfolioView',
    components:{MyGrid, MyCard, MyButton},
    data() {
        return{
            ButtonType
        }
    },
    setup(){
       const storeProject = useProjectStore()
       return {storeProject}
    },
    created(){
        this.storeProject.getAllProjects()
    }
})
</script>

<template>
<section class="portfolio">
    <MyGrid :type-grid="'grid'">
        <template #title>
            <h2>Latest <span>Project</span></h2>
        </template>
        <MyCard :type-card="'grid'" v-for="(project,index) of storeProject.projects" class="portfolio-box">
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