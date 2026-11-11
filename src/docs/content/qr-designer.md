# QrDesigner

`<QrDesigner>` es la interfaz completa para crear un QR: el usuario elige el tipo de contenido, aplica una plantilla, ajusta formas y colores, sube un logo y descarga el resultado.

<!-- demo:designer-basic -->

## Uso básico

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { QrDesigner, createDefaultDesign, type QrContent } from 'vue-qr-studio';

const content = ref<QrContent>({ type: 'url', url: 'https://ejemplo.com' });
const design = ref(createDefaultDesign());
const name = ref('mi-qr');
</script>

<template>
  <QrDesigner v-model:content="content" v-model:design="design" v-model:name="name" />
</template>
```

Los tres `v-model` son opcionales. Si no los enlazas, el componente guarda el estado internamente.

## v-model

| Modelo | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `v-model:content` | [`QrContent`](#/docs/contenido) | `{ type: 'url', url: 'https://' }` | Qué codifica el QR. |
| `v-model:design` | [`QrDesign`](#/docs/diseno) | `createDefaultDesign()` | Aspecto visual. |
| `v-model:name` | `string` | `''` | Nombre del archivo descargado (sin extensión). |

> [!NOTE]
> El componente trabaja sobre una copia local y emite **objetos nuevos** en cada cambio. Puedes guardarlos directamente sin preocuparte por referencias compartidas.

## Props

| Prop | Tipo | Por defecto | Descripción |
| --- | --- | --- | --- |
| `locale` | `'es' \| 'en'` | `'es'` | Idioma de la interfaz. |
| `messages` | `QrStudioMessagesInput` | — | Sobrescribe cualquier texto. Ver [Idiomas](#/docs/idiomas). |
| `contentTypes` | `QrContentType[]` | todos | Tipos de contenido disponibles, en ese orden. |
| `downloadSizes` | `number[]` | `[300, 1000, 2000]` | Tamaños de descarga (px). Se preselecciona el segundo. |
| `extensions` | `QrFileExtension[]` | `['png', 'svg', 'jpeg', 'webp']` | Formatos de descarga. El primero es el botón principal. |
| `presets` | `QrDesignPreset[]` | 5 plantillas | Plantillas mostradas. `[]` oculta la sección. |
| `maxLogoBytes` | `number` | `2097152` (2 MB) | Tamaño máximo del logo. `0` = sin límite. |
| `previewSize` | `number` | `300` | Resolución de la vista previa (px). |
| `theme` | `'auto' \| 'light' \| 'dark'` | `'auto'` | Tema de la interfaz. Ver [Temas](#/docs/temas). |
| `showHeader` | `boolean` | `true` | Muestra el título y subtítulo. |
| `showName` | `boolean` | `true` | Muestra el campo de nombre de archivo. |

### Limitar los tipos de contenido

```vue
<QrDesigner :content-types="['url', 'whatsapp']" />
```

### Solo PNG y SVG, en tamaños propios

```vue
<QrDesigner :extensions="['png', 'svg']" :download-sizes="[512, 1024, 4096]" />
```

## Eventos

| Evento | Payload | Cuándo |
| --- | --- | --- |
| `download` | `{ name, extension, size, data }` | Después de descargar un archivo. `data` es el texto codificado. |
| `logo-change` | `LocalImage \| null` | Al subir, cambiar o quitar el logo. |
| `logo-error` | `LogoError` | El archivo no es imagen, es muy grande o no se pudo leer. |

```vue
<QrDesigner
  @download="({ name, extension }) => console.log(`Descargado ${name}.${extension}`)"
  @logo-error="(err) => alert(err.message)"
/>
```

## Slots

| Slot | Props del slot | Descripción |
| --- | --- | --- |
| `header` | — | Reemplaza el título y subtítulo. |
| `preview-footer` | `{ data, design, complete }` | Contenido extra debajo de la vista previa. |
| `actions` | `{ download, copy, complete }` | Reemplaza los botones de descarga, copiar y restablecer. |

```vue
<QrDesigner>
  <template #header>
    <h2>Crea el QR de tu campaña</h2>
  </template>

  <template #preview-footer="{ data, complete }">
    <p v-if="complete">Codifica: {{ data }}</p>
  </template>
</QrDesigner>
```

Hay un ejemplo completo del slot `actions` en [Acciones personalizadas](#/docs/acciones-personalizadas).

## Métodos expuestos

Con un `ref` al componente puedes llamar:

| Método / propiedad | Descripción |
| --- | --- |
| `download(extension)` | Descarga en el formato indicado con el tamaño seleccionado. |
| `copyImage()` | Copia el QR como PNG al portapapeles (si el navegador lo permite). |
| `resetDesign()` | Vuelve al diseño por defecto y quita el logo. |
| `applyPreset(preset)` | Aplica una plantilla conservando logo, corrección de errores, margen y transparencia. |
| `encoded` | `ComputedRef<string>` con el texto que se codifica. |

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { QrDesigner } from 'vue-qr-studio';

const designer = ref<InstanceType<typeof QrDesigner> | null>(null);
</script>

<template>
  <QrDesigner ref="designer" />
  <button @click="designer?.download('svg')">Descargar SVG</button>
</template>
```

## Comportamientos útiles

- **Cambiar de tipo de contenido no borra datos.** Si el usuario escribe una URL, cambia a WhatsApp y vuelve, la URL sigue ahí.
- **Logos no cuadrados.** Al subir un logo rectangular, la corrección de errores sube a `H` automáticamente para que el QR siga siendo legible.
- **Contenido incompleto.** Mientras el contenido no sea válido (por ejemplo, un email sin `@`), la vista previa se atenúa y los botones de descarga se desactivan.
