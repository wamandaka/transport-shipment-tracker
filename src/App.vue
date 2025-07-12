<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <Navbar />
  <div class="max-w-[85rem] flex flex-col mx-auto px-4 sm:px-6 lg:px-8">
    <router-view />
  </div>
</template>
