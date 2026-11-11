<script setup lang="ts">
import { ref, watch } from 'vue';
import {
  QrDesigner,
  createDefaultDesign,
  mergeDesign,
  type LocalImage,
  type LogoError,
  type QrContent,
  type QrDesign,
  type QrStudioLocale,
} from 'vue-qr-studio';

const STORAGE_KEY = 'vue-qr-studio-playground';

// Guardado opcional en el navegador (solo para comodidad del playground).
function load(): { content?: QrContent; design?: QrDesign; name?: string } {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
  } catch {
    return {};
  }
}
const saved = load();

const content = ref<QrContent>(saved.content ?? { type: 'url', url: 'https://github.com' });
const design = ref<QrDesign>(saved.design ? mergeDesign(saved.design) : createDefaultDesign());
const name = ref(saved.name ?? 'mi-primer-qr');
const locale = ref<QrStudioLocale>('es');
const log = ref<string[]>([]);

watch(
  [content, design, name],
  () => {
    try {
      // El logo (Data URL) puede ser grande; no lo guardamos.
      const toSave = { content: content.value, name: name.value, design: { ...design.value, logo: { ...design.value.logo, src: '' } } };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {
      /* almacenamiento no disponible */
    }
  },
  { deep: true },
);

function addLog(msg: string) {
  log.value.unshift(`${new Date().toLocaleTimeString()} · ${msg}`);
  log.value.splice(8);
}

const onDownload = (e: { name: string; extension: string; size: number }) =>
  addLog(`download → ${e.name}.${e.extension} (${e.size}px)`);
const onLogoChange = (img: LocalImage | null) =>
  addLog(img ? `logo-change → ${img.fileName} ${img.width}×${img.height}, ECL sugerido ${img.recommendedErrorCorrection}` : 'logo-change → sin logo');
const onLogoError = (err: LogoError) => addLog(`logo-error → ${err.code}`);

function clearStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
  content.value = { type: 'url', url: 'https://github.com' };
  design.value = createDefaultDesign();
  name.value = 'mi-primer-qr';
  addLog('estado reiniciado');
}
</script>

<template>
  <div class="demo">
    <div class="toolbar">
      <label>
        Idioma
        <select v-model="locale">
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </label>
      <button type="button" @click="clearStorage">Reiniciar estado</button>
    </div>

    <QrDesigner
      v-model:content="content"
      v-model:design="design"
      v-model:name="name"
      :locale="locale"
      :max-logo-bytes="3 * 1024 * 1024"
      @download="onDownload"
      @logo-change="onLogoChange"
      @logo-error="onLogoError"
    />

    <div class="debug">
      <section>
        <h3>Eventos</h3>
        <p v-if="!log.length" class="muted">Descarga un QR o sube un logo para ver eventos aquí.</p>
        <ul>
          <li v-for="(item, i) in log" :key="i">{{ item }}</li>
        </ul>
      </section>
      <section>
        <h3>v-model:content</h3>
        <pre>{{ content }}</pre>
      </section>
      <section class="wide">
        <h3>v-model:design</h3>
        <pre>{{ { ...design, logo: { ...design.logo, src: design.logo.src ? `${design.logo.src.slice(0, 40)}…` : '' } } }}</pre>
      </section>
    </div>
  </div>
</template>

<style scoped>
.toolbar { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: flex-end; margin-bottom: 16px; font-size: 13px; }
.toolbar label { display: inline-flex; gap: 8px; align-items: center; color: var(--muted); }
select,
.toolbar button {
  padding: 6px 10px;
  font: inherit;
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
}
.debug { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); margin-top: 24px; }
.debug section { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 16px; min-width: 0; }
.debug .wide { grid-column: 1 / -1; }
h3 { margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--muted); }
pre { margin: 0; font-size: 12px; overflow-x: auto; }
ul { margin: 0; padding-left: 18px; font-size: 12px; font-family: ui-monospace, Menlo, monospace; }
.muted { margin: 0; font-size: 13px; color: var(--muted); }
</style>
