/** Project init — Vite config with @vitejs/plugin-react (ti.md) */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
