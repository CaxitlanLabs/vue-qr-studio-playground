# Registro global (plugin)

Si vas a usar los componentes en muchas vistas, regístralos una sola vez con el plugin.

```ts
// main.ts
import { createApp } from 'vue';
import VueQrStudio from 'vue-qr-studio';
import 'vue-qr-studio/style.css';
import App from './App.vue';

createApp(App).use(VueQrStudio).mount('#app');
```

A partir de ahí, `<QrDesigner>` y `<QrCodePreview>` están disponibles en cualquier plantilla sin importarlos:

```vue
<template>
  <QrCodePreview data="https://ejemplo.com" />
</template>
```

También puedes importar el plugin por nombre:

```ts
import { VueQrStudio } from 'vue-qr-studio';
```

> [!NOTE]
> Importar los componentes en cada archivo (`import { QrDesigner } from 'vue-qr-studio'`) permite que tu bundler elimine lo que no uses. Si solo usas `QrCodePreview`, prefiere el import directo.
