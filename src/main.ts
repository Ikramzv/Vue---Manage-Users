/// <reference path="./types.d.ts" />

import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

const pinia = createPinia();
const app = createApp(App);
app.config.unwrapInjectedRef = true;
app.mount("#app");
// Plugins

app.use(pinia);
