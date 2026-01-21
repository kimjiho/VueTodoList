<template>    
    <Loading v-if="loading" />

    <Error v-else-if="error" :message="error.message"/>    

    <template v-else-if="!isExist">
      <p class="text-center py-5 text-muted">게시글이 존재하지 않습니다.</p>
    </template>

    <template v-else>
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

        <CardItem :posts="posts" @delete-action="deleteAction" @modify-action="modifyAction"/>

        <Paging 
            :current-page="params._page" 
            :page-count="pageCount"
            @page="(page) => (params._page = page)"/>
    </template>
</template>

<script setup>
import { computed, ref } from 'vue';
import { createTodo, deleteTodo } from '@/api/todos';
import { useAxios } from '@/composables/hooks/useAxios';
import Paging from '@/components/Paging.vue';
import Loading from '@/components/Loading.vue';
import CardItem from '@/components/CardItem.vue';
import Error from '@/components/Error.vue';

const newParams = ref({
    title: ''
});

// const emit = defineEmits(['update:title']);

const params = ref({
  _per_page: 3,
  _page: 1,
  _sort: '-createdAt'
})

const { totalCount, data: posts, error, loading, response, execute } = useAxios('/todos', { method: 'GET', params })
console.log('response:', response);

const isExist = computed(() => posts.value && posts.value.length > 0)

// pagination
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
    } catch (error) {
        console.error('Error creating todo:', error);        
    } finally {        
        newParams.value.title = '';
        params.value._page = 1; // 첫 페이지로 이동
        execute()
    }
}

const deleteAction = async (id) => {
    if(!confirm('삭제 하시겠습니까?')) return

    try {
        const response = await deleteTodo(id)
        console.log('Todo delete:', response.data);
    } catch (error) {
        console.error('Error delete todo:', error);        
    } finally {
        execute()
    }
}

const modifyAction = async (id) => {
    alert('준비중입니다.')
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