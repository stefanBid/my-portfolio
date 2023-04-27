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
            <h4>{{project.name}}</h4>
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

h2{
    font-size: 4.5rem;
    line-height: 1.2;
    text-align: center;
}

h2 span{
    color: var(--main-color);
}

h4 {
    font-size: 3rem;
}

p{
    font-size: 1.6rem;
    margin: .3rem 0 1rem;
}

.links{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
}

.links a{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 5rem;
    height: 5rem;
    background: var(--text-color);
    border-radius: 50%;
}

.links a i{
    font-size: 3rem;
    color: var(--second-bg-color);
}

img{
    width: 100%;
}

/*--- BREAK POINT ---*/
@media (max-width: 768px){
    h2{
        margin-bottom: 3rem;
    }

    img{
        zoom: 30%
    };
}

</style>