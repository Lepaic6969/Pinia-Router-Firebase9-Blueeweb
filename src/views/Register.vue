<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="handleSubmit">
      <input type="email" placeholder="Ingrese email" v-model.trim="email">
      <input type="password" placeholder="Ingrese contraseña" v-model.trim="password">
      <button type="submit" :disabled="loadingUser">Crear Usuario</button>
    </form>
   
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {storeToRefs} from 'pinia';
//Esto es para hacer el push a otra ruta
// import {useRouter} from 'vue-router';

//Traemos nuestra acción desde Pinia.
import {useUserStore} from '../stores/user.js';
const userStore=useUserStore();
const {registerUser}=userStore;
const {loadingUser}=storeToRefs(userStore);
// const router=useRouter();



const email=ref('caamilo9517@gmail.com');
const password=ref('');
  const handleSubmit=async ()=>{
    if(!email.value || !password.value){
      return alert ("Recuerde Ingresar todos los campos.")
    }
    if(password.value.length<6){
      return alert ("La contraseña debe tener al menos 6 caracteres.")
    }
    // console.log(email.value);
    // console.log(password.value);
    await registerUser(email.value,password.value);
    // router.push('/'); 
  }

</script>

<style>

</style>