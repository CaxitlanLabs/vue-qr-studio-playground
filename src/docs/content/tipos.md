# Tipos TypeScript

Todos los tipos se exportan desde `vue-qr-studio` y `vue-qr-studio/core`:

```ts
import type { QrDesign, QrContent, QrDownloadOptions } from 'vue-qr-studio';
```

## Diseño

```ts
type QrGradientType = 'none' | 'linear' | 'radial';

interface QrFill {
  color: string;
  color2: string;
  gradient: QrGradientType;
  rotation: number;
}

interface QrLogoOptions {
  src: string;
  size: number;
  margin: number;
  hideBackgroundDots: boolean;
  background: boolean;
  backgroundColor: string;
}

interface QrDesign {
  dots: QrFill & { type: DotType };
  background: QrFill & { transparent: boolean };
  cornersSquare: { type: CornerSquareType; color: string };
  cornersDot: { type: CornerDotType; color: string };
  logo: QrLogoOptions;
  errorCorrectionLevel: ErrorCorrectionLevel;
  margin: number;
}

/** Cada sección opcional y parcial; para mergeDesign y QrCodePreview. */
type QrDesignInput = { [K in keyof QrDesign]?: Partial<QrDesign[K]> };

interface QrDesignPreset {
  id: string;
  design: QrDesignInput;
}
```

`DotType`, `CornerSquareType`, `CornerDotType` y `ErrorCorrectionLevel` se reexportan de `qr-code-styling`.

## Contenido

```ts
type WifiEncryption = 'WPA' | 'WEP' | 'nopass';

type QrContent =
  | { type: 'url'; url: string }
  | { type: 'text'; text: string }
  | { type: 'whatsapp'; phone: string; message?: string }
  | { type: 'email'; to: string; subject?: string; body?: string }
  | { type: 'phone'; phone: string }
  | { type: 'sms'; phone: string; message?: string }
  | { type: 'wifi'; ssid: string; password?: string; encryption?: WifiEncryption; hidden?: boolean };

type QrContentType = QrContent['type'];
```

## Render y exportación

```ts
type QrFileExtension = 'png' | 'jpeg' | 'webp' | 'svg';

interface QrRenderOptions {
  size?: number;
  renderer?: 'canvas' | 'svg';
}

interface QrDownloadOptions {
  name?: string;
  extension?: QrFileExtension;
  size?: number;
}
```

## Logo

```ts
interface LocalImage {
  dataUrl: string;
  width: number;
  height: number;
  isSquare: boolean;
  recommendedErrorCorrection: ErrorCorrectionLevel;
  fileName: string;
  fileSize: number;
  mimeType: string;
}

class LogoError extends Error {
  readonly code: 'not-image' | 'too-large' | 'read-failed' | 'load-failed';
}
```

## Textos

```ts
type QrStudioLocale = 'es' | 'en';
interface QrStudioMessages { /* ver la página Idiomas y textos */ }
type QrStudioMessagesInput = DeepPartial<QrStudioMessages>;
```

## Composable

```ts
interface UseQrCodeOptions {
  size?: MaybeRefOrGetter<number>;
  renderer?: MaybeRefOrGetter<'canvas' | 'svg'>;
  container?: Ref<HTMLElement | null | undefined>;
}
```

## Índice de funciones

| Función | Página |
| --- | --- |
| `createDefaultDesign`, `mergeDesign`, `buildQrOptions`, `buildFillOptions` | [Diseño](#/docs/diseno) |
| `encodeContent`, `isContentComplete`, `createDefaultContent`, `sanitizePhone`, `buildWhatsAppUrl`, `buildMailto`, `buildWifiString`, `escapeWifiValue` | [Tipos de contenido](#/docs/contenido) |
| `readImageFile`, `loadImage`, `composeLogoWithBackground`, `recommendedErrorCorrection` | [Logo local](#/docs/logo) |
| `downloadQr`, `renderQrToBlob`, `renderQrToDataUrl`, `resolveDesign`, `designForExtension`, `sanitizeFileName`, `mimeFor` | [Exportar](#/docs/exportar) |
| `resolveMessages`, `es`, `en`, `locales` | [Idiomas](#/docs/idiomas) |
| `useQrCode` | [useQrCode](#/docs/use-qr-code) |
