import { createApp } from 'vue'
import { createPinia } from 'pinia'

import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'

import AppButton from './components/global/AppButton.vue';
import AppTitle from './components/global/AppTitle.vue';
import AppSearchBar from './components/global/AppSearchBar.vue'


import './assets/styles/main.css'
import './assets/styles/tailwind.css'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)

app.component('AppButton', AppButton)
app.component('AppTitle', AppTitle)
app.component('AppSearchBar', AppSearchBar)

app.mount('#app')
