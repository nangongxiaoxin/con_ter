import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'


Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect:'/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users },
      ]
    },
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to将要访问的路径
  // from来自于哪个路径
  // 是否放行到next所确定的路径(表示放行)

  // if (to.path === '/login') return next()
  // // 获取token
  // const tokenStr=window.sessionStorage.getItem('token')
  // if(!tokenStr) return next ('/login')
  // next()

  const tokenStr = window.sessionStorage.getItem('token')
  if (to.path === '/login' || tokenStr) {
    return next()
  } else {
    return next('/login')
  }
})
export default router