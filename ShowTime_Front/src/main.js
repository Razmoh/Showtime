import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import Vue from 'vue'
import VueQRCodeComponent from 'vue-qrcode-component'
// Vue.component('qr-code', VueQRCodeComponent)

createApp(App).use(router).use(store).component('qr-code', VueQRCodeComponent).mount('#app')
