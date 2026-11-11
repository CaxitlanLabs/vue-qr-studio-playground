# Temas y estilos

## Claro, oscuro o automático

```vue
<QrDesigner theme="auto" />  <!-- por defecto -->
<QrDesigner theme="light" />
<QrDesigner theme="dark" />
```

Con `theme="auto"` el diseñador usa el modo oscuro cuando:

- un ancestro tiene la clase `.dark` (como en Tailwind con `darkMode: 'class'`), o
- un ancestro tiene `data-theme="dark"`, o
- el sistema prefiere modo oscuro y el `<html>` no tiene `.light` ni `data-theme="light"`.

## Variables CSS

Todos los colores y radios salen de variables definidas en `.qrs`. Sobrescríbelas en tu CSS:

```css
.qrs {
  --qrs-primary: #7c3aed;
  --qrs-primary-soft: rgba(124, 58, 237, 0.12);
  --qrs-radius: 8px;
}
```

<!-- demo:designer-themed -->

| Variable | Uso | Claro | Oscuro |
| --- | --- | --- | --- |
| `--qrs-primary` | Acento: selección, botón principal | `#2563eb` | `#60a5fa` |
| `--qrs-primary-contrast` | Texto sobre el acento | `#ffffff` | `#0b1220` |
| `--qrs-primary-soft` | Fondo de elementos seleccionados | azul 10 % | azul 14 % |
| `--qrs-bg` | Fondo del componente | `transparent` | `transparent` |
| `--qrs-surface` | Tarjetas | `#ffffff` | `#111827` |
| `--qrs-surface-2` | Campos y zonas secundarias | `#f8fafc` | `#1f2937` |
| `--qrs-border` | Bordes | `#e5e7eb` | `#2d3748` |
| `--qrs-text` | Texto principal | `#111827` | `#f3f4f6` |
| `--qrs-muted` | Texto secundario | `#6b7280` | `#9ca3af` |
| `--qrs-success` / `--qrs-warning` / `--qrs-danger` | Estados | verde / ámbar / rojo | — |
| `--qrs-radius` | Radio base | `16px` | — |
| `--qrs-font` | Tipografía | `inherit` | — |

> [!TIP]
> Para aplicar un tema solo a un diseñador, envuélvelo en un contenedor con una clase y define las variables en `.mi-clase .qrs`.

### Variables solo en modo oscuro

```css
.dark .qrs {
  --qrs-primary: #a78bfa;
}
```

## Clases CSS

Todas las clases usan el prefijo `qrs-`, así que no chocan con las tuyas. Las más útiles para ajustes finos:

| Clase | Elemento |
| --- | --- |
| `.qrs` | Contenedor raíz del diseñador. |
| `.qrs-panel` | Panel de configuración. |
| `.qrs-card` | Tarjeta de vista previa. |
| `.qrs-section` | Cada sección (contenido, formas…). |
| `.qrs-btn--primary` | Botón principal de descarga. |
| `.qrs-preview` | Contenedor del QR (también en `<QrCodePreview>`). |

## Con Tailwind

Puedes usar las variables desde clases de Tailwind con valores arbitrarios:

```vue
<div class="[&_.qrs]:[--qrs-primary:#059669]">
  <QrDesigner />
</div>
```
