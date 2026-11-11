# QrCodePreview

`<QrCodePreview>` dibuja un QR a partir de un texto y un diseño, sin ninguna interfaz alrededor. Es ideal para mostrar QR en tarjetas, tickets, perfiles o listados.

<!-- demo:preview-basic -->

## Uso

```vue
<script setup lang="ts">
import { QrCodePreview } from 'vue-qr-studio';
</script>

<template>
  <QrCodePreview
    data="https://ejemplo.com"
    :design="{ dots: { type: 'rounded', color: '#0f766e' } }"
    :size="200"
  />
</template>
```

Se actualiza solo cuando cambian `data`, `design`, `size` o `renderer`.

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `data` | `string` | — (requerida) | Texto a codificar. Usa [`encodeContent`](#/docs/contenido) para WhatsApp, Wi-Fi, etc. |
| `design` | `QrDesignInput \| QrDesign` | `{}` | Diseño completo o parcial; se combina con los valores por defecto. |
| `size` | `number` | `300` | Resolución interna en píxeles. |
| `renderer` | `'canvas' \| 'svg'` | `'canvas'` | Cómo se dibuja en pantalla. |

> [!TIP]
> El componente se adapta al ancho disponible (`max-width: 100%`), así que puedes usar un `size` alto para pantallas retina y controlar el tamaño visual con CSS.

## Métodos expuestos

| Método | Devuelve | Descripción |
| --- | --- | --- |
| `download(options?)` | `Promise<void>` | Descarga el QR. Ver [`QrDownloadOptions`](#/docs/exportar). |
| `toBlob(options?)` | `Promise<Blob>` | El QR como `Blob`. |
| `toDataUrl(options?)` | `Promise<string>` | El QR como Data URL. |
| `refresh()` | `Promise<void>` | Fuerza un nuevo render. |

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { QrCodePreview } from 'vue-qr-studio';

const qr = ref<InstanceType<typeof QrCodePreview> | null>(null);
</script>

<template>
  <QrCodePreview ref="qr" data="https://ejemplo.com" />
  <button @click="qr?.download({ extension: 'svg', size: 1000, name: 'mi-qr' })">Descargar</button>
</template>
```

## Con plantillas

Las [plantillas incluidas](#/docs/plantillas) son diseños parciales, así que se pasan directamente:

<!-- demo:preview-presets -->

```vue
<script setup lang="ts">
import { DESIGN_PRESETS, QrCodePreview } from 'vue-qr-studio';
</script>

<template>
  <QrCodePreview
    v-for="preset in DESIGN_PRESETS"
    :key="preset.id"
    data="https://vuejs.org"
    :design="preset.design"
    :size="140"
  />
</template>
```
