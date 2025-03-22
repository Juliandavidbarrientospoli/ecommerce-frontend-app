import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Importa tu archivo de rutas
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap';

const app = createApp(App)
app.use(router) // Usa el router en la aplicación
app.mount('#app')
