<template>
    <div class="row">
        <div class="col-12" v-for="(item, index) in posts" :key="index">            
            <div :class="cardClass">
                <div class="card-header">
                    <div class="d-flex">
                        <div class="p-2 flex-grow-1 align-self-center" :class="todoArray[index] ? `` : `text-decoration-line-through`">
                            {{ item.title }}
                        </div>
                        <!-- <input class="p-0 flex-fill" type="text" :value="item.title" :style="!displayFlag ? `display:block` : `display:none`"/> -->
                        <div class="p-2">
                            <button 
                                class="btn btn-outline-primary" 
                                type="button"
                                @click="clickComplete(index)">
                                완료
                            </button>
                        </div>
                        <div class="p-2">
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
import { onMounted, ref } from 'vue';

const settingsThemeStore = useSettingsThemeStore()
const currentTheme = settingsThemeStore.currentTheme
const cardClass = currentTheme === 'light' ? 'card text-bg-light mb-3' : 'card text-bg-dark mb-3';
const todoArray = ref([])

const props = defineProps({
    posts: {
        type: Array,
        required: true,
    }
})

const emits = defineEmits(['deleteAction', 'modifyAction'])

const clickComplete = (idx) => {
    console.log('clickComplete', idx, todoArray.value[idx])
    todoArray.value[idx] = !todoArray.value[idx]
}

onMounted(() => {
    todoArray.value.length = props.posts.length
    for (let index = 0; index < props.posts.length; index++) {
        todoArray.value[index] = true
        
    }
    console.log('todoArray length', todoArray.value.length)
})

</script>

<style scoped>

</style>