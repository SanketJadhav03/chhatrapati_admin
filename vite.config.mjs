import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  build: {
    outDir: 'dist',          // Vercel will use this
    emptyOutDir: true,
  },

  css: {
    postcss: {
      plugins: [
        autoprefixer(),
      ],
    },
  },

  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },

  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },

  plugins: [react()],

  resolve: {
    alias: {
      'src': path.resolve(process.cwd(), 'src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },

  server: {
    port: 3000,
  },
})
