import { createApp } from 'vue';

import './style/index.css';
import App from './App.vue';
import i18n from './i18n/index';
import router from './router/index';

const app = createApp(App);
app.use(router);
app.use(i18n);
app.mount('#app');
