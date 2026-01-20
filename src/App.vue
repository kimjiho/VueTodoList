<script setup>
import Header from './components/Header.vue';
import Main from './view/Main.vue';
</script>

<template>
  <Header/>
  <div class="back-ground">
    <Main />
  </div>
</template>


<style scoped>
.back-ground {
  background-color: #f8f9fa;
  padding: 20px;
}
</style>
