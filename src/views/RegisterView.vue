<template>
  <div>
    <h1>Registro</h1>
    <form @submit.prevent="register">
      <input v-model="name" type="text" placeholder="Nombre" />
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Contraseña" />
      <input v-model="password_confirmation" type="password" placeholder="Confirmar Contraseña" />
      <button type="submit">Registrarse</button>
    </form>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  },
  methods: {
    async register() {
      try {
        const response = await api.post('/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        });
        console.log('Usuario registrado con éxito:', response.data);
      } catch (error) {
        console.error('Error al registrar usuario:', error.response.data);
      }
    }
  }
}
</script>
