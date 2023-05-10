<template>
    <!--Home Section-->
    <MySection>
            <h3 slot="rside">Hello It's Me</h3>
            <h1>Stefano Biddau</h1>
            <MyTitle :position="titlePosition" dimension="medium" class="mb-[30px]">
                Hello
                <template #prettyText>Dear</template>
            </MyTitle>

            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint quasi perferendis inventore non quaerat ipsa!</p>
            <div class="social-media">
                <MyButton v-for="contact of contacts" :type="ButtonType.ROUNDED" @click="goToSocialContact(contact.url)"><i :class="contact.icon"></i></MyButton>
            </div>
            <MyButton @click="downloadCv"  :type="ButtonType.CLASSIC">Download CV <i class='bx bx-download'></i></MyButton>
            <template #next>
                <img src="../assets/myPhoto.jpg">
            </template>
    </MySection>

</template>

<script setup lang="ts">
import MySection from '@/components/MySectionComponent.vue';
import MyButton from '@/components/MyButtonComponent.vue';
import MyTitle from '@/components/MyTitleComponent.vue';
import { ButtonType } from '@/types';
import { computed, onMounted, ref } from 'vue';
/**
 * TODO: Cambiare lorem ipsum
 * TODO: Anumazione competenze
 * 
 */
 
 const breakPoint = ref<number>(768);
 const changeTitlePosition = ref<boolean>();

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

const titlePosition = computed(()=>{
    console.log("entro");
    return (changeTitlePosition.value)?'center':'left';
})

const downloadCv = function(){
    window.open("https://drive.google.com/file/d/1wuibB821wePCKiF6Uy66dn623g7eW39g/view?usp=share_link");
};

const goToSocialContact = function(url:string){
    window.open(url);
};

const addResizeEvent = function(){
    window.addEventListener('resize',()=>{
        (window.innerWidth>breakPoint.value)? changeTitlePosition.value = false : changeTitlePosition.value = true;
    });
};

onMounted(()=>{
    changeTitlePosition.value = window.innerWidth<breakPoint.value;
    addResizeEvent(); 
});

</script>

<style scoped>
 
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