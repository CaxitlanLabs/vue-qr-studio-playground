<script setup lang="ts">
import { ref, watch } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

const THEME_KEY = 'vqs-theme';
function initialTheme(): 'light' | 'dark' {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* sin almacenamiento */
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const theme = ref(initialTheme());
watch(
  theme,
  (v) => {
    document.documentElement.setAttribute('data-theme', v);
    try {
      localStorage.setItem(THEME_KEY, v);
    } catch {
      /* noop */
    }
  },
  { immediate: true },
);
</script>

<template>
  <header class="topbar">
    <div class="topbar-inner">
      <RouterLink to="/" class="brand">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M3 3h8v8H3zm2 2v4h4V5zm8-2h8v8h-8zm2 2v4h4V5zM3 13h8v8H3zm2 2v4h4v-4zm11-2h2v2h-2zm-3 0h2v2h-2zm0 3h2v2h-2zm3 3h2v2h-2zm3-3h2v2h-2zm0-3h2v2h-2zm-3 3h2v2h-2zm0 3h2v2h-2z" />
        </svg>
        <span>vue-qr-studio</span>
      </RouterLink>

      <nav class="links">
        <RouterLink to="/docs" :class="{ active: $route.name === 'docs' }">Documentación</RouterLink>
        <RouterLink to="/playground" active-class="active">Playground</RouterLink>
        <a href="https://github.com/CaxitlanLabs/vue-qr-studio" target="_blank" rel="noopener">GitHub</a>
      </nav>

      <button class="theme" type="button" :aria-label="theme === 'dark' ? 'Tema claro' : 'Tema oscuro'" @click="theme = theme === 'dark' ? 'light' : 'dark'">
        {{ theme === 'dark' ? '☀️' : '🌙' }}
      </button>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 30;
  background: color-mix(in srgb, var(--bg) 85%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
}
.topbar-inner { max-width: 1440px; margin: 0 auto; height: 60px; padding: 0 16px; display: flex; align-items: center; gap: 16px; }
.brand { display: inline-flex; align-items: center; gap: 8px; font-weight: 800; letter-spacing: -0.02em; color: var(--text); text-decoration: none; }
.brand svg { width: 22px; height: 22px; color: var(--accent); }
.links { display: flex; gap: 4px; margin-left: auto; }
.links a { padding: 6px 10px; font-size: 14px; font-weight: 500; color: var(--muted); text-decoration: none; border-radius: 8px; }
.links a:hover { color: var(--text); }
.links a.active { color: var(--accent); }
.theme { width: 36px; height: 36px; font-size: 16px; background: var(--surface); border: 1px solid var(--border); border-radius: 50%; cursor: pointer; }
@media (max-width: 560px) {
  .brand span { display: none; }
  .links a { padding: 6px 8px; font-size: 13px; }
}
</style>
