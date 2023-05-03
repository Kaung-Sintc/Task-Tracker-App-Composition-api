<script setup>
import { ref } from 'vue';
import { useTaskStore } from '../store/TaskStore';

const taskStore = useTaskStore()

const title = ref("")
const desc = ref("")

const validationMessage = ref("")

const handleSubmit = async() => {
    if(!title.value.trim() || title.value.length < 3) {
        validationMessage.value = "Title must be at least 3 characters"
    }else {
        validationMessage.value = ""

        const task = {
            title: title.value,
            description: desc.value
        }

        // await fetch("http://localhost:3000/tasks", {
        //     method: 'POST',
        //     headers: { 'Content-type': 'application/json' },
        //     body: JSON.stringify(task)
        // })

        taskStore.add(task)

        title.value = ""
        desc.value = ""

    }
}


</script>

<template>
    <h1>Add Task</h1>
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

        <button class="btn-submit" type="submit">Add</button>
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