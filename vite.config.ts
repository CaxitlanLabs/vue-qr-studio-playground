import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  // En GitHub Pages el sitio vive en /vue-qr-studio-playground/ (lo define el workflow).
  base: process.env.BASE_PATH ?? '/',
  plugins: [vue()],
  resolve: {
    // La librería está enlazada (link:) y tiene su propio node_modules/vue;
    // forzamos una sola copia de Vue para evitar errores de reactividad.
    dedupe: ['vue'],
  },
  optimizeDeps: {
    // No pre-empaquetar la librería enlazada: así `pnpm dev` en la librería
    // se refleja al recargar el playground.
    exclude: ['vue-qr-studio'],
    include: ['qr-code-styling'],
  },
  server: { port: 5180 },
});
