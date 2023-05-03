<script setup>

import { ref, onMounted } from 'vue'
import router from '../router'
import { useTaskStore } from '../store/TaskStore'
import { storeToRefs } from 'pinia'

const taskStore = useTaskStore()
const { getTaskById } = storeToRefs(taskStore)

const props = defineProps(['id'])

   
const title = ref("")
const desc = ref("")
const validationMessage = ref("")


onMounted(() => {
    fetch(taskStore.url + props.id)
        .then(res => res.json())
        .then((task) => {
            title.value = task.title
            desc.value = task.description
        })
})


const handleSubmit = async () => {
    // validation
    if(!title.value.trim() || title.value.length < 3) {
        validationMessage.value = "Title must be at least 3 characters"
    }else {
        validationMessage.value = ""

        // task to update
        let task = {
            id: props.id,
            title: title.value,
            description: desc.value
        }

        taskStore.edit(task)

        // redirect
        router.push({
            name: 'home'
        })

    }
}

</script>

<template>
    <h1>Edit Task</h1>
    <form action="#" method="POST" @submit.prevent="handleSubmit">
        <div>
            <label for="title">Title</label>
            <input type="text" id="title" v-model="title">
            <span class="error" v-if="validationMessage">
                {{ validationMessage }}
            </span>
        </div>
        <div>
            <label for="desc">Description (optional)</label>
            <textarea id="desc" cols="30" rows="6" v-model="desc"></textarea>
        </div>

        <button class="btn-submit" type="submit">Edit</button>
    </form>
</template>

<style scoped>
    form {
        background-color: white;
        margin:40px auto;
        padding:20px;
        display:flex;
        flex-direction:column;
        justify-content: center;
        box-shadow:0px 0px 0px 3px rgba(0, 0, 0, 0.1);
        border-radius: 7px;

    }
    form div {
        margin-bottom:20px;
        display:flex;
        flex-direction:column;
        gap:4px;
    }
    label {
        display:block;
    }
    input {
        height:24px;
        outline:none;
        border:none;
        border-bottom:2px solid #aaa;
    }
    form button {
        width:100px;
        height:40px;
        border:none;
        background-color: #4ed3ff;
        color:white;
        font-size: 14px;
        border-radius:6px;
        cursor:pointer;
    }
    form button:hover {
        background-color: #00befe;

    }
    textarea {
        outline:none;
    }
</style>