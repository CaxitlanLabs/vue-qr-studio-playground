<script setup lang="ts">
import { ref } from 'vue';
import { QrDesigner, createDefaultDesign, type QrContent } from 'vue-qr-studio';

const content = ref<QrContent>({ type: 'url', url: 'https://vuejs.org' });
const design = ref(createDefaultDesign());
</script>

<template>
  <QrDesigner v-model:content="content" v-model:design="design" :show-header="false" />
</template>
