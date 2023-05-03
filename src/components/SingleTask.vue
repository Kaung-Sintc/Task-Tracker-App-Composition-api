<script setup>
import { ref } from 'vue'
import { useTaskStore } from '../store/TaskStore'

const taskStore = useTaskStore() // pinia 

const showDescription = ref(false)

const props = defineProps(['task'])

// show or hide description
const toggleDescription = () => {
    showDescription.value = !showDescription.value
}



</script>

<template>
    <div class="task" 
    @click.self="toggleDescription" 
    :class="{ complete: task.complete }"
    >
        <div class="actions">
            <h3 @click="toggleDescription">{{ task.title }}</h3>
            <div class="icons">
                <span 
                @click="taskStore.complete(props.task.id)"
                :class="{ complete: task.complete }"
                class="material-symbols-outlined done">
                    done
                </span>
             
                <router-link :to="{ name: 'edit-task', params: { id: task.id }}">
                    <span class="material-symbols-outlined">
                        edit
                    </span>
                </router-link>
               
                <span class="material-symbols-outlined" 
                        @click="taskStore.delete(props.task.id)"
                >
                    delete
                </span>
            </div>
        </div>
        <div class="description" v-if="showDescription">
            <p>{{ task.description }}</p>
        </div>
      </div>
</template>

<style scoped>
.task {
    background: white;
    margin:20px auto;
    padding:10px 30px;
    border-left:7px solid #fffa6d;
    border-radius:4px;
    box-shadow:1px 2px 2px rgba(0, 0, 0, 0.05);
}

.task.complete {
    border-left: 7px solid #6df8ff;;
}

.actions {
    display:flex;
    justify-content: space-between;
    align-items: center;
    gap:9px;
    cursor:pointer;
}
.icons span.complete {
    background-color: #6df8ff;
    border-radius: 50%;
    color:#000000;
}
.icons span{
    cursor:pointer;
    margin-right:4px;
    font-size: 24px;
    padding:6px;
    color:#4f4d4d;

}
.icons span:hover {
    color:#a2a0a0;
}

h3 {
    cursor:pointer;
    max-width:220px;
    font-weight: 100;
    line-height: 1.6;
}
</style>
