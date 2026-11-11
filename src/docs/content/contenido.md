# Tipos de contenido

Un QR codifica un texto. Para URLs basta con el texto tal cual, pero WhatsApp, Wi-Fi o un email necesitan un formato concreto. `QrContent` describe el contenido de forma estructurada y `encodeContent()` lo convierte en el texto correcto.

<!-- demo:content-encoder -->

## QrContent

```ts
type QrContent =
  | { type: 'url'; url: string }
  | { type: 'text'; text: string }
  | { type: 'whatsapp'; phone: string; message?: string }
  | { type: 'email'; to: string; subject?: string; body?: string }
  | { type: 'phone'; phone: string }
  | { type: 'sms'; phone: string; message?: string }
  | { type: 'wifi'; ssid: string; password?: string; encryption?: 'WPA' | 'WEP' | 'nopass'; hidden?: boolean };
```

## Qué genera cada tipo

| Tipo | Ejemplo de entrada | Texto codificado |
| --- | --- | --- |
| `url` | `{ url: ' https://a.com ' }` | `https://a.com` |
| `text` | `{ text: 'Hola' }` | `Hola` |
| `whatsapp` | `{ phone: '+52 55 1234', message: 'Hola' }` | `https://wa.me/52551234?text=Hola` |
| `email` | `{ to: 'a@b.com', subject: 'Hola mundo' }` | `mailto:a@b.com?subject=Hola%20mundo` |
| `phone` | `{ phone: '+52 55 1234' }` | `tel:+52551234` |
| `sms` | `{ phone: '551234', message: 'Hola' }` | `SMSTO:551234:Hola` |
| `wifi` | `{ ssid: 'Casa', password: 'x;y' }` | `WIFI:T:WPA;S:Casa;P:x\;y;;` |

## Funciones

### encodeContent

```ts
import { encodeContent } from 'vue-qr-studio';

encodeContent({ type: 'wifi', ssid: 'MiCasa', password: 's3cr3t', encryption: 'WPA' });
// "WIFI:T:WPA;S:MiCasa;P:s3cr3t;;"
```

### isContentComplete

Indica si el contenido tiene lo mínimo para ser útil. `QrDesigner` lo usa para habilitar las descargas.

```ts
import { isContentComplete } from 'vue-qr-studio';

isContentComplete({ type: 'url', url: 'https://' });         // false
isContentComplete({ type: 'email', to: 'hola@ejemplo.com' }); // true
```

| Tipo | Regla |
| --- | --- |
| `url` | Tiene esquema (`https://`) y un dominio con punto. |
| `text` | No está vacío. |
| `whatsapp`, `phone`, `sms` | Al menos 6 dígitos. |
| `email` | Formato `algo@dominio.ext`. |
| `wifi` | Tiene SSID. |

### createDefaultContent

Devuelve un contenido vacío del tipo indicado:

```ts
import { createDefaultContent } from 'vue-qr-studio';

createDefaultContent('wifi');
// { type: 'wifi', ssid: '', password: '', encryption: 'WPA', hidden: false }
```

### Utilidades sueltas

| Función | Descripción |
| --- | --- |
| `sanitizePhone(phone, keepPlus?)` | Deja solo dígitos (y el `+` inicial si `keepPlus`). |
| `buildWhatsAppUrl(phone, message?)` | `https://wa.me/…` con el mensaje codificado. |
| `buildMailto(to, subject?, body?)` | Enlace `mailto:` con espacios como `%20`. |
| `buildWifiString(ssid, password?, encryption?, hidden?)` | Formato estándar `WIFI:`. Sin contraseña usa `nopass`. |
| `escapeWifiValue(value)` | Escapa `\ ; , : "` para el formato Wi-Fi. |

> [!TIP]
> En WhatsApp el número debe incluir el código de país, sin el `00` inicial. `+52 55 1234 5678` y `525512345678` funcionan igual.
