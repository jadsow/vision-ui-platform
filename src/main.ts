import { createApp } from "vue";
import App from "./App.vue";
import { mountTokenStyles } from "./tokens";

import "./style.css";

mountTokenStyles();
createApp(App).mount("#app");
