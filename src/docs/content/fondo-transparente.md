# Fondo transparente

Por defecto el QR se exporta con fondo sólido. Activa `background.transparent` para descargarlo sin fondo y ponerlo sobre cualquier color o imagen.

<!-- demo:transparent -->

## En el diseñador

En la sección **Colores**, marca **Fondo transparente**. La vista previa muestra un fondo cuadriculado para que se vea qué parte es transparente.

## Desde código

```ts
import { mergeDesign, downloadQr } from 'vue-qr-studio';

const design = mergeDesign({
  dots: { color: '#1d4ed8' },
  background: { transparent: true },
});

await downloadQr('https://ejemplo.com', design, { extension: 'png' });
```

## Soporte por formato

| Formato | Resultado |
| --- | --- |
| PNG | Sin fondo (canal alfa). |
| WEBP | Sin fondo (canal alfa). |
| SVG | El rectángulo de fondo usa `fill="none"`. |
| JPEG | **Con fondo**: el formato no admite transparencia, así que se usa `background.color`. |

> [!WARNING]
> Un QR necesita **contraste** para leerse. Si lo pones sobre un fondo oscuro, usa puntos claros (y al revés). Evita fondos con mucho detalle detrás del QR.

## Cómo funciona

Con `transparent: true`, `buildQrOptions()` envía `backgroundOptions.color = 'none'` y `qr-code-styling` no pinta el rectángulo de fondo. Para JPEG, `designForExtension()` desactiva la transparencia justo antes de exportar.
