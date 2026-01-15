<template>
    <div>
        <label for="titleLabel" class="form-label">Todo</label>
        <!-- <form class="row g-2"> -->
        <div class="row">
            <div class="col-auto">
                <input v-model="params.title" type="text" placeholder="Todo List 를 작성하세요." class="form-control">        
            </div>
            <div class="col-sm">
                <button @click="addTodo" class="btn btn-dark">추가</button>
            </div>
        </div>
    </div>
    <hr />

    <div class="row">
        <div class="col-12" v-for="(item, index) in todoArray" :key="index">
            <div class="card border-primary mb-2">
                <div class="card-body">
                    {{ item.title }}
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import { getTodos, createTodo } from '@/api/todos';

const params = ref({
    title: ''
});

const todoArray = ref([]);

const emit = defineEmits(['update:title']);

// API
const fetchTodos = async () => {
    try {
        const response = await getTodos();
        todoArray.value = response.data;
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

const addTodo = async () => {
    const newTodo = params.value.title
    console.log('addTodo called:', newTodo);

    if(newTodo === '') {
        return;
    }

    params.value.title = newTodo;

    try {
        const response = await createTodo({...params.value, createdAt: Date.now()});
        console.log('Todo created:', response.data);
        fetchTodos()
    } catch (error) {
        console.error('Error creating todo:', error);
        //todo Alert, Toast
    } finally {
        //emit('update:title', '');
        params.value.title = '';
    }
}

// first Call
fetchTodos()

</script>

<style scoped>
input {
    padding: 5px;
}
button {
    padding: 5px 10px;
}
</style>