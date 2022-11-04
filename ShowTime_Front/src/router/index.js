import { createRouter, createWebHistory } from 'vue-router'
import SigninView from '../views/SigninView.vue'
import SignupView from '../views/SignupView.vue'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'
import AdminUserView from '../views/AdminUserView.vue'
import AdminGroupView from '../views/AdminGroupView.vue'
import AdminConcertView from '../views/AdminConcertView.vue'
import LostView from '../views/LostView.vue'
import ProfilView from '../views/ProfilView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login/signin',
    name: 'Signin',
    component: SigninView
  },
  {
    path: '/login/signup',
    name: 'Signup',
    component: SignupView
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  },
  {
    path: '/admin/user',
    name: 'adminUser',
    component: AdminUserView
  },
  {
    path: '/admin/group',
    name: 'adminPost',
    component: AdminGroupView
  },
  {
    path: '/admin/concert',
    name: 'adminConcert',
    component: AdminConcertView
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: LostView
  },
  {
    path: '/profil',
    name: 'profil',
    component: ProfilView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
