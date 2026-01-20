<template>
    <div class="row">
        <div class="col-12" v-for="(item, index) in posts" :key="index">            
            <div :class="cardClass">
                <div class="card-header">
                    <div class="d-flex">
                        <div class="p-0 flex-fill align-self-center">
                            {{ item.title }}
                        </div>
                        <div class="p-1">
                            <button 
                                class="btn btn-outline-primary" 
                                type="button"
                                @click="$emit('modifyAction', item.id)">
                                수정
                            </button>
                        </div>
                        <div class="p-1">
                            <button 
                                class="btn btn-outline-danger" 
                                type="button" 
                                @click="$emit('deleteAction', item.id)">
                                삭제
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useSettingsThemeStore } from '@/stores/stores';

const settingsThemeStore = useSettingsThemeStore()
const currentTheme = settingsThemeStore.currentTheme
const cardClass = currentTheme === 'light' ? 'card text-bg-light mb-3' : 'card text-bg-dark mb-3';

defineProps({
    posts: {
        type: Array,
        required: true,
    }
})

const emits = defineEmits(['deleteAction', 'modifyAction'])

</script>

<style scoped>

</style>