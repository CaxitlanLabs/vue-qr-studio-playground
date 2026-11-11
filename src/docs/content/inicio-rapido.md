# Inicio rápido

Esta guía te lleva de cero a un generador de QR funcional en menos de un minuto.

## 1. El diseñador completo

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { QrDesigner, createDefaultDesign, type QrContent } from 'vue-qr-studio';
import 'vue-qr-studio/style.css';

const content = ref<QrContent>({ type: 'url', url: 'https://ejemplo.com' });
const design = ref(createDefaultDesign());
</script>

<template>
  <QrDesigner v-model:content="content" v-model:design="design" />
</template>
```

Con esto ya tienes la interfaz completa: tipo de contenido, plantillas, formas, colores, logo y botones de descarga.

## 2. Solo mostrar un QR

Si ya sabes qué quieres codificar y solo necesitas mostrarlo:

```vue
<script setup lang="ts">
import { QrCodePreview } from 'vue-qr-studio';
import 'vue-qr-studio/style.css';
</script>

<template>
  <QrCodePreview
    data="https://ejemplo.com"
    :design="{ dots: { type: 'rounded', color: '#2563eb' } }"
    :size="240"
  />
</template>
```

El `design` puede ser **parcial**: lo que no indiques toma el valor por defecto.

## 3. Generar una imagen sin interfaz

Para crear un PNG desde código (por ejemplo, para mostrarlo en un `<img>` o adjuntarlo a algo):

```ts
import { encodeContent, mergeDesign, renderQrToDataUrl } from 'vue-qr-studio/core';

const data = encodeContent({ type: 'whatsapp', phone: '+52 55 1234 5678', message: 'Hola' });
const png = await renderQrToDataUrl(data, mergeDesign({ dots: { type: 'dots' } }), { size: 600 });
// png = "data:image/png;base64,…"
```

## Siguientes pasos

- Conoce todas las props y eventos de [QrDesigner](#/docs/qr-designer).
- Aprende la estructura de un [diseño](#/docs/diseno).
- Cambia los colores de la interfaz con [temas](#/docs/temas).
