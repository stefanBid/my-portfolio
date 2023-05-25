<script setup lang="ts">
import { HandlingError } from '@/types';

const props = defineProps({
    errorType: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div class="error-container">
        <template v-if="props.errorType === HandlingError.ERR_BAD_REQUEST">
            <AppTitle position="center" dimension="big">
                <template #default>
                    Unable to load data
                </template>
                <template #prettyText>
                    <i class="bx bx-server animate-bounce" />
                </template>
            </AppTitle>
            <h4>Server problems please try again later...</h4>
        </template>
        <template v-else-if="props.errorType === HandlingError.ERR_NETWORK">
            <AppTitle position="center" dimension="big">
                <template #default>
                    Cannot connect to the server
                </template>
                <template #prettyText>
                    <i class="bx bx-wifi-off animate-bounce" />
                </template>
            </AppTitle>
            <h4>Check your internet connection and try again...</h4>
        </template>
    </div>
</template>

<style scoped>

h4{
    @apply text-1.6;
    @apply font-semibold;
    @apply text-pink;
}
.error-container{
    @apply h-auto;
    @apply flex;
    @apply flex-col;
    @apply justify-center;
    @apply items-center;
    @apply gap-y-2;
}
</style>