import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./app.vue";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia); // Pinia'yı Vue uygulamasına bağlayın
app.mount("#app");
