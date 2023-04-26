<script lang="ts">
import { defineComponent } from 'vue'
import MyButton from '@/components/MyButtonComponent.vue'
import MySection from '../components/MySectionComponent.vue'
import type {AboutMeItem} from '../types'
export default defineComponent({
    name:"AboutView",
    components:{MyButton, MySection},
    data(){
        return{
            aboutMeArray: [] as AboutMeItem[],
            isMore:false,
        }
    },
    computed:{
        aboutMeItems(){
            if(this.isMore){
                return this.aboutMeArray
            }else{
                return [this.aboutMeArray[0]]
            }
        },
        btnTextContent(){
            if(!this.isMore){
                return 'Read More'
            }else{
                return 'Read Less'
            }
        },
        btnIconContent(){
            if(!this.isMore){
                return 'bx bx-down-arrow-alt'
            }else{
                return 'bx bx-up-arrow-alt'
            }
        }

    },
    created(){
        this.aboutMeArray = [
            {head:'Frontend Developer', content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum distinctio iure in perspiciatis maxime ullam minus doloribus!'},
            {head:'Backend Developer', content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum distinctio iure in perspiciatis maxime ullam minus doloribus!'},
            {head:'Content Creator', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum distinctio iure in perspiciatis maxime ullam minus doloribus!'},
            
        ]
    }

})
</script>

<template>
    <MySection invert :distance="10">
        <h2>About <span>Me</span></h2>
            <template v-for="(item, index) of aboutMeItems">
                <h3 :style="{paddingTop: (index==0)?'2rem':'0'}">{{item.head}}</h3>
                <p>{{item.content}}</p>
            </template>
            <MyButton @click="$event =>{isMore = !isMore}" :btn-class="'btn'">{{btnTextContent}}<i :class="btnIconContent"></i></MyButton>
        <template #next>
            <img src="../assets/myPhoto.jpg" alt="profile">
        </template>
    </MySection>
</template>

<style scoped>

img{
    width: 35vw;
    zoom: 70%;
}

.about-content{
    text-align: left;
}

h2{
    font-size: 4.5rem;
    line-height: 1.2;
}

h2 span{
    color: var(--main-color);
}

h3{
    font-size: 2.6rem;
}

p{
    font-size: 1.6rem;
    margin: 2rem 0 3rem;
}


.btn{
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2.8rem;
    background: var(--main-color);
    border-radius: 4rem;
    border: 1px solid var(--main-color);
    box-shadow: 0 0 1rem var(--main-color);
    font-size: 1.6rem;
    font-weight: 600;
    letter-spacing: .1rem;
    color: var(--second-bg-color);
    transition: .3s ease-in-out;
    cursor: pointer;
}

.btn i{
    font-size: 2rem;
    padding: 0 0 0 1.2rem;
    font-weight: 900;
}

.btn:hover{
    box-shadow: none;
    background: var(--second-bg-color);
    color: var(--main-color);
}
</style>