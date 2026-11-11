<script setup lang="ts">
import { ref } from 'vue';
import { QrDesigner, type QrContent } from 'vue-qr-studio';

const content = ref<QrContent>({ type: 'url', url: 'https://ejemplo.com' });
const designer = ref<InstanceType<typeof QrDesigner> | null>(null);
</script>

<template>
  <QrDesigner ref="designer" v-model:content="content" :show-header="false" :show-name="false" :content-types="['url']">
    <template #actions="{ download, complete }">
      <button type="button" class="d-btn d-btn--primary" :disabled="!complete" @click="download('png')">
        Descargar mi QR
      </button>
      <button type="button" class="d-btn" @click="designer?.applyPreset({ id: 'rojo', design: { dots: { color: '#dc2626', type: 'dots' } } })">
        Aplicar estilo rojo (método expuesto)
      </button>
    </template>
  </QrDesigner>
</template>

<style scoped>
@import './demo.css';
</style>
