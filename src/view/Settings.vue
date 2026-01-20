<script setup>
import { useSettingsThemeStore } from '@/stores/counter'

const settingsThemeStore = useSettingsThemeStore()
const currentTheme = settingsThemeStore.theme
const checked = currentTheme === 'light' ? true : false;

</script>

<template>
    <div>
        <h2>설정</h2>
        <hr />

        <div>            
            <!-- <button @click="settingsThemeStore.toggleTheme()">테마 변경</button> -->

            <div class="form-check form-switch">
                <input 
                    class="form-check-input" 
                    type="checkbox" 
                    role="switch"
                    id="switchCheckChecked"
                    :checked="checked"
                    @change="settingsThemeStore.toggleTheme()">
                <label class="form-check-label" for="switchCheckChecked">
                    <p>현재 테마: {{ settingsThemeStore.theme }}</p>
                </label>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>