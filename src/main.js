// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import toast from './components/common/toast'//引入toast
//安装toast插件
Vue.use(toast)

import FastClick from 'fastclick' //导入
//解决移动端的300ms延迟
FastClick.attach(document.body)

import VueLazyLoad from 'vue-lazyload'//导入
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png') //默认图片展示
})

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()  //事件总线

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
