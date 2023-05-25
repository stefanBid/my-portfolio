<template >
    <div class="p-2 search-content" >
        <input 
        type="text" 
        placeholder="Search..."
        :value="props.searchKey"
        @input="action(($event.target as HTMLInputElement).value)"
        />
    </div >
</template >

<script setup lang="ts" >
    const props = defineProps({
        searchKey:{type:String, required:false, default:''}
    })

    const emit = defineEmits(['update:searchKey']);

    const action = function(value:string){
        emit('update:searchKey',value);
    };

</script >

<style scoped >
    .search-content{
        @apply flex;
        @apply flex-col;
        @apply items-center;
        @apply justify-center;
        @apply w-full;
        @apply py-[2rem];
        @apply px-[9%];
    }

    .search-content input{
        @apply w-[80%];
        @apply py-[1rem];
        @apply px-[2rem];
        @apply rounded-input;
        @apply border-solid;
        @apply border-5;
        @apply border-board;
        @apply text-white;
        @apply text-1.8;
        @apply bg-transparent;
        @apply transition-all;
        @apply ease-in-out;
        @apply duration-300;

        @apply placeholder:italic;
        @apply placeholder:text-pink;
        @apply placeholder:opacity-60;

        @apply focus:w-full;
        @apply focus:p-[2rem];
        @apply focus:border-2;
        @apply focus:border-pink;
        @apply focus:shadow-button;
        @apply focus:shadow-pink;

    }
</style >