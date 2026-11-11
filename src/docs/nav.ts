export interface DocLink {
  slug: string;
  title: string;
}

export interface DocGroup {
  title: string;
  links: DocLink[];
}

/** Orden y agrupación del menú lateral. Cada `slug` corresponde a `content/<slug>.md`. */
export const docGroups: DocGroup[] = [
  {
    title: 'Primeros pasos',
    links: [
      { slug: 'introduccion', title: 'Introducción' },
      { slug: 'instalacion', title: 'Instalación' },
      { slug: 'inicio-rapido', title: 'Inicio rápido' },
    ],
  },
  {
    title: 'Componentes',
    links: [
      { slug: 'qr-designer', title: 'QrDesigner' },
      { slug: 'qr-code-preview', title: 'QrCodePreview' },
      { slug: 'registro-global', title: 'Registro global (plugin)' },
    ],
  },
  {
    title: 'Composables',
    links: [{ slug: 'use-qr-code', title: 'useQrCode' }],
  },
  {
    title: 'Core (sin Vue)',
    links: [
      { slug: 'contenido', title: 'Tipos de contenido' },
      { slug: 'diseno', title: 'Diseño del QR' },
      { slug: 'plantillas', title: 'Plantillas y catálogos' },
      { slug: 'logo', title: 'Logo local' },
      { slug: 'exportar', title: 'Exportar y descargar' },
      { slug: 'idiomas', title: 'Idiomas y textos' },
    ],
  },
  {
    title: 'Guías',
    links: [
      { slug: 'temas', title: 'Temas y estilos' },
      { slug: 'fondo-transparente', title: 'Fondo transparente' },
      { slug: 'guardar-disenos', title: 'Guardar y restaurar diseños' },
      { slug: 'acciones-personalizadas', title: 'Acciones personalizadas' },
    ],
  },
  {
    title: 'Referencia',
    links: [
      { slug: 'tipos', title: 'Tipos TypeScript' },
      { slug: 'faq', title: 'Preguntas frecuentes' },
    ],
  },
];

export const flatDocs: (DocLink & { group: string })[] = docGroups.flatMap((g) =>
  g.links.map((l) => ({ ...l, group: g.title })),
);

export const firstDocSlug = flatDocs[0].slug;
