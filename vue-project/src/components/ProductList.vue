<template>
  <div class="container py-4">
    <!-- Header con barra de búsqueda -->
    <div class="row mb-4 align-items-center">
      <div class="col-lg-6 mb-3 mb-lg-0">
        <h1 class="fw-bold"><span class="text-primary">Catálogo</span> de Productos</h1>
      </div>
      <div class="col-lg-6">
        <div class="input-group">
          <span class="input-group-text bg-white">
            <i class="bi bi-search"></i>
          </span>
          <input type="text" class="form-control" placeholder="Buscar productos..." />
        </div>
      </div>
    </div>

    <!-- Filtros y ordenación -->
    <div class="row mb-4">
      <div class="col-md-8 mb-3 mb-md-0">
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-sm btn-primary rounded-pill">Todos</button>
          <button class="btn btn-sm btn-light rounded-pill">Populares</button>
          <button class="btn btn-sm btn-light rounded-pill">Nuevos</button>
          <button class="btn btn-sm btn-light rounded-pill">Ofertas</button>
        </div>
      </div>
      <div class="col-md-4">
        <select class="form-select">
          <option>Ordenar por: Relevancia</option>
          <option>Precio: Menor a Mayor</option>
          <option>Precio: Mayor a Menor</option>
          <option>Nombre: A-Z</option>
        </select>
      </div>
    </div>

    <!-- Productos -->
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
      <div class="col" v-for="product in products" :key="product.id">
        <div class="card h-100 shadow-sm">
          <div class="position-relative">
            <div class="ratio ratio-4x3 bg-light">
              <!-- Aquí iría la imagen -->
            </div>
            <button class="btn btn-sm btn-light position-absolute top-0 end-0 m-2 rounded-circle">
              <i class="bi bi-heart"></i>
            </button>
            <span class="badge bg-primary position-absolute bottom-0 start-0 m-2">Nuevo</span>
          </div>
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <small class="text-muted">Categoría</small>
              <div>
                <i class="bi bi-star-fill text-warning"></i>
                <small class="ms-1">4.5</small>
              </div>
            </div>
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text text-muted small flex-grow-1">{{ product.description }}</p>
            <div class="d-flex justify-content-between align-items-center mt-2">
              <div>
                <span class="fw-bold text-primary">${{ product.price }}</span>
                <span class="text-muted text-decoration-line-through ms-2"
                  >${{ Math.round(product.price * 1.2) }}</span
                >
              </div>
              <button class="btn btn-primary btn-sm">
                <i class="bi bi-cart me-1"></i> Comprar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Paginación -->
    <nav class="d-flex justify-content-center mt-5">
      <ul class="pagination">
        <li
          v-if="pagination.prev_page_url"
          class="page-item"
          @click="fetchProducts(pagination.prev_page_url)"
        >
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item active"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item disabled"><a class="page-link" href="#">...</a></li>
        <li class="page-item"><a class="page-link" href="#">10</a></li>
        <li
          v-if="pagination.next_page_url"
          class="page-item"
          @click="fetchProducts(pagination.next_page_url)"
        >
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import api from '../api/api'

export default {
  setup() {
    const products = ref([])
    const pagination = ref({
      next_page_url: null,
      prev_page_url: null,
    })

    const fetchProducts = async (url = '/products') => {
      try {
        const response = await api.get(url)
        console.log('Datos recibidos del backend:', response.data)

        products.value = response.data.data
        pagination.value = {
          next_page_url: response.data.next_page_url,
          prev_page_url: response.data.prev_page_url,
        }
      } catch (error) {
        console.error('Error al obtener productos:', error)
      }
    }

    onMounted(fetchProducts)

    return {
      products,
      pagination,
      fetchProducts,
    }
  },
}
</script>
