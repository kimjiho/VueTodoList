<template>
    <nav aria-label="...">
        <ul class="pagination pagination-sm justify-content-center">
            <li v-for="page in pageCount" :key="page" :class="{ active: page === currentPage }">
                <a class="page-link" href="#" @click.prevent="$emit('page', page)">{{ page }}</a>
            </li>
        </ul>
    </nav>
</template>

<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
})

defineEmits(['page'])
</script>