import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/index";
import store from "@/store/index";
import { registerApp } from "@/global/index"; //按需引入element-plus
import "normalize.css"; //标准化样式
import { setupStore } from "./store/index";

const app = createApp(App);
setupStore(); //刷新时重新设置vuex
app.use(router);
app.use(store);
registerApp(app);
app.mount("#app");
