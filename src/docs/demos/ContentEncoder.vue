<script setup lang="ts">
import { computed, ref } from 'vue';
import { QrCodePreview, createDefaultContent, encodeContent, isContentComplete, type QrContent, type QrContentType } from 'vue-qr-studio';

const examples: Record<QrContentType, QrContent> = {
  url: { type: 'url', url: 'https://ejemplo.com' },
  text: { type: 'text', text: 'Hola mundo' },
  whatsapp: { type: 'whatsapp', phone: '+52 55 1234 5678', message: '¡Hola!' },
  email: { type: 'email', to: 'hola@ejemplo.com', subject: 'Info', body: 'Quiero más información' },
  phone: { type: 'phone', phone: '+52 55 1234 5678' },
  sms: { type: 'sms', phone: '5512345678', message: 'Hola' },
  wifi: { type: 'wifi', ssid: 'MiCasa', password: 'clave;segura', encryption: 'WPA', hidden: false },
};

const type = ref<QrContentType>('whatsapp');
const json = ref(JSON.stringify(examples.whatsapp, null, 2));
const parsed = computed<QrContent | null>(() => {
  try {
    return JSON.parse(json.value);
  } catch {
    return null;
  }
});
const encoded = computed(() => (parsed.value ? encodeContent(parsed.value) : ''));
const complete = computed(() => !!parsed.value && isContentComplete(parsed.value));

function pick(t: QrContentType) {
  type.value = t;
  json.value = JSON.stringify(examples[t] ?? createDefaultContent(t), null, 2);
}
</script>

<template>
  <div class="d-split">
    <div class="d-col">
      <div class="d-row">
        <button v-for="t in Object.keys(examples)" :key="t" type="button" class="d-btn" :class="{ 'd-btn--primary': type === t }" @click="pick(t as QrContentType)">
          {{ t }}
        </button>
      </div>
      <label class="d-field">QrContent (JSON editable)
        <textarea v-model="json" rows="7" spellcheck="false" style="font-family: ui-monospace, Menlo, monospace; font-size: 12px" />
      </label>
      <span class="d-muted">encodeContent() →</span>
      <code class="d-code">{{ parsed ? encoded : 'JSON inválido' }}</code>
      <span class="d-muted">isContentComplete() → <strong>{{ complete }}</strong></span>
    </div>
    <QrCodePreview class="d-qr" :data="encoded" :size="170" :style="{ opacity: complete ? 1 : 0.3 }" />
  </div>
</template>

<style scoped>
@import './demo.css';
</style>
