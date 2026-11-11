# Introducción

**vue-qr-studio** es una librería para **Vue 3** que permite generar y diseñar códigos QR: colores sólidos o degradados, seis estilos de punto, esquinas personalizadas, logo, plantillas, fondo transparente y descarga en PNG, SVG, JPEG o WEBP.

<!-- demo:designer-basic -->

## ¿Por qué vue-qr-studio?

- **100% en el navegador.** No llama a ninguna API ni sube nada a ningún servidor. Los logos se leen con `FileReader` y viven en memoria como Data URL.
- **Tres niveles de uso.** Puedes usar el diseñador completo, solo la vista previa, el composable `useQrCode` o las funciones del core sin Vue.
- **Diseños como JSON.** Todo el aspecto del QR es un objeto plano (`QrDesign`) que puedes guardar y restaurar donde quieras.
- **Tipado completo.** Escrita en TypeScript; los tipos se incluyen en el paquete.
- **Personalizable.** Textos en español e inglés (o los tuyos), tema claro u oscuro y colores mediante variables CSS.

## ¿Qué incluye?

| Pieza | Para qué sirve |
| --- | --- |
| [`<QrDesigner>`](#/docs/qr-designer) | Interfaz completa: contenido, plantillas, formas, colores, logo y descarga. |
| [`<QrCodePreview>`](#/docs/qr-code-preview) | Solo dibuja un QR a partir de `data` y `design`. |
| [`useQrCode()`](#/docs/use-qr-code) | Composable para dibujar un QR en cualquier elemento. |
| [Core](#/docs/contenido) | Funciones puras: codificar contenido, construir opciones, leer logos, exportar. |

## Cómo está construida

La librería usa [qr-code-styling](https://github.com/kozakdenys/qr-code-styling) para dibujar el QR y añade encima la capa de diseño, los componentes de Vue y las utilidades. `vue` es una dependencia *peer* (versión 3.4 o superior).

> [!TIP]
> ¿Prefieres probar antes de leer? Abre el [Playground](#/playground).
