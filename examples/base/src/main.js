import Vue from 'vue'
import App from './App.vue'
import { VueClickOut } from '../../../dist';

Vue.directive('click-out', VueClickOut)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
