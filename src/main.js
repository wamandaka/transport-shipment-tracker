import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Aura from "@primeuix/themes/aura";
import { Theme } from "@primeuix/themes";
import { option } from "@primeuix/themes/aura/autocomplete";

const app = createApp(App);
const pinia = createPinia();

app.use(ToastService);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false || "none",
    },
  },
});
app.use(pinia);
app.use(router);
app.mount("#app");
