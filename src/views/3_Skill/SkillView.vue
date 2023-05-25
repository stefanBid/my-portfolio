<script setup lang="ts">
    import ErrorLoadDataCard from '@components/ErrorLoadDataCard.vue';
    import SkillGrid from '@views/3_Skill/components/SkillGrid.vue';
    import SkillGridCard from '@views/3_Skill/components/SkillGridCard.vue';
    import { useSkillStore } from '@/stores/skill';
    import { storeToRefs } from 'pinia';
    import { computed, onMounted, ref } from 'vue';

    const skillStore = useSkillStore();
    const {skills, error} = storeToRefs(skillStore);
    const {getAllSkills} = skillStore;

    const searchKey = ref<string>('');
    const skillActive = ref<object>({})

    const skillsToView = computed(()=>{
        return (searchKey.value.length)
        ?
        skills.value.filter(skill=>skill.name.toUpperCase().includes(searchKey.value.toUpperCase()))
        :
        skills.value;
    });

    const seeLevel = function(selectedSkill:object){
        if(selectedSkill === skillActive.value){
            skillActive.value = {}
        }else{
            skillActive.value = selectedSkill;
        }
    };

    onMounted(() => {
        getAllSkills();
    });

</script>

<template>
    <SkillGrid>
        <template #title>
            <AppTitle position="center" dimension="big">
                <template #default>
                    My
                </template>
                <template #prettyText>
                    Skills
                </template>
            </AppTitle>
            <p id="info">Tap the cards to see Skill level</p>
        </template>
        <AppSearchBar v-model:search-key="searchKey" />
        <template v-if="error">
            <div class="msg">
                <ErrorLoadDataCard :error-type="error" />
            </div>
        </template>
        <template v-else-if="!error">
            <template v-if="skillsToView.length !=0">
                <SkillGridCard v-for="skill of skillsToView" :key="skill.name" @click="seeLevel(skill)">
                    <template #card-title>
                        <i :class="skill.icon" />
                        <h3>{{ skill.name }}</h3>
                    </template>
                    <template #default>
                        <h4>Type: <span>{{ skill.category }}</span></h4>
                        <p>{{ skill.description }}</p>
                    </template>
                    <template #card-footer>
                        <p class="level" :style="{opacity: skill === skillActive?1:0}">Skill Level: <span v-for="x of 5" :key="x" :class="{fill:(x<=skill.level)}" /></p>
                    </template>
                </SkillGridCard>
            </template>
            
            <template v-else>
                <div class="msg">
                    <AppTitle position="center" dimension="big">
                        <template #default>
                            No match found
                        </template>
                        <template #prettyText>
                            <i class="bx bxs-confused animate-bounce" />
                        </template>
                    </AppTitle>
                </div>
            </template>
        </template>
    </SkillGrid>
</template>

<style scoped>

h2 span{
    color: var(--main-color);
}

#info {animation: infinite alternate-reverse 1s slidein; font-size: 1.6rem; text-align: center;}

@keyframes slidein {
0% {opacity:0.5;}
100% {opacity:1;}
}

h4 span{
    color: var(--main-color);
}


.level{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    opacity: 1;
    transition: .3s ease-in-out;
}

.level span{
    margin-left: 1rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: .2rem solid var(--main-color);
}

.fill{
    background: var(--main-color);
    box-shadow: 0 0 1rem var(--main-color);
}


.msg{
    min-height: 50vh;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
}

/*--- BREAK POINT ---*/
@media (max-width: 768px){
}
</style>