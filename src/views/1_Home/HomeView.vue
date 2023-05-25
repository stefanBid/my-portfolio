<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import { AppButtonType } from '@/types';
    import {ExternalLinkType} from '@/types';
    import { storeToRefs } from 'pinia';
    import TheSection from '@components/TheSection.vue';
    import { useExternalLinkStore } from '@stores/externalLink';
    import UtilityService from '@services/UtilityService';
    /**
     * TODO: Cambiare lorem ipsum
     * TODO: Anumazione competenze
     * 
     */
    
    const breakPoint = ref<number>(768);
    const changeTitlePosition = ref<boolean>(false);

    const {getUrlByName} = storeToRefs(useExternalLinkStore());

    const contacts = computed(()=>{
        return [
            {
                url:ExternalLinkType.LINKEDIN_LINK_LABEL,
                icon:'bx bxl-linkedin',
            },
            {
                url:ExternalLinkType.GITHUB_LINK_LABEL,
                icon:'bx bxl-github',
            },
            {
                url:ExternalLinkType.INSTAGRAM_LINK_LABEL,
                icon:'bx bxl-instagram-alt',
            },
            
        ]
    });

    const titlePosition = computed(()=>{
        return (changeTitlePosition.value)?'center':'left';
    })

    const goToExternalLink = function(url:string|undefined){
        UtilityService.openLink(url);
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

<template>
    <TheSection>
        <template #default>
            <h3>Hello It's Me</h3>
            <h1>Stefano Biddau</h1>
            <AppTitle 
                :position="titlePosition" 
                dimension="medium" 
                class="mb-[30px]"
            >
                <template #default>
                    I'm
                </template>
                <template #prettyText>
                    Frontend developer
                </template>
            </AppTitle>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint quasi perferendis inventore non quaerat ipsa!</p>
            <div class="social-media">
                <AppButton 
                    v-for="contact of contacts"  
                    :key="contact.url"
                    :type="AppButtonType.ROUNDED"
                    @click="goToExternalLink(getUrlByName(contact.url))"
                >
                    <i :class="contact.icon" />
                </AppButton>
            </div>
            <AppButton 
                :type="AppButtonType.CLASSIC" 
                @click="goToExternalLink(getUrlByName(ExternalLinkType.CV_LINK_LABEL))"
            >
                Download CV <i class="bx bx-download animate-bounce" />
            </AppButton>
        </template>
        <template #next>
            <img src="@images/myPhoto.jpg">
        </template>
    </TheSection>
</template>

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