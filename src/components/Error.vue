<template>
    <div class="h4 text-bg-danger p-3">{{ message }}</div>    
</template>

<script setup>
defineProps({
    message: {
        type: String,
        required: true,
        default: '에러가 발생 했습니다. 다시 시도해 주세요.'
    }
})
</script>

<style scoped>

</style>