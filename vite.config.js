import { createVuePlugin } from 'vite-plugin-vue2'

export default ({ command }) => ({
  plugins: [
    createVuePlugin()
  ],
  base: command === 'serve' ? '' : '/',
  build: {
    manifest: true,
    outDir: 'public',
    rollupOptions: {
      input: 'frontend/app.js',
    },
  },
  server: {
    fs: {
      strict: false,
    }
  }
});