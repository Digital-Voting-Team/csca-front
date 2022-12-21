import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

import 'bootstrap';

// styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/main.css'

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount("#app");
