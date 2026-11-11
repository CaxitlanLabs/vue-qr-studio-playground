# Preguntas frecuentes

## ¿Se envía algo a algún servidor?

No. La librería no hace ninguna petición de red. Los logos se leen con `FileReader`, se componen en un `canvas` local y los archivos se generan en el navegador. Lo único que se descarga son los propios archivos de la librería al instalarla.

## ¿Los QR caducan o dependen de un servicio?

No. El QR codifica directamente el contenido (la URL, el Wi-Fi, etc.). No hay redirecciones ni servicios intermedios, así que funcionará mientras el destino exista.

## ¿Puedo registrar escaneos o estadísticas?

La librería no lo hace porque eso requiere un servidor. Si lo necesitas, codifica una URL tuya que redirija al destino final y cuente las visitas; la librería se encarga solo de dibujar ese QR.

## Mi QR con logo no se lee

- Sube la corrección de errores a `H`.
- Reduce `logo.size` (prueba con `0.25`).
- Activa `hideBackgroundDots` y deja `margin` en 4–8 px.
- Asegura buen contraste entre puntos y fondo.

## ¿Qué tamaño de descarga elijo?

- **Pantalla o web:** 300–600 px.
- **Impresión pequeña** (tarjetas, etiquetas): 1000 px o SVG.
- **Impresión grande** (carteles, lonas): **SVG**, que escala sin perder calidad.

## ¿Funciona con Nuxt o SSR?

Sí, pero los componentes dibujan en `canvas`, así que deben renderizarse en el cliente. Envuélvelos en `<ClientOnly>`. Las funciones puras del core (`encodeContent`, `mergeDesign`, `buildQrOptions`…) funcionan también en el servidor.

## ¿Puedo usarlo sin Vue?

Sí, en parte. `vue-qr-studio/core` exporta todas las funciones sin depender de Vue. Para dibujar en pantalla combínalas con `qr-code-styling`:

```ts
import QRCodeStyling from 'qr-code-styling';
import { buildQrOptions, encodeContent, mergeDesign } from 'vue-qr-studio/core';

const data = encodeContent({ type: 'url', url: 'https://ejemplo.com' });
new QRCodeStyling(buildQrOptions(data, mergeDesign(), { size: 300 })).append(document.body);
```

## ¿Qué versión de Vue necesito?

Vue **3.4** o superior (la librería usa `defineModel`).

## ¿Dónde reporto un error o propongo una mejora?

En los [issues del repositorio](https://github.com/CaxitlanLabs/vue-qr-studio/issues).
