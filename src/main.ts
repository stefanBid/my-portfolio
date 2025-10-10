import { createApp } from 'vue';
import { createHead } from '@unhead/vue/client';
import { createPinia } from 'pinia';

import './style/index.css';

import App from './App.vue';
import i18n from './i18n/i18n';
import { router } from './router/router';

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

// Use i18n for internationalization
app.use(i18n);

// Mount the app to the DOM
app.mount('#app');
