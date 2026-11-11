# Acciones personalizadas

El slot `actions` de `<QrDesigner>` reemplaza los botones de descarga para que pongas los tuyos. Recibe las funciones del componente:

| Prop del slot | Tipo | Descripción |
| --- | --- | --- |
| `download` | `(ext: QrFileExtension) => Promise<void>` | Descarga con el tamaño seleccionado. |
| `copy` | `() => Promise<void>` | Copia el PNG al portapapeles. |
| `complete` | `boolean` | `true` si el contenido es válido. |

<!-- demo:designer-actions -->

## Ejemplo

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { QrDesigner } from 'vue-qr-studio';

const designer = ref<InstanceType<typeof QrDesigner> | null>(null);
</script>

<template>
  <QrDesigner ref="designer">
    <template #actions="{ download, complete }">
      <button :disabled="!complete" @click="download('png')">Descargar mi QR</button>
      <button @click="designer?.applyPreset({ id: 'rojo', design: { dots: { color: '#dc2626', type: 'dots' } } })">
        Aplicar estilo rojo
      </button>
    </template>
  </QrDesigner>
</template>
```

## Guardar en tu propia app

Combina el slot con `v-model` para guardar el QR donde quieras (tu backend, IndexedDB, un store de Pinia…). La librería no envía nada por sí sola; tú decides:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { QrDesigner, createDefaultDesign, encodeContent, renderQrToBlob, type QrContent } from 'vue-qr-studio';

const content = ref<QrContent>({ type: 'url', url: 'https://' });
const design = ref(createDefaultDesign());

async function guardar() {
  const blob = await renderQrToBlob(encodeContent(content.value), design.value, { size: 1000 });
  // Aquí tu lógica: subirlo, guardarlo localmente, etc.
  console.log('QR listo', blob.size, 'bytes');
}
</script>

<template>
  <QrDesigner v-model:content="content" v-model:design="design">
    <template #actions="{ complete }">
      <button :disabled="!complete" @click="guardar">Guardar</button>
    </template>
  </QrDesigner>
</template>
```

## Escuchar descargas

Si te basta con los botones originales pero quieres reaccionar a la descarga (métricas, avisos…), usa el evento `download`:

```vue
<QrDesigner @download="({ name, extension, size }) => track('qr_download', { name, extension, size })" />
```
