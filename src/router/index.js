import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
const Patients = () => import('@/views/Patients.vue')
const Consultations = () => import('@/views/Consultations.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/patients',
    name: 'Patients',
    component: Patients
  },
  {
    path: '/consultations',
    name: 'Consultations',
    component: Consultations
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
