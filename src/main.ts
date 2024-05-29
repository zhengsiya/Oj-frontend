import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
// import '@arco-design/web-vue/dist/arco.css'
import '@arco-themes/vue-gi-demo/css/arco.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './index.less'
import '@/utils/request'
import 'bytemd/dist/index.css'

createApp(App).use(ArcoVue).use(createPinia()).use(router).mount('#app')
