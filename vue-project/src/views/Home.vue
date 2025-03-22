<template>
  <div>
    <!-- Banner de Envíos Gratis Animado -->
    <div class="bg-primary text-white text-center py-2 overflow-hidden position-relative">
      <div class="banner-container">
        <p
          v-for="(message, index) in bannerMessages"
          :key="index"
          class="banner-message"
          :class="{ active: currentBannerIndex === index, 'sliding-out': slidingIndex === index }"
        >
          {{ message }}
        </p>
      </div>
    </div>

    <!-- Menú de Navegación -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white px-3 py-3">
      <div class="container-fluid">
        <!-- Botón hamburguesa (solo móvil) -->
        <button
          class="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Logo/Nombre (centrado en móvil, alineado a la izquierda en desktop) -->
        <a class="navbar-brand fw-bold" href="#">Mi Ecommerce</a>

        <!-- Iconos visibles en móvil (lupa y carrito) -->
        <div class="d-flex d-lg-none align-items-center mobile-icons">
          <i class="bi bi-search me-3"></i>
          <i class="bi bi-cart"></i>
        </div>

        <!-- Menú principal (se colapsa en móvil) -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <!-- Menú de navegación (centrado en desktop) -->
          <ul class="navbar-nav mx-auto">
            <li class="nav-item"><a class="nav-link" href="#">Todos los productos</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Más vendidos</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Categorías</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Sale</a></li>
          </ul>

          <!-- Iconos de desktop (alineados a la derecha) -->
          <div class="d-none d-lg-flex align-items-center gap-4 desktop-icons">
            <i class="bi bi-search"></i>
            <i class="bi bi-person"></i>
            <i class="bi bi-heart"></i>
            <i class="bi bi-cart"></i>
          </div>
        </div>
      </div>
    </nav>

    <!-- Sección de los 3 productos más nuevos (más grandes) -->
    <h2 class="text-center mt-4">Productos más nuevos</h2>
    <div class="container my-5">
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col" v-for="product in latestProducts" :key="product.id">
          <div class="product-card large-card">
            <div class="product-image-container">
              <img :src="product.image" class="product-image" alt="Producto" />
            </div>
            <div class="product-info text-center">
              <h6 class="product-name">{{ product.name }}</h6>
              <p class="product-price">${{ product.price.toLocaleString() }}</p>
              <button class="add-to-cart-btn mt-1">Agregar al carrito</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sección de Productos -->
    <h2 class="text-center mt-4">Ofertas exclusivas</h2>
    <div class="container my-5">
      <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
        <div class="col product-column" v-for="product in products" :key="product.id">
          <div class="product-card">
            <div class="product-image-container">
              <img :src="product.image" class="product-image" alt="Producto" />
            </div>
            <div class="product-info text-center">
              <h6 class="product-name">{{ product.name }}</h6>
              <p class="product-price">${{ product.price.toLocaleString() }}</p>
              <button class="add-to-cart-btn mt-1">Agregar al carrito</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer fijo para móvil -->
    <div class="mobile-footer d-lg-none">
      <div class="mobile-footer-item">
        <i class="bi bi-house"></i>
        <span>Inicio</span>
      </div>
      <div class="mobile-footer-item">
        <i class="bi bi-search"></i>
        <span>Buscar</span>
      </div>
      <div class="mobile-footer-item">
        <i class="bi bi-person"></i>
        <span>Cuenta</span>
      </div>
      <div class="mobile-footer-item">
        <i class="bi bi-cart"></i>
        <span>Carrito</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import api from '../api/api'

export default {
  setup() {
    const products = ref([]) // Productos para la sección general
    const latestProducts = ref([]) // Productos más recientes

    const fetchProducts = async (url = '/products') => {
      try {
        const response = await api.get(url)
        console.log('Productos recibidos:', response.data)
        products.value = response.data.data
      } catch (error) {
        console.error('Error al obtener productos:', error)
      }
    }

    const fetchLatestProducts = async () => {
      try {
        const response = await api.get('/latest-products') // Ruta que acabas de crear
        console.log('Productos más recientes:', response.data)
        latestProducts.value = response.data
      } catch (error) {
        console.error('Error al obtener productos más recientes:', error)
      }
    }

    onMounted(() => {
      fetchProducts()
      fetchLatestProducts() // Llamar a la función para obtener los productos más recientes
    })

    return {
      products,
      latestProducts,
      fetchProducts,
      fetchLatestProducts,
    }
  },
}
</script>

<style>
body {
  background-color: #fff;
  color: #333;
  font-family: Arial, sans-serif;
}

/* Estilos para los productos más grandes */
.product-card.large-card {
  max-width: 100%; /* Las tarjetas grandes ocuparán todo el ancho disponible */
}

.product-image-container {
  padding-top: 80%; /* Puedes ajustar esto para que la imagen ocupe más o menos espacio */
}

.product-card.large-card .product-image {
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card.large-card .product-info {
  padding: 0 15px;
}

.product-card.large-card .product-name {
  font-size: 1rem; /* Nombre más grande */
  font-weight: 600;
}

.product-card.large-card .product-price {
  font-size: 1.1rem; /* Precio más grande */
  font-weight: 600;
}

/* Banner Animado */
.bg-primary {
  background-color: #0d6efd !important;
}

.banner-container {
  position: relative;
  height: 24px;
  overflow: hidden;
}

.banner-message {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  opacity: 0;
  transform: translateX(100%);
  transition: none;
  margin: 0;
}

.banner-message.active {
  opacity: 1;
  transform: translateX(0);
  transition: transform 0.5s ease-out;
}

.banner-message.sliding-out {
  transform: translateX(-100%);
  transition: transform 0.5s ease-in;
}

/* Estilos del Navbar */
.navbar {
  box-shadow: none;
  border-bottom: 1px solid #f0f0f0;
}

.navbar-brand {
  font-size: 1.4rem;
}

.navbar-nav .nav-link {
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
  color: #333;
}

.navbar-nav .nav-link.active {
  font-weight: 600;
}

.desktop-icons i,
.mobile-icons i {
  font-size: 1.2rem;
  cursor: pointer;
}

/* Estilo de productos similar a Ruby Rose */
.product-grid {
  margin: 0 auto;
  gap: 25px;
}
.product-column {
  padding: 0 10px;
}

.product-card {
  margin-bottom: 10px; /* Espacio entre tarjetas en la columna */
  background-color: transparent;
  border: none;
  /* Ajustar el tamaño de la tarjeta, por ejemplo, puedes hacerla más grande */
  max-width: 280px; /* Controla el ancho máximo de las tarjetas */
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.product-image-container {
  position: relative;
  padding-top: 95%; /* Proporción similar a Ruby Rose */
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #f9f9f9;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-image:hover {
  transform: scale(1.03);
}

.product-info {
  padding: 0 5px;
}

.product-name {
  font-size: 0.8rem;
  font-weight: 400;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  color: #666;
}

.product-price {
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.add-to-cart-btn {
  background-color: transparent;
  border: 1px solid #333;
  color: #333;
  font-size: 0.7rem;
  padding: 3px 8px;
  border-radius: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.add-to-cart-btn:hover {
  background-color: #333;
  color: white;
}

/* Footer móvil fijo */
.mobile-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.mobile-footer-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.7rem;
}

.mobile-footer-item i {
  font-size: 1.3rem;
  margin-bottom: 2px;
}

/* Ajustes responsivos */
@media (min-width: 992px) {
  .navbar > .container-fluid {
    display: flex;
    justify-content: flex-start;
  }

  .navbar-brand {
    margin-right: 2rem;
  }

  .navbar-collapse {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
  }

  .navbar-nav {
    margin: 0 auto;
  }

  .product-column {
    padding: 0 15px;
  }
}

@media (max-width: 991px) {
  .navbar-collapse {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 80%;
    background: white;
    z-index: 1050;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .navbar-collapse.show {
    transform: translateX(0);
  }

  body {
    padding-bottom: 60px;
  }
}

/* Para tablet, hacer 3 productos por fila en pantallas medianas */
@media (min-width: 768px) and (max-width: 991px) {
  .col-6.col-md-3 {
    width: 33.333%;
  }
}
</style>
