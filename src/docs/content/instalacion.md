# Instalación

## Requisitos

- **Vue 3.4** o superior.
- Un bundler con soporte de ES Modules (Vite, Nuxt, Webpack 5…).
- Navegadores modernos. La librería usa `canvas`, `FileReader` y `Blob`.

## Instalar el paquete

Con tu gestor de paquetes favorito:

```bash
pnpm add vue-qr-studio
```

```bash
npm install vue-qr-studio
```

```bash
yarn add vue-qr-studio
```

`qr-code-styling` se instala automáticamente como dependencia.

## Importar los estilos

Los componentes necesitan su hoja de estilos. Impórtala una vez, normalmente en `main.ts`:

```ts
import 'vue-qr-studio/style.css';
```

> [!NOTE]
> Si solo usas el **core** (`vue-qr-studio/core`) o el composable `useQrCode`, no necesitas el CSS.

## Puntos de entrada

| Import | Contenido |
| --- | --- |
| `vue-qr-studio` | Todo: componentes, composable, core y el plugin (export por defecto). |
| `vue-qr-studio/core` | Solo funciones y tipos, sin dependencias de Vue. |
| `vue-qr-studio/style.css` | Estilos de los componentes. |

## Nuxt

En Nuxt, registra el CSS en `nuxt.config.ts` y usa los componentes en el cliente (dibujan en `canvas`):

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ['vue-qr-studio/style.css'],
});
```

```vue
<template>
  <ClientOnly>
    <QrDesigner />
  </ClientOnly>
</template>

<script setup lang="ts">
import { QrDesigner } from 'vue-qr-studio';
</script>
```
