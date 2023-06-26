import { createApp } from 'vue'
import App from './App.vue'
import store from "@/store";
import router from "@/routers";
import headerBar from "@/components/headerBar";
import pSwiper from "@/components/swiper";
import Vant from 'vant';
import '@/assets/js/rem';
import '@/assets/css/reset.scss';
import '@/assets/css/common.scss';
import '@/assets/css/iconFont.scss';
import 'vant/lib/index.css';
import Print from 'vue-print-nb'

const vue = createApp(App);
vue.use(router);
vue.use(Vant);
vue.use(Print)
vue.use(store);
vue.component('HeaderBar',headerBar);
vue.component('pSwiper',pSwiper);
vue.mount('#app');
