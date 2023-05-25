import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@views/1_Home/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //Page Not Found
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@views/NotFoundView.vue')
    },
    //Real Pages
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/about',
      name:'about',
      component: () => import('@views/2_About/AboutView.vue')
    },
    {
      path:'/portfolio',
      name: 'portfolio',
      component: () => import('@views/4_Portfolio/PortfolioView.vue')
    },
    {
      path:'/skills',
      name:'skills',
      component: () => import('@views/3_Skill/SkillView.vue')
    },
    {
      path:'/contact',
      name:'contact',
      component: () => import('@views/ContactView.vue')
    }
  ]
})

export default router
