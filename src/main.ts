import { createApp } from 'vue';
import { createHead } from '@unhead/vue/client';
import { createPinia } from 'pinia';

import './style/index.css';
import 'sb-floating-panel-vue/style.css';

import App from './App.vue';
import i18n from './i18n/index';
import { router, isLoading } from './router/index';

// Create the Vue application instance
const app = createApp(App);

// Create and use the head instance for managing meta tags
const head = createHead();
app.use(head);

// Use Pinia first to ensure global state is available
const pinia = createPinia();
app.use(pinia);

// Use the router for handling routes
app.use(router);

// Provide the isLoading reactive reference globally
app.provide('isLoading', isLoading);

// Use i18n for internationalization
app.use(i18n);

// Mount the app to the DOM
app.mount('#app');
