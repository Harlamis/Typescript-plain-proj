import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Typescript-plain-proj/',
  server: {
    host: '0.0.0.0',
    port: 9000,
    open: false,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
});
