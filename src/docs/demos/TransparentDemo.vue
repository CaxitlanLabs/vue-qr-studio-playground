<script setup lang="ts">
import { computed, ref } from 'vue';
import { QrCodePreview, mergeDesign, renderQrToDataUrl } from 'vue-qr-studio';

const transparent = ref(true);
const design = computed(() =>
  mergeDesign({ dots: { type: 'rounded', color: '#1d4ed8' }, background: { transparent: transparent.value, color: '#fef3c7' }, margin: 8 }),
);
const exported = ref('');

async function exportPng() {
  exported.value = await renderQrToDataUrl('https://ejemplo.com', design.value, { size: 300, extension: 'png' });
}
</script>

<template>
  <div class="d-col">
    <div class="d-row">
      <label class="d-check"><input v-model="transparent" type="checkbox" /> background.transparent</label>
      <button class="d-btn" type="button" @click="exportPng">Exportar PNG</button>
    </div>
    <div class="d-row" style="align-items: center">
      <div class="checker">
        <QrCodePreview data="https://ejemplo.com" :design="design" :size="160" />
      </div>
      <div v-if="exported" class="checker">
        <img :src="exported" width="160" height="160" alt="PNG exportado" />
      </div>
      <p v-if="exported" class="d-muted">← PNG exportado sobre un fondo cuadriculado</p>
    </div>
  </div>
</template>

<style scoped>
@import './demo.css';
.checker {
  padding: 10px;
  line-height: 0;
  border-radius: 12px;
  background: repeating-conic-gradient(#d1d5db 0 25%, #ffffff 0 50%) 50% / 16px 16px;
}
</style>
