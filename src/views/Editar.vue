<template>
  <div>
    <h1>Editar</h1>
    <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="Ingrese URL" v-model="url">
        <button type="submit">Actualizar</button>
     </form>
  </div>
</template>

<script setup>
    import {useRoute} from 'vue-router';
    import {ref,onMounted} from 'vue';
    import {useDatabaseStore} from '../stores/database.js';
    const databaseStore=useDatabaseStore();
    const {readUrl,updateUrl}=databaseStore;
    const route=useRoute();
    // console.log(route.params.id);

    const url=ref('');
    const handleSubmit=()=>{
        //Aquí irian las validaciones para nuestra URL...
        updateUrl(route.params.id,url.value)
    }

    onMounted(async()=>{
        url.value=await readUrl(route.params.id);
    });
</script>

<style>

</style>