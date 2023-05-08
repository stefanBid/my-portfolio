<template>
    <MyGrid search-bar v-model:search-key="searchKey" :type="GridType.FLEX">
        <template #title>
            <h2 class="heading">My <span>Skils</span></h2>
            <p id="info">Tap the cards to see Skill level</p>
        </template>
        <!--Case 1 NO CONNECTION-->
        <div class="msg" v-if="error === RequestError[RequestError.ERR_NETWORK]">
            <h1>Missing connection <i class='bx bx-wifi-off'></i></h1>
            <h4>Check your internet connection and try again...</h4>
        </div>
        <!--Case 2 INTERNAL SERVER PROBLEMS-->
        <div class="msg" v-else-if="error === RequestError[RequestError.ERR_REQUEST]">
            <h1>Unable to load data <i class='bx bx-server' ></i></h1>
            <h4>Server problems please try again later...</h4>
        </div>
        <!--CASE 3 STATUS OK-->
        <template v-else-if="!error">
            <template v-if="skillsToView.length !=0">
                <MyCard :type="CardType.FLEX" v-for="skill of skillsToView" @click="seeLevel(skill)">
                    <template #header>
                        <i :class=skill.icon></i>
                        <h3>{{skill.name}}</h3>
                    </template>
                    <h4>Type: <span>{{ skill.category }}</span></h4>
                    <p>{{ skill.description }}</p>
                    <template #footer>
                        <p class="level" :style="{opacity: skill === skillActive?1:0}">Skill Level: <span v-for="x of 5" :class="{fill:(x<=skill.level)}"></span></p>
                    </template>

                </MyCard>
            </template>
            <template v-else>
                <div class="msg">
                    <h1>No match found <i class='bx bxs-confused'></i></h1>
                </div>
            </template>
        </template>
    </MyGrid>
</template>

<script setup lang="ts">
import MyGrid from '@/components/MyGridComponent.vue';
import MyCard from '@/components/MyCardComponent.vue';
import { useSkillStore } from '@/stores/skill';
import { RequestError, GridType, CardType} from '@/types';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';

const skillStore = useSkillStore();
const {skills, error} = storeToRefs(skillStore);
const {getAllSkills} = skillStore;

const searchKey = ref<string>('');
const skillActive = ref<Object>({})

const skillsToView = computed(()=>{
    return (searchKey.value.length)
    ?
    skills.value.filter(skill=>skill.name.toUpperCase().includes(searchKey.value.toUpperCase()))
    :
    skills.value;
});

const seeLevel = function(selectedSkill:Object){
    skillActive.value = selectedSkill;
};

onMounted(() => {
    getAllSkills();
});

</script>

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

.msg h1{
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    font-size: 4.5rem;
}

/*--- BREAK POINT ---*/
@media (max-width: 768px){
    .msg h1 {
        font-size: 3.5rem;
    }
    .msg h1 i{
        font-size: 3.5rem;
    }
}
</style>