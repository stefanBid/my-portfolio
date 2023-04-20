<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    props:{
        btnClass:{
            type:String,
            required:false
        },
        btnHidden:{
            type:Boolean,
            required:false
        },
        btnDisabled:{
            type:Boolean,
            required:false
        }
    },
    computed:{
        isHidden(){
            if(this.btnHidden === undefined){
                return false
            }else{
                return this.btnHidden
            }
        },
        isDisabled(){
            if(this.btnDisabled === undefined){
                return false
            }else{
                return this.btnDisabled
            }
        }
    }
})
</script>

<template>
<button :class="btnClass" :hidden="isHidden" :disabled="isDisabled">
    <slot></slot>
</button>
</template>

<script setup>
</script>