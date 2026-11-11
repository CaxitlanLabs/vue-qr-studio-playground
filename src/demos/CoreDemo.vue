<script setup lang="ts">
import { computed, ref } from 'vue';
import { encodeContent, mergeDesign, renderQrToDataUrl, useQrCode, type DotType } from 'vue-qr-studio';

/* ---------- useQrCode ---------- */
const text = ref('Hola desde useQrCode');
const color = ref('#0f766e');
const dotType = ref<DotType>('rounded');
const design = computed(() => mergeDesign({ dots: { type: dotType.value, color: color.value } }));
const { container, download, isRendering } = useQrCode(text, design, { size: 220 });

/* ---------- Funciones del core ---------- */
const ssid = ref('MiCasa');
const password = ref('clave;segura');
const wifiData = computed(() =>
  encodeContent({ type: 'wifi', ssid: ssid.value, password: password.value, encryption: 'WPA' }),
);
const dataUrl = ref('');
const generating = ref(false);

async function generate() {
  generating.value = true;
  try {
    dataUrl.value = await renderQrToDataUrl(wifiData.value, mergeDesign({ dots: { type: 'square', color: '#1e293b' } }), {
      size: 400,
      extension: 'png',
    });
  } finally {
    generating.value = false;
  }
}
</script>

<template>
  <div class="cols">
    <section>
      <h2>useQrCode()</h2>
      <p class="muted">El composable dibuja en un <code>&lt;div ref&gt;</code> y reacciona a refs y computed.</p>
      <label>Texto <input v-model="text" type="text" /></label>
      <div class="row">
        <label>Color <input v-model="color" type="color" /></label>
        <label>
          Estilo
          <select v-model="dotType">
            <option v-for="t in ['square', 'dots', 'rounded', 'extra-rounded', 'classy', 'classy-rounded']" :key="t" :value="t">{{ t }}</option>
          </select>
        </label>
      </div>
      <div ref="container" class="qr" :class="{ busy: isRendering }" />
      <div class="row">
        <button type="button" @click="download({ extension: 'svg', name: 'composable' })">Descargar SVG</button>
        <button type="button" @click="download({ extension: 'webp', size: 800, name: 'composable' })">Descargar WEBP</button>
      </div>
    </section>

    <section>
      <h2>encodeContent + renderQrToDataUrl</h2>
      <p class="muted">Sin componentes: genera el texto de un QR de Wi-Fi y lo convierte en una imagen PNG local.</p>
      <div class="row">
        <label>SSID <input v-model="ssid" type="text" /></label>
        <label>Contraseña <input v-model="password" type="text" /></label>
      </div>
      <code class="block">{{ wifiData }}</code>
      <button type="button" :disabled="generating" @click="generate">
        {{ generating ? 'Generando…' : 'Generar Data URL' }}
      </button>
      <template v-if="dataUrl">
        <img :src="dataUrl" alt="QR Wi-Fi" width="220" height="220" />
        <code class="block">{{ dataUrl.slice(0, 80) }}… ({{ Math.round(dataUrl.length / 1024) }} KB)</code>
      </template>
    </section>
  </div>
</template>

<style scoped>
.cols { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); }
section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  min-width: 0;
}
h2 { margin: 0; font-size: 1.05rem; font-family: ui-monospace, Menlo, monospace; }
.muted { margin: 0; color: var(--muted); font-size: 13px; }
label { display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: var(--muted); flex: 1; }
.row { display: flex; flex-wrap: wrap; gap: 12px; align-items: flex-end; }
input,
select,
button {
  padding: 8px 10px;
  font: inherit;
  color: var(--text);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
}
input[type='color'] { padding: 2px; height: 38px; }
button { cursor: pointer; align-self: flex-start; }
button:disabled { opacity: 0.6; }
.qr { align-self: center; line-height: 0; padding: 12px; background: #fff; border-radius: 12px; transition: opacity 0.15s; }
.qr.busy { opacity: 0.6; }
img { align-self: center; border-radius: 12px; }
code.block { display: block; padding: 8px 10px; font-size: 12px; background: var(--bg); border-radius: 8px; word-break: break-all; }
</style>
