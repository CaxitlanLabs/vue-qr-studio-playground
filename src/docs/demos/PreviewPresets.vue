<script setup lang="ts">
import { DESIGN_PRESETS, QrCodePreview, es } from 'vue-qr-studio';
</script>

<template>
  <div class="d-grid">
    <div v-for="p in DESIGN_PRESETS" :key="p.id" class="d-card">
      <QrCodePreview data="https://vuejs.org" :design="p.design" :size="140" />
      <code>{{ p.id }}</code>
      <span class="d-muted">{{ es.presets[p.id] }}</span>
    </div>
  </div>
</template>

<style scoped>
@import './demo.css';
</style>
