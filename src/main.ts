import { createApp } from 'vue'
import PrimeVue from 'primevue/config'

import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'
import App from './App.vue'
import { router } from './plugins/router'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.directive('tooltip', Tooltip)

app.mount('#app')
