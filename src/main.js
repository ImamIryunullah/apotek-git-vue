import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import router from "./router/index";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css'
createApp(App).use(router).use(VueSweetalert2).mount("#app");
