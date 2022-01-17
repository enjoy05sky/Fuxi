import { createApp } from 'vue'
import App from './App.vue'

window.__POWERED_BY_FUXI__ = true

const app = createApp(App)
window.__fuxi_App__ = app
app.mount('#app')
