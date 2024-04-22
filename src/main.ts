import { createApp } from 'vue';
import './style/index.css';
import router from './router/index';
import i18n from './i18n/index';
import App from './App.vue';

const app = createApp(App);
app.use(router);
app.use(i18n);
app.mount('#app');
