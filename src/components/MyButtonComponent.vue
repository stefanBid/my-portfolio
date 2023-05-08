<template>
    <button 
        :disabled="disabled"
        :class="[type, 'btn']">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import type{PropType} from 'vue';
import { ButtonType } from '@/types';

const props = defineProps({
    disabled:{type:Boolean, required:false, default:false},
    type:{
        type:String as PropType<ButtonType>,
        required: false,
        default: ButtonType.CLASSIC,
    }
});
</script>


<style scoped>

.btn{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap:0.7rem;
    font-size: 1.6rem;
    font-weight: 600;
    letter-spacing: .1rem;
    transition: .3s ease-in-out;
    cursor: pointer;
}
.classic{
    padding: 1rem 2.8rem;
    background: var(--main-color);
    border-radius: 4rem;
    border: 1px solid var(--main-color);
    box-shadow: 0 0 1rem var(--main-color);
    color: var(--second-bg-color);
}

.classic:hover{
    box-shadow: none;
    background: var(--second-bg-color);
    color: var(--main-color);
}

.classic:disabled{
    opacity: 0.7;
    cursor: no-drop;
    box-shadow: none;
    background: var(--second-bg-color);
    color: var(--main-color);
}

:slotted(.classic i){
    font-size: 2rem;
    font-weight: 900;
}

.classic-minimal{
    background: var(--text-color);
    color: var(--second-bg-color); 
    padding: 1rem 2.8rem;
    border-radius: 4rem;
}

.classic-minimal:hover{
    background: var(--second-bg-color);
    color: var(--text-color);
}

:slotted(.classic-minimal i){
    font-size: 2rem;
    font-weight: 900;
}


.rounded{
    width: 5rem;
    height: 5rem;
    background: transparent;
    border: .2rem solid var(--main-color);
    border-radius: 50%;
    color: var(--main-color);
}

:slotted(.rounded i){
    font-size: 3rem;
}

.rounded:hover{
    background: var(--main-color);
    color: var(--second-bg-color);
    box-shadow: 0 0 1rem var(--main-color);
}

.rounded:disabled{
    opacity: 0.7;
    cursor: no-drop;
    background: var(--main-color);
    color: var(--second-bg-color);
    box-shadow: none;
}

.rounded-minimal{
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background: var(--text-color);
    color: var(--second-bg-color); 
}

.rounded-minimal:hover{
    background: var(--second-bg-color);
    color: var(--text-color);
}

:slotted(.rounded-minimal i){
    font-size: 3rem;
}

</style>