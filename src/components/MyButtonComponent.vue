<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name:"MyButton",
    props:{
        btnClass:{
            type:String,
            required:false
        },
        disabled:{
            type:Boolean,
            required:false,
            default:false
        }
    }
})
</script>

<template>
<button :class="btnClass" :disabled="disabled">
    <slot></slot>
</button>
</template>

<script setup>
</script>