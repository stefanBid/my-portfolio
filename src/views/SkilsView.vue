<script lang="ts">
import { defineComponent } from 'vue';
import MyButton from '../components/MyButtonComponent.vue'
import MyGrid from '../components/MyGridComponent.vue'
import MyCard from '@/components/MyCardComponent.vue'
import {useSkillStore} from '../stores/skill'
import {RequestError} from '../types'

export default defineComponent({
    name:"SkilsView",
    components:{MyButton, MyGrid, MyCard},
    data() {
        return{
            searchKey:'',
            activeItem:{},
            RequestError
        }
        
    },
    setup() {
        const storeSkill = useSkillStore()
        return {storeSkill}
    },
    created() {
        this.storeSkill.getAllSkills();
    },
    methods:{
        seeLevel(index:Object){
            this.activeItem = index
        },
    },
    computed:{
        getSkillToView(){
            if(this.searchKey === ''){
                return this.storeSkill.skills
            }else{
                return this.storeSkill.skills.filter(skill=>skill.name.toUpperCase().includes(this.searchKey.toUpperCase()))
            }
        }
    }

})
</script>

<template>
    <MyGrid search-bar v-model:search-key="searchKey" :type-grid="'flex'">
        <template #title>
            <h2 class="heading">My <span>Skils</span></h2>
            <p id="info">Tap the cards to see Skill level</p>
        </template>
        <template v-if="storeSkill.error === RequestError[RequestError.ERR_NETWORK]">
            <div class="msg">
                <h1>Missing connection <i class='bx bx-wifi-off'></i></h1>
                <h4>Check your internet connection and try again...</h4>
            </div>
        </template>
        <template v-else-if="storeSkill.error === RequestError[RequestError.ERR_REQUEST]">
            <div class="msg">
                <div class="msg">
                <h1>Unable to load data <i class='bx bx-server' ></i></h1>
                <h4>Server problems please try again later...</h4>
            </div>
            </div>
        </template>
        <template v-else-if="!storeSkill.error">
            <template v-if="getSkillToView.length !=0">
            <MyCard :type-card="'flex'" v-for="skill of getSkillToView" @click="seeLevel(skill)">
                <template #header>
                    <i :class=skill.icon></i>
                    <h3>{{skill.name}}</h3>
                </template>
                <h4>Type: <span>{{ skill.category }}</span></h4>
                <p>{{ skill.description }}</p>
                <template #footer>
                    <p class="level" :style="{opacity: skill === activeItem?1:0}">Skill Level: <span v-for="x of 5" :class="{fill:(x<=skill.level)}"></span></p>
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

<style scoped>
h2{
    font-size: 4.5rem;
    line-height: 1.2;
}

h2 span{
    color: var(--main-color);
}

#info {animation: infinite alternate-reverse 1s slidein; font-size: 1.6rem; text-align: center;}

@keyframes slidein {
0% {opacity:0.5;}
100% {opacity:1;}
}

i{
    font-size: 7rem;
    color: var(--main-color);
}

h3{
    font-size: 2.6rem;
}

h4{
    font-size: 2rem;
}

h4 span{
    color: var(--main-color);
}

p{
    font-size: 1.6rem;
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