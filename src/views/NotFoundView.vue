<template >
    <div class="not-found" >
        <AppTitle :position="'center'" :dimension="'big'" class="animate animate-bounce" >
            <template #default >404 - Page not found </template >
            <template #prettyText >
                <i class="bx bxs-error" />
            </template >
        </AppTitle >
    </div >
</template >

<style scoped >
    
    .not-found {
        @apply h-screen;
        @apply flex;
        @apply flex-col;
        @apply items-center;
        @apply justify-center;
    }
    
</style >