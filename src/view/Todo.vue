<template>
    <div>
        <label for="titleLabel" class="form-label">투두리스트</label>        
        <div class="row">
            <div class="col-auto">
                <input v-model="newParams.title" type="text" placeholder="Todo List 를 작성하세요." class="form-control">        
            </div>
            <div class="col-auto">
                <button @click="addTodo" class="btn btn-dark">추가</button>
            </div>
        </div>
    </div>
    <hr />

    <div v-if="loading">
        Loading 중...
    </div>

    <div v-else-if="error" message="error.message">
        Error 발생: {{ error.message }}
    </div>

    <template v-else-if="!isExist">
      <p class="text-center py-5 text-muted">게시글이 존재하지 않습니다.</p>
    </template>

    <template v-else>
        <div class="row">
            <div class="col-12" v-for="(item, index) in posts" :key="index">            
                <div :class="cardClass">
                    <div class="card-header">
                        {{ item.title }}
                    </div>
                </div>
            </div>
        </div>
    
        <paging 
            :current-page="params._page" 
            :page-count="pageCount"
            @page="(page) => (params._page = page)"/>
    </template>
</template>

<script setup>
import { computed, ref } from 'vue';
import { getTodos, createTodo } from '@/api/todos';
import { useSettingsThemeStore } from '@/stores/counter'
import paging from '@/components/paging.vue';
import { useAxios } from '@/composables/hooks/useAxios';

const settingsThemeStore = useSettingsThemeStore()
const currentTheme = settingsThemeStore.currentTheme
const cardClass = currentTheme === 'light' ? 'card text-bg-light mb-3' : 'card text-bg-dark mb-3';

const newParams = ref({
    title: ''
});

// const emit = defineEmits(['update:title']);

const params = ref({
  _per_page: 3,
  _page: 1
})

const { totalCount, data: posts, error, loading, response } = useAxios('/todos', { method: 'GET', params })
console.log('response:', response);

const isExist = computed(() => posts.value && posts.value.length > 0)

// pagination
//const totalCount = computed(() => response.data.value.items)
const pageCount = computed(() => Math.ceil(totalCount.value / params.value._per_page))

// add
const addTodo = async () => {

    const newTodo = newParams.value.title
    console.log('addTodo called:', newTodo);

    if(newTodo === '') {
        return;
    }

    newParams.value.title = newTodo;

    try {
        const response = await createTodo({...newParams.value, createdAt: Date.now()});
        console.log('Todo created:', response.data);
        //fetchTodos()
    } catch (error) {
        console.error('Error creating todo:', error);
        //todo Alert, Toast
    } finally {
        //emit('update:title', '');
        newParams.value.title = '';
        params.value._page = 1; // 첫 페이지로 이동
    }
}

</script>

<style scoped>
input {
    padding: 5px;
}
button {
    padding: 5px 10px;
}
</style>