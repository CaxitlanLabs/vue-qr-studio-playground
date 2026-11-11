<script setup lang="ts">
import { ref } from 'vue';
import { QrDesigner, mergeDesign, type QrContent } from 'vue-qr-studio';

const content = ref<QrContent>({ type: 'text', text: 'Tema morado' });
const design = ref(mergeDesign({ dots: { type: 'rounded', color: '#7c3aed' } }));
</script>

<template>
  <div class="morado">
    <QrDesigner
      v-model:content="content"
      v-model:design="design"
      :show-header="false"
      :content-types="['text', 'url']"
      :presets="[]"
      :extensions="['png', 'svg']"
    />
  </div>
</template>

<style>
.morado .qrs {
  --qrs-primary: #7c3aed;
  --qrs-primary-soft: rgba(124, 58, 237, 0.12);
  --qrs-radius: 8px;
}
</style>
