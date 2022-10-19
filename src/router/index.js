//引入Vue|Vue-router
import Vue from 'vue'
import Router from 'vue-router'

//使用路由插件
Vue.use(Router)

/* 引入最外层骨架的一级路由组件*/
import Layout from '@/layout'

//路由的配置：为什么不同用户登录我们的项目，菜单（路由）都是一样的？
//因为咱们的路由‘死的’，不管你是谁，你能看见的，操作的菜单都是一样的
//需要把项目中的路由进行拆分

//常量路由:就是不关用户是什么角色，都可以看见的路由
//什么角色（超级管理员，普通员工）：登录、404、首页
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
]

//异步路由:不同的用户（角色），需要过滤筛选出的路由，称之为异步路由
//有的用户可以看见测试管理、有的看不见
export const asyncRoutes = [
  {
    path: '/product',
    component: Layout,
    name: 'Product',
    meta: { title: '商品管理', icon: 'el-icon-goods' },
    children: [
      {
        path: 'trademark',
        name: 'TradeMark',
        component: () => import('@/views/product/tradeMark'),
        meta: { title: '品牌管理' }
      },
      {
        path: 'attr',
        name: 'Attr',
        component: () => import('@/views/product/Attr'),
        meta: { title: '平台属性管理' }
      },
      {
        path: 'spu',
        name: 'Spu',
        component: () => import('@/views/product/Spu'),
        meta: { title: 'Spu管理' }
      },
     
    ]
  },
  {
    path: '/test',
    component: Layout,
    name: 'Test',
    meta: { title: '测试管理', icon: 'el-icon-goods' },
    children: [
      {
        path: 'test1',
        name: 'Test1',
        component: () => import('@/views/Test/Test1'),
        meta: { title: '测试管理1' }
      },
      {
        path: 'test2',
        name: 'Test2',
        component: () => import('@/views/Test/Test2'),
        meta: { title: '测试管理2' }
      },
    ]
  },
];


//任意路由：当路径出现错误的时候重定向404
export const anyRoutes = { path: '*', redirect: '/404', hidden: true };


//任意理由：

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  //因为注册的路由是‘死的’，‘活的’路由如果根据不同用户（角色）可以展示不同菜单
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
