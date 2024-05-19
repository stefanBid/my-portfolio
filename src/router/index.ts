import { createRouter, createWebHistory } from 'vue-router';

import { HomePage } from '@/views';

// Definisci le rotte
const routes = [
	{
		path: '/',
		name: 'homePage',
		component: HomePage
	},
	{
		path: '/about',
		name: 'aboutPage',
		component: () => import(/* webpackPrefetch: true */ '@/views/about-page/AboutPage.vue')
	},
	{
		path: '/projects',
		name: 'projectsPage',
		component: () => import(/* webpackPrefetch: true */ '@/views/projects-page/ProjectsPage.vue')
	},
	{
		path: '/skills',
		name: 'skillsPage',
		component: () => import(/* webpackPrefetch: true */ '@/views/skills-page/SkillsPage.vue')
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'notFoundPage',
		component: () => import(/* webpackPrefetch: true */ '@/views/not-found-page/NotFoundPage.vue')
	}
];

// Crea l'istanza del router con la history mode
const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
