<template>
   <div>
      <h1>App Bases</h1>
      <nav v-if="!loadingSession">
        <router-link to="/" v-if="userData">Home</router-link> 
        <router-link to="/login" v-if="!userData">Login</router-link> 
        <router-link to="/register" v-if="!userData">Registro</router-link> 
        <button @click="logoutUser" v-if="userData">Logout</button>
      </nav>
      <div v-else>
         Loading User...
      </div>
      <RouterView/>
   </div>
</template>
<script setup>
   import {useUserStore} from './stores/user.js';
   import { storeToRefs } from 'pinia';
   const userStore=useUserStore();
   const {logoutUser}=userStore;
   const {userData,loadingSession}=storeToRefs(userStore);
</script>


