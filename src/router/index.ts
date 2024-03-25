import { createRouter, createWebHistory } from 'vue-router';

import { HomePage, AboutPage, ProjectsPage, SkillsPage } from '@/views';

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
		component: AboutPage
	},
	{
		path: '/projects',
		name: 'ProjectsPage',
		component: ProjectsPage
	},
	{
		path: '/skills',
		name: 'SkillsPage',
		component: SkillsPage
	}
];

// Crea l'istanza del router con la history mode
const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
