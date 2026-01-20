import Settings from '@/view/Settings.vue'
import Todo from '@/view/Todo.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Todo,
        beforeRouteEnter (to, from) {
            console.log('Main from: ', from)
        }
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings
    }
]

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router