import { createApp } from 'vue'
import App from './App.vue'

//Importamos el router...
import router from './router/router.js';
//Importamos Pinia
import {createPinia} from 'pinia';

createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')
