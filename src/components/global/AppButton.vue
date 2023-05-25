<script setup lang="ts">
    import type {PropType} from 'vue';
    import { AppButtonType } from '@/types';

    const props = defineProps({
        disabled:{type:Boolean, required:false, default:false},
        type:{
            type:String as PropType<AppButtonType>,
            required: false,
            default: AppButtonType.CLASSIC,
        }
    });
</script>

<template>
    <button 
        :disabled="props.disabled" 
        :class="[props.type, 'btn']" 
    >
        <slot />
    </button>
</template>


<style scoped>
@tailwind components;

@layer components{
    .btn{
        @apply 
        inline-flex 
        justify-center 
        items-center 
        gap-3 
        text-1.6
        font-semibold 
        tracking-widest 
        duration-300 
        ease-in-out 
        cursor-pointer

        disabled:cursor-no-drop
        disabled:opacity-50;
    }

    .classic{
        @apply 
        py-4 
        px-11 
        bg-pink 
        rounded-button 
        border-solid 
        border-2 
        border-pink 
        shadow-button
        shadow-pink 
        text-board

        hover:shadow-none
        hover:bg-board
        hover:text-pink
        
        disabled:shadow-none
        disabled:text-pink
        disabled:bg-transparent;

    }

    .classic-minimal{
        @apply 
        bg-white 
        text-board 
        py-4 
        px-11
        rounded-button
        border-solid
        border-2
        border-white

        hover:bg-board 
        hover:text-white

        disabled:text-white
        disabled:bg-transparent;
    }

    .rounded{
        @apply
        w-20 
        h-20 
        bg-transparent 
        border-solid 
        border-2 
        border-pink 
        rounded-full 
        text-pink

        hover:bg-pink 
        hover:shadow-button 
        hover:shadow-pink 
        hover:text-board

        disabled:shadow-none
        disabled:text-pink
        disabled:bg-transparent;
    }

    .rounded-minimal{
        @apply 
        w-20
        h-20
        rounded-full
        bg-white
        text-board
        border-solid
        border-2
        border-white

        hover:bg-board
        hover:text-white

        disabled:bg-transparent
        disabled:text-board;

    }



    :slotted(.classic i), :slotted(.classic-minimal i){
        @apply text-2 font-black;
    }

    :slotted(.rounded i), :slotted(.rounded-minimal i){
        @apply text-3;
    }

}

</style>