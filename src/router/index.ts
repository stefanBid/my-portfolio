// router/index.ts (Router Configuration File)

import { ref } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '@/pages/home-page/HomePage.vue';

const isLoading = ref(true);

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
    component: () => import(/* webpackPrefetch: true */ '@/pages/about-page/AboutPage.vue'),
  },
  {
    path: '/projects',
    name: 'projectsPage',
    component: () => import(/* webpackPrefetch: true */ '@/pages/projects-page/ProjectsPage.vue'),
  },
  {
    path: '/skills',
    name: 'skillsPage',
    component: () => import(/* webpackPrefetch: true */ '@/pages/skills-page/SkillsPage.vue'),
  },
  {
    path: '/privacy-policy',
    name: 'privacyPolicyPage',
    component: () =>
      import(/* webpackPrefetch: true */ '@/pages/privacy-policy-page/PrivacyPolicyPage.vue'),
  },
  {
    path: '/terms-and-conditions',
    name: 'termsAndConditionsPage',
    component: () =>
      import(
        /* webpackPrefetch: true */ '@/pages/terms-and-conditions-page/TermsAndConditionsPage.vue'
      ),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFoundPage',
    component: () => import(/* webpackPrefetch: true*/ '@/pages/not-found-page/NotFoundPage.vue'),
  },
];

// Create route instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((_, __, next) => {
  isLoading.value = true; // Show loading spinner
  next();
});

router.afterEach(() => {
  isLoading.value = false; // Hide loading spinner
});

export { router, isLoading };
