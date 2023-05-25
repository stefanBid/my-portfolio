<script setup lang="ts">
    import { computed } from 'vue';
    const props = defineProps({
        position:{type:String, required:true, validator(value:string){return ['left','center','right'].includes(value)}},
        dimension:{type:String, required:true, validator(value:string){return ['small','medium','big'].includes(value)}},
    });

    const pos = computed(()=>{
        return ({left:'l-side',center:'c-side', right:'r-side'})[props.position] ?? 'c-side';
    });

    const dim = computed(()=>{
        return ({small:'sm-title', medium:'md-title', big:'bg-title'})[props.dimension] ?? 'md-title';
    })
</script>

<template>
    <div :class="[pos,dim]" class="title-container">
        <h2> 
            <slot />
            <span> <slot name="prettyText" /> </span>
        </h2>
    </div>
</template>

<style scoped>
    @tailwind components;
    @tailwind base;

    @layer base{
        h2{@apply font-bold;}

        span{@apply text-pink;}
    }

    @layer components{
       .title-container{
        @apply w-full flex flex-col justify-center;
       } 

       .l-side{@apply items-start;}

       .c-side{@apply items-center;}

       .r-side{@apply items-end;}

       .sm-title{@apply text-title-sm;}
       
       .md-title{@apply text-title-base;}

       .bg-title{@apply text-title-lg;}

    }
</style>