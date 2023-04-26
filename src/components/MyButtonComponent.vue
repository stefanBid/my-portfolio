<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name:"MyButton",
    props:{
        disabled:{
            type:Boolean,
            required:false,
            default:false
        }
    }
})
</script>

<template>
<button :class="$attrs.class" :disabled="disabled">
    <slot></slot>
</button>
</template>

<script setup>
</script>