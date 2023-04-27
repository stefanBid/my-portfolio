<script lang="ts">
import { defineComponent } from 'vue'
import MyButton from '@/components/MyButtonComponent.vue'
import MySection from '../components/MySectionComponent.vue'
import type {AboutMeItem} from '../types'
import {ButtonType} from '../types'
export default defineComponent({
    name:"AboutView",
    components:{MyButton, MySection},
    data(){
        return{
            aboutMeArray: [] as AboutMeItem[],
            isMore:false,
            ButtonType
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
            <MyButton @click="$event =>{isMore = !isMore}" :type="ButtonType.CLASSIC">{{btnTextContent}}<i :class="btnIconContent"></i></MyButton>
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

/*--- BREAK POINT ---*/
@media (max-width: 768px){
    img{
        zoom: 90%;
        width: 50vw;
    }

    h2{
        font-size: 5rem;
    }

    h3{
        font-size: 2.6rem;
    }
}
</style>