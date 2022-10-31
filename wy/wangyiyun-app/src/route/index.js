import { createRouter,createWebHistory} from "vue-router";
import store from '@/store/index'
const home = () => import("@/view/Home")
const itemMusic = () => import("@/view/ItemMusic")
const search = () => import ("@/view/Search")
const login = () => import ("@/view/Login")
const infoUser = () => import ("@/view/infoUser")

const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "home",
    component: home
  },
  {
    path: "/itemMusic",
    name: "itemMusic",
    component: itemMusic
  },
  {
    path: "/search",
    name: "Search",
    component: search
  },
  {
    path: "/login",
    name: "Login",
    component: login
  },
  {
    path: "/infoUser",
    name: "InfoUser",
    component: infoUser,
    beforeEnter: (to, from, next) => {
      if(store.state.isLogin || store.state.token || localStorage.getItem('token')){
        next()
      }else{
        next('/login')
      }
    }
  }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routes
    
  })
  router.beforeEach((to, from) => {
    //console.log(to);
    if(to.path=='/login' || to.path=='/infoUser'){
      store.state.isFooterMusic = false
    }else{
      store.state.isFooterMusic = true
    }
  })
  export default router