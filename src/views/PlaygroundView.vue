<script setup lang="ts">
import { ref } from 'vue';
import DesignerDemo from '../demos/DesignerDemo.vue';
import PreviewDemo from '../demos/PreviewDemo.vue';
import CoreDemo from '../demos/CoreDemo.vue';

type Tab = 'designer' | 'preview' | 'core';
const tabs: { id: Tab; label: string; hint: string }[] = [
  { id: 'designer', label: 'QrDesigner', hint: 'Componente completo con v-model' },
  { id: 'preview', label: 'QrCodePreview', hint: 'Solo la vista previa + plantillas' },
  { id: 'core', label: 'Composable y core', hint: 'useQrCode y funciones sin UI' },
];
const tab = ref<Tab>('designer');
</script>

<template>
  <div class="shell">
    <div class="intro">
      <h1>Playground</h1>
      <p>Prueba la librería en vivo. Todo corre en tu navegador: nada se sube a ningún servidor.</p>
    </div>

    <nav class="tabs">
      <button v-for="t in tabs" :key="t.id" type="button" :class="{ active: tab === t.id }" @click="tab = t.id">
        <strong>{{ t.label }}</strong>
        <small>{{ t.hint }}</small>
      </button>
    </nav>

    <KeepAlive>
      <DesignerDemo v-if="tab === 'designer'" />
      <PreviewDemo v-else-if="tab === 'preview'" />
      <CoreDemo v-else />
    </KeepAlive>
  </div>
</template>

<style scoped>
.shell { max-width: 1240px; margin: 0 auto; padding: 24px 16px 64px; }
.intro { margin-bottom: 20px; }
h1 { margin: 0; font-size: 1.6rem; letter-spacing: -0.02em; }
.intro p { margin: 4px 0 0; color: var(--muted); font-size: 14px; }
.tabs { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px; margin-bottom: 24px; }
.tabs button {
  display: flex; flex-direction: column; align-items: flex-start; gap: 2px;
  padding: 12px 16px; font: inherit; text-align: left; color: var(--text);
  background: var(--surface); border: 2px solid var(--border); border-radius: 14px; cursor: pointer;
}
.tabs button.active { border-color: var(--accent); }
.tabs small { color: var(--muted); font-size: 12px; }
</style>
