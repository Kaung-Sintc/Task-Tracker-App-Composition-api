import { createRouter, createWebHistory } from "vue-router"
import Home from '../views/Home.vue'
import Edit from '../views/Edit.vue'
import Add from '../views/Add.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path:'/edit/:id',
        name:'edit-task',
        component:Edit,
        props:true
    },
    {
        path: '/task/new',
        name: 'add-task',
        component: Add
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router