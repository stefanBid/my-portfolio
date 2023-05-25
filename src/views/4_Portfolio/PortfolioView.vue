<script setup lang="ts">
    import PortfolioGrid from '@views/4_Portfolio/components/PortfolioGrid.vue';
    import PortfolioGridCard from '@views/4_Portfolio/components/PortfolioGridCard.vue';
    import { AppButtonType } from '@/types';
    import { useProjectStore } from '@/stores/project';
    import { useExternalLinkStore } from '@stores/externalLink';
    import UtilityService  from '@services/UtilityService';
    import { storeToRefs } from 'pinia';
    import { onMounted } from 'vue';

    const projectStore = useProjectStore();
    const {projects} = storeToRefs(projectStore);
    const {getAllProjects} = projectStore;

    const {getUrlByName} = storeToRefs(useExternalLinkStore());

    const goToExternalLink =  function(url:string|undefined){
        UtilityService.openLink(url);
    }

    onMounted(()=>{
        getAllProjects();
    });
</script>

<template>
    <PortfolioGrid>
        <template #title>
            <AppTitle position="center" dimension="big">
                <template #default>
                    My latest
                </template>
                <template #prettyText>
                    Project
                </template>
            </AppTitle>
        </template>
        <PortfolioGridCard v-for="(project,index) of projects" :key="index" class="portfolio-box">
            <template #card-bg-img>
                <img v-if="index === 0" src="@images/gmn.jpg" alt="">
                <img v-else-if="index === 1" src="@images/pg.jpg" alt="">
                <img v-else src="@images/ai.jpg" alt="">
            </template>
            <template #default>
                <h3>{{ project.name }}</h3>
                <p>{{ project.description }}</p>
                <div class="links">
                    <AppButton 
                        :type="AppButtonType.ROUNDED_MINIMAL"
                        @click="goToExternalLink(getUrlByName(project.repoLinkLabel))"
                    >
                        <i class="bx bx-link-external" />
                    </AppButton>

                    <AppButton 
                        v-if="project.playLinkLabel" 
                        :type="AppButtonType.ROUNDED_MINIMAL"
                        @click="goToExternalLink(getUrlByName(project.playLinkLabel))"
                    >
                        <i class="bx bx-joystick" />
                    </AppButton>
                </div>
            </template>
        </PortfolioGridCard>
    </PortfolioGrid>
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