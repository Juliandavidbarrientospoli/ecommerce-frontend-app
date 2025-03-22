<script setup>
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div id="app">
    <!-- Aquí se renderiza la vista correspondiente según la ruta -->
    <router-view />

    <!-- Footer: Siempre visible en todas las vistas -->
    <Footer />
  </div>
</template>
