# Plantillas y catálogos

## Plantillas incluidas

`DESIGN_PRESETS` trae cinco diseños listos. Cada uno es un `QrDesignPreset` con un `id` y un `design` **parcial**:

<!-- demo:preview-presets -->

```ts
interface QrDesignPreset {
  id: string;
  design: QrDesignInput;
}
```

| id | Nombre (es) | Estilo |
| --- | --- | --- |
| `classic` | Clásico | Negro sobre blanco, cuadrado. |
| `ocean` | Océano | Degradado azul lineal, esquinas redondeadas. |
| `sunset` | Atardecer | Degradado radial rosa-ámbar, fondo crema. |
| `forest` | Bosque | Puntos verdes. |
| `night` | Noche | Puntos claros sobre fondo oscuro con degradado. |

## Crear tus propias plantillas

Pasa tu lista al diseñador con la prop `presets`. Para ver su nombre traducido, añade el `id` a `messages.presets`:

```vue
<script setup lang="ts">
import { QrDesigner, DESIGN_PRESETS, type QrDesignPreset } from 'vue-qr-studio';

const marca: QrDesignPreset = {
  id: 'marca',
  design: {
    dots: { type: 'rounded', color: '#e11d48' },
    cornersSquare: { type: 'extra-rounded', color: '#881337' },
    cornersDot: { type: 'dot', color: '#881337' },
  },
};
</script>

<template>
  <QrDesigner
    :presets="[marca, ...DESIGN_PRESETS]"
    :messages="{ presets: { marca: 'Mi marca' } }"
  />
</template>
```

> [!NOTE]
> Al aplicar una plantilla en el diseñador se conservan el logo, la corrección de errores, el margen y la transparencia del fondo. Solo cambian colores y formas.

## Catálogos

Listas de valores válidos, útiles para construir tu propia interfaz:

| Constante | Valores |
| --- | --- |
| `DOT_TYPES` | `square`, `dots`, `rounded`, `extra-rounded`, `classy`, `classy-rounded` |
| `CORNER_SQUARE_TYPES` | `square`, `dot`, `extra-rounded` |
| `CORNER_DOT_TYPES` | `square`, `dot` |
| `GRADIENT_TYPES` | `none`, `linear`, `radial` |
| `CONTENT_TYPES` | `url`, `text`, `whatsapp`, `email`, `phone`, `sms`, `wifi` |
| `FILE_EXTENSIONS` | `png`, `svg`, `jpeg`, `webp` |
| `DOWNLOAD_SIZES` | `300`, `1000`, `2000` |

`DOT_TYPE_PREVIEWS` contiene un *path* SVG (viewBox `0 0 24 24`) para dibujar el ícono de cada estilo de punto:

```vue
<script setup lang="ts">
import { DOT_TYPES, DOT_TYPE_PREVIEWS } from 'vue-qr-studio';
</script>

<template>
  <svg v-for="type in DOT_TYPES" :key="type" viewBox="0 0 24 24" width="32">
    <path :d="DOT_TYPE_PREVIEWS[type]" fill="currentColor" />
  </svg>
</template>
```
