<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <input type="email" placeholder="Ingrese email" v-model.trim="email">
      <input type="password" placeholder="Ingrese contraseña" v-model.trim="password">
      <button type="submit" :disabled="loadingUser">Acceso</button>
    </form>
   
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {storeToRefs} from 'pinia';

//Para el push hacia el home
// import {useRouter} from 'vue-router';
//Traemos nuestra acción desde Pinia.
import {useUserStore} from '../stores/user.js';
const userStore=useUserStore();
const {loginUser}=userStore;
const {loadingUser}=storeToRefs(userStore);
// const router=useRouter();


const email=ref('caamilo9517@gmail.com');
const password=ref('Abc1234567890');
  const handleSubmit=async()=>{
    if(!email.value || !password.value){
      return alert ("Recuerde Ingresar todos los campos.")
    }
    if(password.value.length<6){
      return alert ("La contraseña debe tener al menos 6 caracteres.")
    }
    // console.log(email.value);
    // console.log(password.value);
    await loginUser(email.value,password.value);
    // router.push('/');
  }

</script>

<style>

</style>