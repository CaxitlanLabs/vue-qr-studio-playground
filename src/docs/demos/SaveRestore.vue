<script setup lang="ts">
import { ref } from 'vue';
import { QrCodePreview, DESIGN_PRESETS, createDefaultDesign, mergeDesign, type QrDesign } from 'vue-qr-studio';

const KEY = 'docs-demo-design';
const design = ref<QrDesign>(createDefaultDesign());
const status = ref('');

function randomize() {
  const preset = DESIGN_PRESETS[Math.floor(Math.random() * DESIGN_PRESETS.length)];
  design.value = mergeDesign(preset.design);
  status.value = `Plantilla aplicada: ${preset.id}`;
}
function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(design.value));
    status.value = 'Guardado en localStorage';
  } catch {
    status.value = 'No hay almacenamiento disponible';
  }
}
function restore() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return (status.value = 'No hay nada guardado todavía');
    design.value = mergeDesign(JSON.parse(raw));
    status.value = 'Restaurado';
  } catch {
    status.value = 'No se pudo leer';
  }
}
</script>

<template>
  <div class="d-split">
    <div class="d-col">
      <div class="d-row">
        <button class="d-btn" type="button" @click="randomize">Cambiar diseño</button>
        <button class="d-btn" type="button" @click="save">Guardar</button>
        <button class="d-btn" type="button" @click="restore">Restaurar</button>
      </div>
      <p class="d-muted">{{ status || 'Cambia el diseño, guárdalo, cámbialo otra vez y restaura.' }}</p>
      <code class="d-code">{{ JSON.stringify({ dots: design.dots, background: design.background }) }}</code>
    </div>
    <QrCodePreview class="d-qr" data="https://ejemplo.com" :design="design" :size="160" />
  </div>
</template>

<style scoped>
@import './demo.css';
</style>
