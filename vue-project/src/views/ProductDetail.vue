<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">{{ product.name }}</h1>
    <p>{{ product.description }}</p>
    <p class="font-semibold mt-2">Precio: ${{ product.price }}</p>

    <router-link to="/products" class="mt-4 inline-block px-4 py-2 bg-gray-500 text-white rounded">
      Volver a la lista de productos
    </router-link>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../api/api'

export default {
  setup() {
    const product = ref({})
    const route = useRoute()

    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${route.params.id}`)
        product.value = response.data
      } catch (error) {
        console.error('Error al obtener el producto:', error)
      }
    }

    onMounted(fetchProduct)

    return { product }
  },
}
</script>
