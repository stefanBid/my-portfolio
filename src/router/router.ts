// router/index.ts (Router Configuration File)

import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/home-page/HomePage.vue';

// Root definition
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { hideFooter: true },
  },
  {
    path: '/about',
    name: 'about-me',
    component: () => import('@/pages/about-page/AboutPage.vue'),
  },
  {
    path: '/projects',
    name: 'my-projects',
    component: () => import('@/pages/projects-page/ProjectsPage.vue'),
  },
  {
    path: '/skills',
    name: 'my-skills',
    component: () => import('@/pages/skills-page/SkillsPage.vue'),
  },
  {
    path: '/privacy-policy',
    name: 'privacy-policy',
    component: () => import('@/pages/privacy-policy-page/PrivacyPolicyPage.vue'),
  },
  {
    path: '/terms-and-conditions',
    name: 'terms-and-conditions',
    component: () => import('@/pages/terms-and-conditions-page/TermsAndConditionsPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found-page',
    component: () => import('@/pages/not-found-page/NotFoundPage.vue'),
    meta: { notFound: true, hideFooter: true, hideHeader: true },
  },
] as const;

// Create route instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    if (to.hash) {
      return {
        el: to.hash,
        top: 0,
      };
    }

    // Altrimenti vai in cima
    return { left: 0, top: 0 };
  },
});

export { router };
