<script setup>

import { onMounted, computed, ref } from 'vue'
import SingleTask from '../components/SingleTask.vue'
import { useTaskStore } from '../store/TaskStore'
import { storeToRefs } from 'pinia'
import FilterNav from '../components/FilterNav.vue'

const taskStore = useTaskStore() 
const currentStatus = ref('all')

const { tasks, completeTasks, ongoingTasks } = storeToRefs(taskStore) // destructing state using storeToRefs()

// mounted
onMounted(() => {
    taskStore.getTasks()
})

const filteredTasks = computed(() => {
   if(currentStatus.value === "all") {
    return tasks
   }else if(currentStatus.value === "completed") {
    return completeTasks()
   }
})


</script>

<template>

    <FilterNav :current="currentStatus" @filter="currentStatus = $event" />

    <div v-if="currentStatus === 'all'">

        <div v-for="task in tasks" :key="task.id">
            <SingleTask :task="task" />
        </div>
        
    </div>

    <div v-if="currentStatus === 'completed'">

        <div v-for="task in completeTasks" :key="task.id">
            <SingleTask :task="task" />
        </div>

    </div>

    <div v-if="currentStatus === 'ongoing'">

        <div v-for="task in ongoingTasks" :key="task.id">
            <SingleTask :task="task" />
        </div>

    </div>

    
</template>