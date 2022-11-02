import { rmSync } from 'fs';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import electron from 'vite-plugin-electron';
import pkg from './package.json';

rmSync('dist', { recursive: true, force: true });
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    electron([
      {
        entry: 'electron/index.ts',
        vite: {
          build: {
            sourcemap: false,
            outDir: 'dist/electron',
          },
        },
      },
      {
        entry: 'electron/preload/index.ts',
        vite: {
          build: {
            sourcemap: false,
            outDir: 'dist/electron/preload',
          },
        },
      },
    ]),
  ],
  server: process.env.VSCODE_DEBUG
    ? {
        host: pkg.debug.env.VITE_DEV_SERVER_HOSTNAME,
        port: pkg.debug.env.VITE_DEV_SERVER_PORT,
      }
    : undefined,
});
