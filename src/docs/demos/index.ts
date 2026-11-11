import { defineAsyncComponent, type Component } from 'vue';

/** Demos que se insertan en el Markdown con `<!-- demo:nombre -->`. */
export const demos: Record<string, Component> = {
  'designer-basic': defineAsyncComponent(() => import('./DesignerBasic.vue')),
  'designer-themed': defineAsyncComponent(() => import('./DesignerThemed.vue')),
  'designer-actions': defineAsyncComponent(() => import('./DesignerActions.vue')),
  'preview-basic': defineAsyncComponent(() => import('./PreviewBasic.vue')),
  'preview-presets': defineAsyncComponent(() => import('./PreviewPresets.vue')),
  'use-qr-code': defineAsyncComponent(() => import('./UseQrCodeDemo.vue')),
  'content-encoder': defineAsyncComponent(() => import('./ContentEncoder.vue')),
  'transparent': defineAsyncComponent(() => import('./TransparentDemo.vue')),
  'save-restore': defineAsyncComponent(() => import('./SaveRestore.vue')),
};
