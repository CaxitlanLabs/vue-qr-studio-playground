# useQrCode

`useQrCode` dibuja un QR dentro de cualquier elemento y lo mantiene sincronizado con tus datos reactivos. Es lo que usa `<QrCodePreview>` por dentro; úsalo cuando necesites control total del marcado.

<!-- demo:use-qr-code -->

## Uso

```vue
<script setup lang="ts">
import { computed, ref } from 'vue';
import { mergeDesign, useQrCode } from 'vue-qr-studio';

const url = ref('https://ejemplo.com');
const color = ref('#db2777');
const design = computed(() => mergeDesign({ dots: { type: 'classy-rounded', color: color.value } }));

const { container, download } = useQrCode(url, design, { size: 220 });
</script>

<template>
  <div ref="container" />
  <button @click="download({ extension: 'png', size: 1000 })">Descargar</button>
</template>
```

## Firma

```ts
function useQrCode(
  data: MaybeRefOrGetter<string>,
  design: MaybeRefOrGetter<QrDesign>,
  options?: UseQrCodeOptions,
): {
  container: Ref<HTMLElement | null>;
  instance: ShallowRef<QRCodeStyling | null>;
  isRendering: Ref<boolean>;
  refresh: () => Promise<void>;
  download: (opts?: QrDownloadOptions) => Promise<void>;
  toBlob: (opts?: Omit<QrDownloadOptions, 'name'>) => Promise<Blob>;
  toDataUrl: (opts?: Omit<QrDownloadOptions, 'name'>) => Promise<string>;
};
```

`data` y `design` aceptan valores fijos, `ref`, `computed` o funciones getter:

```ts
useQrCode('https://fijo.com', design);
useQrCode(urlRef, design);
useQrCode(() => `https://ejemplo.com/u/${user.id}`, design);
```

> [!WARNING]
> `design` debe ser un `QrDesign` **completo**. Si partes de un objeto parcial, pásalo por [`mergeDesign()`](#/docs/diseno) (como en el ejemplo).

## Opciones

| Opción | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `size` | `MaybeRefOrGetter<number>` | `300` | Tamaño de la vista previa en píxeles. |
| `renderer` | `MaybeRefOrGetter<'canvas' \| 'svg'>` | `'canvas'` | Tipo de render en pantalla. |
| `container` | `Ref<HTMLElement \| null>` | — | Usa tu propio ref en lugar del `container` devuelto. |

## Valores devueltos

| Nombre | Descripción |
| --- | --- |
| `container` | Ref para enlazar con `ref="container"` en tu plantilla. |
| `instance` | La instancia de `qr-code-styling`, para usos avanzados. |
| `isRendering` | `true` mientras se compone el logo o se redibuja. |
| `refresh()` | Fuerza un nuevo render. |
| `download()` | Descarga el QR actual. Las descargas se generan aparte, en el tamaño pedido. |
| `toBlob()` / `toDataUrl()` | Exportan el QR actual sin descargarlo. |

## Detalles

- Los cambios rápidos (por ejemplo, arrastrar un selector de color) no se acumulan: si llega un cambio nuevo mientras se compone el logo, el render anterior se descarta.
- Al desmontar el componente, el composable limpia el elemento y libera la instancia.
