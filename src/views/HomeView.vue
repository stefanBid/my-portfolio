<script lang="ts">
import { defineComponent } from 'vue';
import MyButton from '../components/MyButtonComponent.vue'
import MySection from '../components/MySectionComponent.vue'
import {ButtonType} from '../types'

export default defineComponent({
    name:'HomeView',
    components:{MyButton, MySection},
    data(){
        return{
            ButtonType,
            iconsArray:[] as String[]
        }
    },
    methods:{
        
        goToDownload(){
            window.open("https://drive.google.com/file/d/1wuibB821wePCKiF6Uy66dn623g7eW39g/view?usp=share_link")
            
        },
        goToSocialContact(index:number){
            switch(index){
                case 1:{
                    window.open("https://www.linkedin.com/in/stefano-biddau-669149214/")
                    break
                }
                case 2:{
                    window.open("https://github.com/stefanBid")
                    break
                }
                case 3:{
                    window.open("https://www.instagram.com/stefano_bid/")
                    break
                }
                default:{
                    break
                }
            }
        }
    },
    created() {
        this.iconsArray = ['bx bxl-linkedin','bx bxl-github','bx bxl-instagram-alt']
    },
})
</script>

<template>
    <!--Home Section-->
    <MySection>
            <h3 slot="rside">Hello It's Me</h3>
            <h1>Stefano Biddau</h1>
            <h3>And I'm a <span>Frontend Developer</span></h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint quasi perferendis inventore non quaerat ipsa!</p>
            <div class="social-media">
                <MyButton v-for="index of 3" :type="ButtonType.ROUNDED" @click="goToSocialContact(index)"><i :class="iconsArray[index-1]" ></i></MyButton>
            </div>
            <MyButton @click="goToDownload" :type="ButtonType.CLASSIC">Download CV <i class='bx bx-download'></i></MyButton>
            <template #next>
                <img src="../assets/myPhoto.jpg">
            </template>
    </MySection>
</template>

<style scoped>

h3:nth-of-type(2){
    margin-bottom: 30px;
}

h3 span{
    color: var(--main-color);
}


.social-media {
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 2rem;
    padding: 3rem 1.5rem 3rem 0;
}

/*--- BREAK POINT ---*/
@media (max-width: 768px){
   
    h1{
        font-size: 5rem;
    }

    h3{
        font-size: 2.6rem;
    }
    .social-media{
        justify-content: center;
    }
}

</style>