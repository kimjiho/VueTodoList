<template>
    <div>
        <label for="exampleFormControlInput1" class="form-label">Todo</label>
        <form class="row g-2">
            <div class="col-auto">
                <input v-model="params.title" type="text" placeholder="Todo List 를 작성하세요." class="form-control">        
            </div>
            <div class="col-sm">
                <button @click="addTodo" class="btn btn-dark">추가</button>
            </div>
        </form>
    </div>
    <hr />

    <div v-for="(item, index) in todoArray" :key="index">
        <div class="card">
            <div class="card-body">
                {{ item.title }}
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';

const params = ref({
    title: ''
});

const todoArray = ref([]);

const emit = defineEmits(['update:title']);

const addTodo = () => {
    const title = params.value.title
    if(title === '') {
        return;
    }

    console.log("Todo added!", params.value.title);
    todoArray.value.push({ title: title, completed: false });
    emit('update:title', '');
    params.value.title = '';

    console.log(todoArray.value);
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