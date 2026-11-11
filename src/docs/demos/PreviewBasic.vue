<script setup lang="ts">
import { ref } from 'vue';
import { QrCodePreview, DOT_TYPES, type DotType } from 'vue-qr-studio';

const data = ref('https://github.com/CaxitlanLabs/vue-qr-studio');
const color = ref('#0f766e');
const type = ref<DotType>('rounded');
const preview = ref<InstanceType<typeof QrCodePreview> | null>(null);
</script>

<template>
  <div class="d-split">
    <div class="d-col">
      <label class="d-field">data <input v-model="data" /></label>
      <div class="d-row">
        <label class="d-field" style="flex: 0">color <input v-model="color" type="color" /></label>
        <label class="d-field">
          dots.type
          <select v-model="type">
            <option v-for="t in DOT_TYPES" :key="t">{{ t }}</option>
          </select>
        </label>
      </div>
      <div class="d-row">
        <button class="d-btn" type="button" @click="preview?.download({ extension: 'png', name: 'preview' })">download() PNG</button>
        <button class="d-btn" type="button" @click="preview?.download({ extension: 'svg', name: 'preview' })">download() SVG</button>
      </div>
    </div>
    <QrCodePreview ref="preview" class="d-qr" :data="data" :size="200" :design="{ dots: { type, color } }" />
  </div>
</template>

<style scoped>
@import './demo.css';
</style>
