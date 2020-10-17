import Vue from 'vue'
import App from './App.vue'
import '@/assets/tailwind.css'
import '@/assets/styles.css'
import '@/assets/animations.css'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
