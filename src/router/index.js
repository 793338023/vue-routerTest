import Vue from 'vue'
import Router from 'vue-router'
import hotShow from '@/views/hotShow'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hotShow',
      component: hotShow,
      meta: {
        isKeepAlive: false
      }
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('@/views/detail'),
      meta: {
        isKeepAlive: true
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition || typeof savedPosition === 'undefined') {      // 只处理设置了路由元信息的组件
      from.meta.isKeepAlive = typeof from.meta.isKeepAlive === 'undefined' ? undefined : false
      to.meta.isKeepAlive = typeof to.meta.isKeepAlive === 'undefined' ? undefined : true
      if (savedPosition) {
        return savedPosition;
      }
    } else {
      from.meta.isKeepAlive = typeof from.meta.isKeepAlive === 'undefined' ? undefined : true
      to.meta.isKeepAlive = typeof to.meta.isKeepAlive === 'undefined' ? undefined : false
    }
  }
})
