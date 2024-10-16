import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'
import { createApp } from 'vue'

import App from './App.vue'
import AuraPreset from './assets/preset.json'
import { router } from './plugins/router'
import './assets/base.css'
import 'primeicons/primeicons.css'

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
