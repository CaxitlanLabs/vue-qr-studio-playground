<script setup lang="ts">
import { computed, ref } from 'vue';
import { mergeDesign, useQrCode } from 'vue-qr-studio';

const text = ref('Hola desde useQrCode');
const color = ref('#db2777');
const size = ref(180);
const design = computed(() => mergeDesign({ dots: { type: 'classy-rounded', color: color.value } }));
const { container, isRendering, download } = useQrCode(text, design, { size });
</script>

<template>
  <div class="d-split">
    <div class="d-col">
      <label class="d-field">text <input v-model="text" /></label>
      <div class="d-row">
        <label class="d-field" style="flex: 0">color <input v-model="color" type="color" /></label>
        <label class="d-field">size: {{ size }}px <input v-model.number="size" type="range" min="120" max="240" step="10" /></label>
      </div>
      <div class="d-row">
        <button class="d-btn" type="button" @click="download({ extension: 'webp', size: 800 })">download() WEBP 800px</button>
        <span class="d-muted">isRendering: {{ isRendering }}</span>
      </div>
    </div>
    <div ref="container" class="d-qr" />
  </div>
</template>

<style scoped>
@import './demo.css';
</style>
