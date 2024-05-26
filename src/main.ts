import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './index.less'
import '@/utils/request'

createApp(App).use(ArcoVue).use(createPinia()).use(router).mount('#app')
