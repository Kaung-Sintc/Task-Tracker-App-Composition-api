<script setup>

    const emit = defineEmits(['filter'])

    const props = defineProps({
        current: {
            type: String,
            required: true
        }
    })

    const filterTasks = (status) => {
        emit('filter', status)
    }

</script>


<template>
    <nav class="filter-nav">
        <button @click="filterTasks('all')"
                :class="{ active: current === 'all'}">
            All
        </button>

        <button @click="filterTasks('completed')"
            :class="{ active: current === 'completed' }">
            Completed
        </button>

        <button @click="filterTasks('ongoing')" 
            :class="{ active: current === 'ongoing'}">
            Ongoing
        </button>
      </nav>
</template>


<style>
    .filter-nav button {
        background: none;
        border:none;
        color:#bbb;
        outline:none;
        font-size: 13px;
        margin-right:10px;
        text-transform: uppercase;
        cursor:pointer;
    }
    button.active {
        color:black;
        font-weight: bold;
    }
</style>