import Vue from 'vue'
import App from './App.vue'
import { VueClickOut } from '../../../';

Vue.directive('click-out', VueClickOut)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
