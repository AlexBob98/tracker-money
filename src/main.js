import { createApp } from 'vue';
import Toast from "vue-toastification";
import 'vue-toastification/dist/index.css';
import './assets/style.css';
import App from './App.vue';
import { createPinia } from 'pinia'

const piniaStore = createPinia()

const app = createApp(App);
app.use(piniaStore)
app.use(Toast);
app.mount('#app')
