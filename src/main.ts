import './assets/base.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { definePreset } from '@primevue/themes'

import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'
import AuraPreset from './assets/preset.json'
import App from './App.vue'
import { router } from './plugins/router'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: definePreset(Aura, AuraPreset),
    options: {
      darkModeSelector: '.theme-dark',
    },
  },
  options: {
    prefix: 'p',
  },
})
app.use(ToastService)
app.directive('tooltip', Tooltip)

app.mount('#app')
