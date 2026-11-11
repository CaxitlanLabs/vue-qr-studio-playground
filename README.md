# vue-qr-studio · playground

Documentación y playground de [vue-qr-studio](https://github.com/CaxitlanLabs/vue-qr-studio).

**En vivo:** https://caxitlanlabs.github.io/vue-qr-studio-playground/

## Documentación

La sección `#/docs` tiene menú lateral, buscador, índice "En esta página" y demos en vivo.

- Las páginas son archivos Markdown en `src/docs/content/<slug>.md`.
- El orden y los grupos del menú están en `src/docs/nav.ts`.
- Para insertar una demo en vivo, escribe `<!-- demo:nombre -->` en el Markdown y registra el componente en `src/docs/demos/index.ts`.
- Los avisos se escriben como `> [!NOTE]`, `> [!TIP]` o `> [!WARNING]`.

Para agregar una página: crea el `.md`, añádelo a `nav.ts` y listo.

## Playground

La sección `#/playground` tiene tres pestañas:

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
