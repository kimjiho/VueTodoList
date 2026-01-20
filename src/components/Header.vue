<script setup>
import { useSettingsThemeStore } from '@/stores/stores'
import { ref } from 'vue'

const settingsThemeStore = useSettingsThemeStore()
const currentTheme = settingsThemeStore.currentTheme
const navClass = currentTheme === 'light' ? ref('navbar bg-body-tertiary navbar-expand-sm') : ref('navbar bg-dark navbar-expand-sm');
const dataBsTheme = currentTheme === 'light' ? ref('light') : ref('dark');

</script>

<template>
    <!-- <nav class="navbar navbar-expand-sm bg-body-tertiary" data-bs-theme="light"> -->
    <nav :class="navClass" :data-bs-theme="dataBsTheme">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Todo</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">                    
                    <router-link to="/" class="nav-link active" aria-current="page">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/settings" class="nav-link">Settings</router-link>
                </li>
            </ul>
        </div>
        </div>
    </nav>
</template>

<style scoped>

</style>