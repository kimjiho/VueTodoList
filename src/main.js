import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './route/index.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')

import 'bootstrap/dist/js/bootstrap.bundle.min.js'