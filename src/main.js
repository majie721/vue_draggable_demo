import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.config.devtools =true
//vue.too

new Vue({
  render: h => h(App),
}).$mount('#app')
