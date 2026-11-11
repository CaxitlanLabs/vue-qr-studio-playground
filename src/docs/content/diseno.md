# Diseño del QR

Todo el aspecto visual de un QR vive en un objeto `QrDesign`. Es JSON plano: lo puedes guardar, enviar o versionar sin transformarlo.

## Estructura

```ts
interface QrDesign {
  dots: {
    type: DotType;            // 'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded'
    color: string;
    color2: string;           // segundo color del degradado
    gradient: 'none' | 'linear' | 'radial';
    rotation: number;         // grados, solo en degradado lineal
  };
  background: {
    color: string;
    color2: string;
    gradient: 'none' | 'linear' | 'radial';
    rotation: number;
    transparent: boolean;     // exporta sin fondo
  };
  cornersSquare: { type: CornerSquareType; color: string }; // marco del "ojo"
  cornersDot: { type: CornerDotType; color: string };       // centro del "ojo"
  logo: {
    src: string;              // Data URL; '' = sin logo
    size: number;             // 0.1 – 0.5 del tamaño del QR
    margin: number;           // px alrededor del logo
    hideBackgroundDots: boolean;
    background: boolean;      // fondo sólido detrás del logo
    backgroundColor: string;
  };
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  margin: number;             // zona silenciosa en px
}
```

## Valores por defecto

```ts
import { createDefaultDesign } from 'vue-qr-studio';

const design = createDefaultDesign();
```

| Campo | Valor |
| --- | --- |
| `dots` | `square`, `#111827`, sin degradado |
| `background` | `#ffffff`, sin degradado, opaco |
| `cornersSquare` / `cornersDot` | `square`, color `''` (hereda el de los puntos) |
| `logo` | sin imagen, `size: 0.35`, `margin: 5`, con fondo blanco |
| `errorCorrectionLevel` | `'M'` |
| `margin` | `0` |

## Diseños parciales con mergeDesign

Casi nunca necesitas escribir un diseño completo. `mergeDesign()` combina un objeto parcial con los valores por defecto (o con otra base) y **no muta** la entrada:

```ts
import { mergeDesign } from 'vue-qr-studio';

const azul = mergeDesign({
  dots: { type: 'rounded', color: '#1d4ed8', color2: '#06b6d4', gradient: 'linear', rotation: 45 },
  cornersSquare: { type: 'extra-rounded', color: '#1e3a8a' },
});

// Partir de otro diseño en lugar de los valores por defecto:
const conLogo = mergeDesign({ logo: { src: dataUrl } }, azul);
```

El tipo del parámetro es `QrDesignInput`: cada sección es opcional y parcial.

## Colores y degradados

Con `gradient: 'none'` se usa solo `color`. Con `'linear'` o `'radial'` se hace un degradado de `color` a `color2`; `rotation` (en grados) solo afecta al lineal.

```ts
mergeDesign({
  dots: { color: '#db2777', color2: '#f59e0b', gradient: 'radial' },
  background: { color: '#fff7ed' },
});
```

## Esquinas (ojos)

Si `cornersSquare.color` o `cornersDot.color` están vacíos, heredan el relleno de los puntos (incluido el degradado). Pon un color para que sean diferentes:

```ts
mergeDesign({
  dots: { color: '#111827' },
  cornersSquare: { type: 'extra-rounded', color: '#dc2626' },
  cornersDot: { type: 'dot', color: '#dc2626' },
});
```

## Corrección de errores

Define cuánto del QR puede taparse o dañarse sin dejar de leerse:

| Nivel | Recuperación aproximada | Cuándo usarlo |
| --- | --- | --- |
| `L` | 7 % | QR muy pequeños sin logo. |
| `M` | 15 % | Uso general (por defecto). |
| `Q` | 25 % | Superficies que pueden ensuciarse. |
| `H` | 30 % | Con logos grandes o no cuadrados. |

> [!NOTE]
> Más corrección significa más módulos (puntos) y un QR más denso. Úsala cuando la necesites.

## buildQrOptions

Si trabajas directamente con `qr-code-styling`, `buildQrOptions()` traduce un `QrDesign` a sus opciones. Es una función pura, sin DOM:

```ts
import QRCodeStyling from 'qr-code-styling';
import { buildQrOptions, createDefaultDesign } from 'vue-qr-studio/core';

const qr = new QRCodeStyling(buildQrOptions('https://ejemplo.com', createDefaultDesign(), { size: 400, renderer: 'svg' }));
qr.append(document.getElementById('qr')!);
```

> [!WARNING]
> `buildQrOptions` no compone el fondo del logo. Si usas `logo.background`, pasa antes el diseño por `resolveDesign()` (ver [Logo local](#/docs/logo)).
