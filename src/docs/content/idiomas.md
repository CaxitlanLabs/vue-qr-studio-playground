# Idiomas y textos

`<QrDesigner>` incluye textos en **español** (por defecto) e **inglés**.

```vue
<QrDesigner locale="en" />
```

## Sobrescribir textos

La prop `messages` acepta un objeto **parcial**: solo indicas lo que quieres cambiar y el resto se toma del idioma elegido.

```vue
<QrDesigner
  locale="es"
  :messages="{
    title: 'Crea tu QR',
    subtitle: 'Personalízalo y descárgalo gratis',
    actions: { download: 'Bajar' },
    contentTypes: { url: 'Sitio web' },
  }"
/>
```

## Agregar otro idioma

Parte de uno existente y traduce lo que necesites. `QrStudioMessages` te avisa si falta alguna clave:

```ts
import { es, type QrStudioMessages } from 'vue-qr-studio';

export const pt: QrStudioMessages = {
  ...es,
  title: 'Gerador de QR code',
  subtitle: 'Personalize seu QR code com cores, formas e logo.',
  actions: { ...es.actions, download: 'Baixar', copy: 'Copiar imagem' },
  // …
};
```

```vue
<QrDesigner :messages="pt" />
```

## Secciones de textos

| Clave | Contenido |
| --- | --- |
| `title`, `subtitle` | Encabezado. |
| `sections` | Títulos de cada sección (contenido, plantillas, formas…). |
| `fields` | Etiquetas de campos y controles. |
| `contentTypes` | Nombre de cada tipo de contenido. |
| `dotTypes`, `cornerSquareTypes`, `cornerDotTypes` | Nombres de los estilos. |
| `gradientTypes`, `wifiEncryption` | Opciones de degradado y seguridad Wi-Fi. |
| `presets` | Nombre de cada plantilla, por `id`. |
| `logo`, `status`, `actions`, `errors` | Textos del logo, estados, botones y errores. |

## resolveMessages

Combina un idioma con tus cambios fuera del componente:

```ts
import { resolveMessages } from 'vue-qr-studio';

const t = resolveMessages('en', { title: 'My QR' });
t.title;            // 'My QR'
t.actions.download; // 'Download'
```

También se exportan `es`, `en` y `locales` (`{ es, en }`).
