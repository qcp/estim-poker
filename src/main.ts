import { createApp } from 'vue'
import { router } from './plugins/router'
import App from './App.vue'
import PrimeVue from 'primevue/config'

import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.directive('tooltip', Tooltip)

app.mount('#app')
