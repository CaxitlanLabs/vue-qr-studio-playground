# Logo local

Puedes poner una imagen en el centro del QR. La imagen **nunca sale del navegador**: se lee con `FileReader`, se guarda como Data URL en `design.logo.src` y, si hace falta, se compone en un `canvas` local.

## En el diseñador

`<QrDesigner>` ya incluye la zona para subir el logo, con controles de tamaño, margen, fondo y "ocultar puntos detrás". Puedes limitar el peso con `max-logo-bytes`:

```vue
<QrDesigner :max-logo-bytes="500 * 1024" @logo-error="(e) => console.warn(e.code)" />
```

## readImageFile

Para tu propia interfaz, `readImageFile()` lee un `File`, lo valida y te devuelve la información necesaria:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { LogoError, mergeDesign, readImageFile, QrCodePreview } from 'vue-qr-studio';

const design = ref(mergeDesign());

async function onFile(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  try {
    const img = await readImageFile(file, { maxBytes: 1024 * 1024 });
    design.value = mergeDesign(
      { logo: { src: img.dataUrl }, errorCorrectionLevel: img.recommendedErrorCorrection },
      design.value,
    );
  } catch (err) {
    if (err instanceof LogoError) alert(err.message);
  }
}
</script>

<template>
  <input type="file" accept="image/*" @change="onFile" />
  <QrCodePreview data="https://ejemplo.com" :design="design" />
</template>
```

### LocalImage

```ts
interface LocalImage {
  dataUrl: string;
  width: number;
  height: number;
  isSquare: boolean;
  recommendedErrorCorrection: 'M' | 'H';
  fileName: string;
  fileSize: number;
  mimeType: string;
}
```

### LogoError

| `code` | Motivo |
| --- | --- |
| `not-image` | El archivo no es de tipo `image/*`. |
| `too-large` | Supera `maxBytes` (por defecto `DEFAULT_MAX_LOGO_BYTES`, 2 MB). |
| `read-failed` | `FileReader` no pudo leer el archivo. |
| `load-failed` | El navegador no pudo decodificar la imagen. |

## Opciones del logo

| Campo | Descripción |
| --- | --- |
| `size` | Proporción del QR que ocupa (0.1 a 0.5). Por defecto `0.35`. |
| `margin` | Espacio en px entre el logo y los puntos. |
| `hideBackgroundDots` | Quita los puntos que quedan detrás del logo. |
| `background` | Dibuja un fondo sólido redondeado detrás del logo. |
| `backgroundColor` | Color de ese fondo. |

## Fondo detrás del logo

`qr-code-styling` no soporta fondo para el logo, así que la librería lo resuelve aparte: `composeLogoWithBackground()` dibuja el logo sobre un rectángulo redondeado en un canvas y devuelve un PNG. Los componentes, `useQrCode` y las funciones de exportación lo hacen solos mediante `resolveDesign()`.

Si usas `buildQrOptions` directamente, resuélvelo tú:

```ts
import { buildQrOptions, resolveDesign } from 'vue-qr-studio/core';

const resolved = await resolveDesign(design);
const options = buildQrOptions(data, resolved);
```

## Utilidades

| Función | Descripción |
| --- | --- |
| `recommendedErrorCorrection(w, h)` | `'M'` si la imagen es cuadrada, `'H'` si no. |
| `loadImage(src)` | Carga una imagen y resuelve con el `HTMLImageElement`. |
| `composeLogoWithBackground(src, color, opts?)` | Logo sobre fondo redondeado → Data URL PNG. Opciones: `padding`, `radius`, `resolution`. |

> [!TIP]
> Los logos cuadrados se integran mejor. Si el tuyo es rectangular, súbelo con fondo (`background: true`) para que destaque y mantén la corrección en `H`.
