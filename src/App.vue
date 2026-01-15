<script setup>
import Main from './view/Main.vue';
</script>

<template>
  <header>
    <h1 class="text-center py-2">Vue Todo List</h1>
    <hr />
  </header>

  <main class="background">    
    <Main/>
  </main>
</template>

<style scoped>
.background {
  background-color: #f8f9fa;
  padding: 20px;
}
</style>
