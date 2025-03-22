<template>
  <footer class="footer bg-dark text-white py-5">
    <div class="container">
      <div class="row">
        <!-- Columna 1: Enlaces importantes -->
        <div class="col-md-3">
          <h5 class="mb-3">Enlaces rápidos</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-white">Inicio</a></li>
            <li><a href="#" class="text-white">Productos</a></li>
            <li><a href="#" class="text-white">Categorías</a></li>
            <li><a href="#" class="text-white">Mi Cuenta</a></li>
            <li><a href="#" class="text-white">Contáctanos</a></li>
          </ul>
        </div>

        <!-- Columna 2: Redes sociales -->
        <div class="col-md-3">
          <h5 class="mb-3">Síguenos</h5>
          <div class="social-icons">
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              class="btn btn-success btn-circle me-2"
            >
              <i class="bi bi-whatsapp"></i>
            </a>
            <a
              href="https://www.instagram.com/tu_usuario"
              target="_blank"
              class="btn btn-danger btn-circle"
            >
              <i class="bi bi-instagram"></i>
            </a>
          </div>
        </div>

        <!-- Columna 3: Suscripción al boletín -->
        <div class="col-md-3">
          <h5 class="mb-3">Suscríbete a nuestro boletín</h5>
          <form @submit.prevent="subscribe">
            <div class="mb-3">
              <input
                v-model="email"
                type="email"
                class="form-control"
                placeholder="Ingresa tu correo"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary w-100">Suscribirse</button>
          </form>
        </div>

        <!-- Columna 4: Información de contacto -->
        <div class="col-md-3">
          <h5 class="mb-3">Contacto</h5>
          <p class="mb-1">Dirección: Calle Ejemplo 123, Ciudad</p>
          <p>Teléfono: +123 456 789</p>
          <p>Email: info@tutienda.com</p>
        </div>
      </div>

      <hr class="my-4" />

      <!-- Derechos de autor -->
      <div class="text-center">
        <p>&copy; 2025 Mi Ecommerce. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

// Función para manejar la suscripción
const subscribe = () => {
  if (email.value) {
    alert(`Gracias por suscribirte con el correo: ${email.value}`)
    email.value = '' // Limpiar el campo
  }
}
</script>

<style scoped>
.footer {
  background-color: #212529;
  color: #fff;
}

.footer h5 {
  font-weight: bold;
}

.footer a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s;
}

.footer a:hover {
  color: #ffc107;
}

.social-icons a {
  font-size: 1.5rem;
  transition: background-color 0.3s;
}

.social-icons a:hover {
  background-color: #28a745;
}

.social-icons .btn {
  padding: 10px;
  font-size: 1.5rem;
}

footer form input {
  background-color: #f8f9fa;
  color: #333;
  border: 1px solid #ccc;
}

footer form button {
  background-color: #007bff;
  border: none;
}

footer form button:hover {
  background-color: #0056b3;
}
</style>
