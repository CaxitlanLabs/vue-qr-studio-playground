<script setup lang="ts">
import { ref, watch } from 'vue';
import DesignerDemo from './demos/DesignerDemo.vue';
import PreviewDemo from './demos/PreviewDemo.vue';
import CoreDemo from './demos/CoreDemo.vue';

type Tab = 'designer' | 'preview' | 'core';
const tabs: { id: Tab; label: string; hint: string }[] = [
  { id: 'designer', label: 'QrDesigner', hint: 'Componente completo con v-model' },
  { id: 'preview', label: 'QrCodePreview', hint: 'Solo la vista previa + plantillas' },
  { id: 'core', label: 'Composable y core', hint: 'useQrCode y funciones sin UI' },
];

const tab = ref<Tab>('designer');
const theme = ref<'light' | 'dark'>(
  window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
);
watch(theme, (v) => document.documentElement.setAttribute('data-theme', v), { immediate: true });
</script>

<template>
  <div class="shell">
    <header class="top">
      <div>
        <h1>vue-qr-studio <span>playground</span></h1>
        <p>Proyecto de pruebas que consume la librería local (<code>link:../vue-qr-studio</code>).</p>
      </div>
      <button class="theme" type="button" @click="theme = theme === 'dark' ? 'light' : 'dark'">
        {{ theme === 'dark' ? '☀️ Claro' : '🌙 Oscuro' }}
      </button>
    </header>

    <nav class="tabs">
      <button
        v-for="t in tabs"
        :key="t.id"
        type="button"
        :class="{ active: tab === t.id }"
        @click="tab = t.id"
      >
        <strong>{{ t.label }}</strong>
        <small>{{ t.hint }}</small>
      </button>
    </nav>

    <main>
      <KeepAlive>
        <DesignerDemo v-if="tab === 'designer'" />
        <PreviewDemo v-else-if="tab === 'preview'" />
        <CoreDemo v-else />
      </KeepAlive>
    </main>
  </div>
</template>

<style scoped>
.shell { max-width: 1240px; margin: 0 auto; padding: 24px 16px 64px; }
.top { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 20px; }
h1 { margin: 0; font-size: 1.5rem; letter-spacing: -0.02em; }
h1 span { color: var(--accent); font-weight: 500; }
.top p { margin: 4px 0 0; color: var(--muted); font-size: 14px; }
code { font-size: 12px; background: var(--surface); border: 1px solid var(--border); padding: 1px 6px; border-radius: 6px; }
.theme {
  flex-shrink: 0;
  padding: 8px 14px;
  font: inherit;
  font-size: 13px;
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 999px;
  cursor: pointer;
}
.tabs { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px; margin-bottom: 24px; }
.tabs button {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  padding: 12px 16px;
  font: inherit;
  text-align: left;
  color: var(--text);
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: 14px;
  cursor: pointer;
}
.tabs button.active { border-color: var(--accent); }
.tabs small { color: var(--muted); font-size: 12px; }
</style>
