<script setup lang="ts">
import { ref } from 'vue';
import { DESIGN_PRESETS, QrCodePreview, es } from 'vue-qr-studio';

const data = ref('https://vuejs.org');
const renderer = ref<'canvas' | 'svg'>('canvas');
const previews = ref<Record<string, InstanceType<typeof QrCodePreview> | null>>({});

function download(id: string) {
  previews.value[id]?.download({ name: `preset-${id}`, extension: 'png', size: 1000 });
}
</script>

<template>
  <div>
    <div class="controls">
      <label class="grow">
        Datos
        <input v-model="data" type="text" />
      </label>
      <label>
        Renderer
        <select v-model="renderer">
          <option value="canvas">canvas</option>
          <option value="svg">svg</option>
        </select>
      </label>
    </div>

    <div class="grid">
      <figure v-for="preset in DESIGN_PRESETS" :key="preset.id">
        <QrCodePreview
          :ref="(el) => (previews[preset.id] = el as InstanceType<typeof QrCodePreview> | null)"
          :data="data"
          :design="preset.design"
          :renderer="renderer"
          :size="220"
        />
        <figcaption>
          <strong>{{ es.presets[preset.id] }}</strong>
          <button type="button" @click="download(preset.id)">PNG</button>
        </figcaption>
      </figure>

      <figure>
        <QrCodePreview
          :data="data"
          :renderer="renderer"
          :size="220"
          :design="{
            dots: { type: 'dots', color: '#7c3aed', color2: '#ec4899', gradient: 'radial' },
            cornersSquare: { type: 'extra-rounded', color: '#4c1d95' },
            cornersDot: { type: 'dot', color: '#ec4899' },
          }"
        />
        <figcaption><strong>Diseño parcial inline</strong></figcaption>
      </figure>
    </div>
  </div>
</template>

<style scoped>
.controls { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; font-size: 13px; color: var(--muted); }
.controls label { display: flex; flex-direction: column; gap: 6px; }
.grow { flex: 1 1 280px; }
input,
select,
button {
  padding: 8px 10px;
  font: inherit;
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
}
button { cursor: pointer; padding: 4px 10px; font-size: 12px; }
.grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }
figure {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
}
figcaption { display: flex; align-items: center; justify-content: space-between; width: 100%; font-size: 13px; }
</style>
