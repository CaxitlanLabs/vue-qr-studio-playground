# vue-qr-studio · playground

Proyecto de pruebas para [vue-qr-studio](https://github.com/CaxitlanLabs/vue-qr-studio).

**Demo en vivo:** https://caxitlanlabs.github.io/vue-qr-studio-playground/

Tiene tres pestañas:

- **QrDesigner**: el componente completo con `v-model`, eventos en vivo y cambio de idioma.
- **QrCodePreview**: las plantillas incluidas, con renderer canvas o SVG.
- **Composable y core**: `useQrCode()` y funciones como `encodeContent` y `renderQrToDataUrl`.

Todo corre en el navegador: no hay backend y los logos no se suben a ningún servidor.

## Desarrollo local

El playground usa la librería desde la carpeta hermana (`link:../vue-qr-studio`):

```
projects/libraries/
├── vue-qr-studio/
└── vue-qr-studio-playground/
```

```bash
# terminal 1: librería en modo watch
cd ../vue-qr-studio && pnpm install && pnpm dev

# terminal 2: playground
pnpm install && pnpm dev   # http://localhost:5180
```

## Publicación

Cada push a `main` despliega en GitHub Pages con `.github/workflows/deploy-pages.yml`. El workflow clona también la librería y la compila antes del playground. Si cambias solo la librería, vuelve a ejecutar el workflow a mano: *Actions → Deploy to GitHub Pages → Run workflow*.
