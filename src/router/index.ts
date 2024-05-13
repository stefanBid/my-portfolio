import { createRouter, createWebHistory } from 'vue-router';

import { HomePage } from '@/views';

// Definisci le rotte
const routes = [
	{
		path: '/',
		name: 'HomePage',
		component: HomePage
	},
	{
		path: '/about',
		name: 'AboutPage',
		component: () => import(/* webpackPrefetch: true */ '@/views/about-page/AboutPage.vue')
	},
	{
		path: '/projects',
		name: 'ProjectsPage',
		component: () => import(/* webpackPrefetch: true */ '@/views/projects-page/ProjectsPage.vue')
	},
	{
		path: '/skills',
		name: 'SkillsPage',
		component: () => import(/* webpackPrefetch: true */ '@/views/skills-page/SkillsPage.vue')
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFoundPage',
		component: () => import(/* webpackPrefetch: true */ '@/views/not-found-page/NotFoundPage.vue')
	}
];

// Crea l'istanza del router con la history mode
const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
