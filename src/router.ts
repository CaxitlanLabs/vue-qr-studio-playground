import { createRouter, createWebHashHistory } from 'vue-router';
import { firstDocSlug } from './docs/nav';

// Hash history: GitHub Pages no tiene fallback a index.html para rutas profundas.
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: `/docs/${firstDocSlug}` },
    { path: '/docs', redirect: `/docs/${firstDocSlug}` },
    { path: '/docs/:slug', name: 'docs', component: () => import('./docs/DocsView.vue') },
    { path: '/playground', name: 'playground', component: () => import('./views/PlaygroundView.vue') },
    { path: '/:pathMatch(.*)*', redirect: `/docs/${firstDocSlug}` },
  ],
  scrollBehavior(to, _from, saved) {
    if (saved) return saved;
    if (to.hash && !to.hash.startsWith('#/')) return { el: to.hash, top: 80, behavior: 'smooth' };
    return { top: 0 };
  },
});

router.afterEach((to) => {
  // Las páginas de docs ponen su propio título desde DocsView.
  if (to.name === 'playground') document.title = 'Playground · vue-qr-studio';
});
