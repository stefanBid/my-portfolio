<template>
    <!--Home Section-->
    <MySection>
            <h3 slot="rside">Hello It's Me</h3>
            <h1>Stefano Biddau</h1>
            <h3>And I'm a <span>Frontend Developer</span></h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint quasi perferendis inventore non quaerat ipsa!</p>
            <div class="social-media">
                <MyButton v-for="contact of contacts" :type="ButtonType.ROUNDED" @click="goToSocialContact(contact.url)"><i :class="contact.icon"></i></MyButton>
            </div>
            <MyButton @click="downloadCv" :type="ButtonType.CLASSIC">Download CV <i class='bx bx-download'></i></MyButton>
            <template #next>
                <img src="../assets/myPhoto.jpg">
            </template>
    </MySection>

</template>

<script setup lang="ts">
import MySection from '@/components/MySectionComponent.vue';
import MyButton from '@/components/MyButtonComponent.vue';
import { ButtonType } from '@/types';
import { computed } from 'vue';
/**
 * TODO: Cambiare lorem ipsum
 * TODO: Creare componente riutilizzabile per i titoli
 * TODO: Anumazione competenze
 * 
 */
const contacts = computed(()=>{
    return [
        {
            url:'https://www.linkedin.com/in/stefano-biddau-669149214/',
            icon:'bx bxl-linkedin',
        },
        {
            url:'https://github.com/stefanBid',
            icon:'bx bxl-github',
        },
        {
            url:'https://www.instagram.com/stefano_bid/',
            icon:'bx bxl-instagram-alt',
        },
        
    ]
});

const downloadCv = function(){
    window.open("https://drive.google.com/file/d/1wuibB821wePCKiF6Uy66dn623g7eW39g/view?usp=share_link");
};

const goToSocialContact = function(url:string){
    window.open(url);
};
</script>

<style scoped>
    h3:nth-of-type(2){margin-bottom: 30px;}

    h3 span{color: var(--main-color);}
    .social-media {
        display: flex;
        justify-content: left;
        align-items: center;
        gap: 2rem;
        padding: 3rem 1.5rem 3rem 0;
    }

    /*--- BREAK POINT ---*/
    @media (max-width: 768px){
        .social-media{
            justify-content: center;
        }
    } 
</style>