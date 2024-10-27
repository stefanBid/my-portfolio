import { createApp } from 'vue';
import { createPinia } from 'pinia';

import './style/index.css';
import App from './App.vue';
import i18n from './i18n/index';
import { router, isLoading } from './router/index';

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.provide('isLoading', isLoading);
app.use(pinia);
app.use(i18n);
app.mount('#app');
