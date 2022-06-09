import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    redirect: 'chat',
    component: HomeView,
    children:[  {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },{
      path: '/personinfo',
      name: 'personinfo',
      // route level code-splitting
      // this generates a separate chunk (personinfo.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "personinfo" */ '../views/PersonInfoView.vue')
    },
    {
      path: '/manage',
      name: 'manage',
      // route level code-splitting
      // this generates a separate chunk (manage.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "manage" */ '../views/ManageView.vue')
    },{
      path: '/createdtask',
      name: 'createdtask',
      // route level code-splitting
      // this generates a separate chunk (wefha.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "wefha" */ '../views/CreatedTaskView.vue')
    },{
      path: '/chat',
      name: 'chat',
      // route level code-splitting
      // this generates a separate chunk (chat.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "chat" */ '../views/ChatView.vue')
    },{
      path: '/jurisdiction',
      name: 'jurisdiction',
      // route level code-splitting
      // this generates a separate chunk (jurisdiction.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "jurisdiction" */ '../views/JurisdictionView.vue')
    },{
      path: '/userlist',
      name: 'userlist',
      // route level code-splitting
      // this generates a separate chunk (userlist.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "userlist" */ '../views/UserListView.vue')
    },{
      path: '/management',
      name: 'management',
      // route level code-splitting
      // this generates a separate chunk (management.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "management" */ '../views/ManagementView.vue')
    },{
      path: '/usermanagement',
      name: 'usermanagement',
      // route level code-splitting
      // this generates a separate chunk (usermanagement.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "usermanagement" */ '../views/UserManagementView.vue')
    },{
      path: '/details',
      name: 'details',
      // route level code-splitting
      // this generates a separate chunk (details.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "details" */ '../views/DetailsView.vue')
    },{
      path: '/cssmanage',
      name: 'cssmanage',
      // route level code-splitting
      // this generates a separate chunk (cssmanage.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "cssmanage" */ '../views/CssManageView.vue')
    },{
      path: '/htmlmanage',
      name: 'htmlmanage',
      // route level code-splitting
      // this generates a separate chunk (htmlmanage.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "htmlmanage" */ '../views/HtmlManageView.vue')
    },{
      path: '/competition',
      name: 'competition',
      // route level code-splitting
      // this generates a separate chunk (competition.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "competition" */ '../views/CompetitionView.vue')
    },]
  },
  {
    path: '/',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },

  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
