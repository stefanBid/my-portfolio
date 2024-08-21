import { createRouter, createWebHistory } from 'vue-router';

import { HomePage } from '@/pages';

// Root definition
const routes = [
	{
		path: '/',
		name: 'homePage',
		component: HomePage
	},
	{
		path: '/about',
		name: 'aboutPage',
		component: () => import(/* webpackPrefetch: true, webpackPreload: true */ '@/pages/about-page/AboutPage.vue')
	},
	{
		path: '/projects',
		name: 'projectsPage',
		component: () => import(/* webpackPrefetch: true, webpackPreload: true */ '@/pages/projects-page/ProjectsPage.vue')
	},
	{
		path: '/skills',
		name: 'skillsPage',
		component: () => import(/* webpackPrefetch: true, webpackPreload: true */ '@/pages/skills-page/SkillsPage.vue')
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'notFoundPage',
		component: () => import(/* webpackPrefetch: true, webpackPreload: true */ '@/pages/not-found-page/NotFoundPage.vue')
	}
];

// Create route instance
const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
