// router/index.ts (Router Configuration File)

import { createRouter, createWebHistory } from 'vue-router';

import { useLoadingPageStore } from '@/stores';

import HomePage from '@/pages/home-page/HomePage.vue';

// Root definition
const routes = [
  {
    path: '/',
    name: 'homePage',
    component: HomePage,
  },
  {
    path: '/about',
    name: 'aboutPage',
    component: () => import('@/pages/about-page/AboutPage.vue'),
  },
  {
    path: '/projects',
    name: 'projectsPage',
    component: () => import('@/pages/projects-page/ProjectsPage.vue'),
  },
  {
    path: '/skills',
    name: 'skillsPage',
    component: () => import('@/pages/skills-page/SkillsPage.vue'),
  },
  {
    path: '/privacy-policy',
    name: 'privacyPolicyPage',
    component: () => import('@/pages/privacy-policy-page/PrivacyPolicyPage.vue'),
  },
  {
    path: '/terms-and-conditions',
    name: 'termsAndConditionsPage',
    component: () => import('@/pages/terms-and-conditions-page/TermsAndConditionsPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFoundPage',
    component: () => import('@/pages/not-found-page/NotFoundPage.vue'),
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

router.beforeEach(() => {
  const lp = useLoadingPageStore();
  lp.isLoading = true;
});

router.afterEach(() => {
  const lp = useLoadingPageStore();
  lp.isLoading = false;
});

router.onError(() => {
  const lp = useLoadingPageStore();
  lp.isLoading = false;
});

export { router };
