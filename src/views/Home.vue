<template>
  <h1>Este es el Home</h1>
  <p>{{ userData.email }}</p>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="Ingrese URL" v-model="url">
    <button type="submit">Agregar</button>
  </form>
  <p v-if="loadingDoc">Loading docs...</p>
  <ul v-else>
    <li v-for="document in documents" :key="document.id">
      {{document.id}} <br>
      {{ document.name }} <br>
      {{ document.short }} <br>
      <button @click="deleteUrl(document.id)">Eliminar</button>
      <button @click="router.push(`/editar/${document.id}`)">Editar</button>
    </li>
  </ul>
</template>

<script setup>
  import {useRouter} from 'vue-router';
  import {ref} from 'vue';
  import {useUserStore} from '../stores/user.js';
  import { useDatabaseStore } from '../stores/database';
  import {storeToRefs} from 'pinia';
  const userStore=useUserStore();
  const {userData}=storeToRefs(userStore);

  const databaseStore=useDatabaseStore();
  const {getUrls,addUrl,deleteUrl}=databaseStore;
  const {documents,loadingDoc}=storeToRefs(databaseStore);
  const router=useRouter();
  getUrls();

  const url=ref('');
  const handleSubmit=()=>{
    addUrl(url.value)
  }
</script>

<style>

</style>