<template>
  <h1>Este es el Home</h1>
  <p>{{ userData.email }}</p>
  <!-- <p>{{ userData.uid }}</p> -->
</template>

<script setup>
  import {useUserStore} from '../stores/user.js';
  import {storeToRefs} from 'pinia';
  const userStore=useUserStore();
  const {userData}=storeToRefs(userStore);
</script>

<style>

</style>