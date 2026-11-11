# Guardar y restaurar diseños

Como `QrDesign` y `QrContent` son JSON plano, guardarlos es tan simple como `JSON.stringify`.

<!-- demo:save-restore -->

## En localStorage

```vue
<script setup lang="ts">
import { ref, watch } from 'vue';
import { QrDesigner, createDefaultDesign, mergeDesign, type QrDesign } from 'vue-qr-studio';

const KEY = 'mi-diseno-qr';

function load(): QrDesign {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? mergeDesign(JSON.parse(raw)) : createDefaultDesign();
  } catch {
    return createDefaultDesign();
  }
}

const design = ref(load());

watch(design, (value) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    /* almacenamiento lleno o no disponible */
  }
}, { deep: true });
</script>

<template>
  <QrDesigner v-model:design="design" />
</template>
```

## Usa siempre mergeDesign al cargar

Pasa lo guardado por `mergeDesign()` en lugar de usarlo tal cual. Así, si una versión nueva de la librería añade campos (como `background.transparent`), los diseños antiguos se completan con los valores por defecto.

```ts
const design = mergeDesign(JSON.parse(saved));
```

## Cuidado con el logo

`design.logo.src` es un Data URL y puede pesar cientos de KB. `localStorage` suele limitarse a unos 5 MB por sitio. Opciones:

- Guardar el diseño **sin** el logo:

  ```ts
  const { logo, ...rest } = design.value;
  localStorage.setItem(KEY, JSON.stringify({ ...rest, logo: { ...logo, src: '' } }));
  ```

- Guardar el logo en **IndexedDB**, que admite mucho más espacio.

## Compartir un diseño

Al ser JSON, puedes exportarlo a un archivo para compartirlo:

```ts
const blob = new Blob([JSON.stringify(design.value, null, 2)], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = Object.assign(document.createElement('a'), { href: url, download: 'diseno-qr.json' });
a.click();
URL.revokeObjectURL(url);
```
