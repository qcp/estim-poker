import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/estim-poker/',
  plugins: [
    vue({
      script: { defineModel: true }
    }),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core'],
      dirs: ['./src/constants', './src/utils']
    }),
    Components({
      dirs: ['./src/components', './src/icons'],
      resolvers: [
        PrimeVueResolver({
          importIcons: true,
          importStyle: true,
          // importTheme: 'lara-light-blue',
          prefix: 'P'
        })
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
