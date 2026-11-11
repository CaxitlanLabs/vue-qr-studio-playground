# Exportar y descargar

La librería genera los archivos en el navegador. Hay tres formas de obtener el QR: descargarlo, como `Blob` o como Data URL.

## Formatos

| Formato | Transparencia | Notas |
| --- | --- | --- |
| `png` | Sí | El más compatible. |
| `svg` | Sí | Vectorial: ideal para imprenta y tamaños grandes. |
| `webp` | Sí | Archivos más ligeros. |
| `jpeg` | No | Si el fondo es transparente, se usa `background.color`. |

## QrDownloadOptions

```ts
interface QrDownloadOptions {
  name?: string;               // sin extensión. Por defecto 'qr-code'
  extension?: 'png' | 'jpeg' | 'webp' | 'svg'; // por defecto 'png'
  size?: number;               // px. Por defecto 1000
}
```

## downloadQr

Descarga el archivo directamente:

```ts
import { downloadQr, mergeDesign } from 'vue-qr-studio';

await downloadQr('https://ejemplo.com', mergeDesign(), {
  name: 'Campaña Verano 2026',
  extension: 'svg',
  size: 2000,
});
// Descarga "campana-verano-2026.svg"
```

El nombre pasa por `sanitizeFileName()`: quita acentos, espacios y caracteres raros.

## renderQrToBlob

Útil para subir el archivo con tu propio código, compartirlo con la Web Share API o guardarlo en IndexedDB:

```ts
import { renderQrToBlob } from 'vue-qr-studio';

const blob = await renderQrToBlob(data, design, { size: 800, extension: 'png' });

if (navigator.canShare?.({ files: [new File([blob], 'qr.png', { type: blob.type })] })) {
  await navigator.share({ files: [new File([blob], 'qr.png', { type: blob.type })] });
}
```

## renderQrToDataUrl

Para mostrar el resultado en un `<img>` o guardarlo como texto:

```ts
import { renderQrToDataUrl } from 'vue-qr-studio';

const src = await renderQrToDataUrl(data, design, { size: 400 });
// <img :src="src">
```

## Desde componentes y composable

Los mismos métodos existen en [`QrCodePreview`](#/docs/qr-code-preview) (vía `ref`) y en [`useQrCode`](#/docs/use-qr-code), sin repetir `data` y `design`:

```ts
const { download, toBlob, toDataUrl } = useQrCode(data, design);
await download({ extension: 'png', size: 1000, name: 'mi-qr' });
```

## Copiar al portapapeles

`<QrDesigner>` incluye un botón "Copiar imagen" cuando el navegador soporta `ClipboardItem`. Para hacerlo tú:

```ts
const blob = await renderQrToBlob(data, design, { extension: 'png' });
await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
```

## Otras utilidades

| Función | Descripción |
| --- | --- |
| `sanitizeFileName(name)` | Nombre de archivo seguro (`'Mi QR!'` → `'mi-qr'`). |
| `mimeFor(extension)` | Tipo MIME (`'svg'` → `'image/svg+xml'`). |
| `designForExtension(design, ext)` | Ajusta el diseño al formato (quita la transparencia en JPEG). |
| `resolveDesign(design)` | Compone el fondo del logo si hace falta. |
