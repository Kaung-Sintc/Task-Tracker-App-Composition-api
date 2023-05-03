import { defineStore } from 'pinia'
import Swal from 'sweetalert2'


export const useTaskStore = defineStore('Task', {
    state: () => ({
        tasks: [],
        task: null,
        loading: false,
        url: 'http://localhost:3000/tasks/'
    }),
    
    getters:{
        getTaskById: (state) => {
            return (taskId) => state.tasks.find(task => task.id === taskId) 
        },
        completeTasks: (state) => {
            return state.tasks.filter(task => task.complete)
        },
        ongoingTasks: (state) => {
            return state.tasks.filter(task => ! task.complete)
        }
    },

    actions: {
        // get all tasks
        async getTasks() {
            let res = await fetch(this.url)
            let data = await res.json()
            this.tasks = data
        },

        // get single task
        async getTask(id) {
            const task = this.tasks.find(task => task.id === id)

            this.task = task
        },

        // add new task
        async add(task) {
            this.tasks.push({ id: this.tasks.length + 1, ...task })

            await fetch(this.url, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(task)
            })
        },

        // toggle complete
        async complete(id) {
            const task = this.tasks.find(task => task.id === id)
            task.complete = !task.complete

            await fetch(this.url + id, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    complete: task.complete
                })
            })
        },

        async edit(task) {

            await fetch(this.url + task.id, {
                method: 'PATCH',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(task)
            })
        },

        // delete task
        async delete(id) {

             // pop-up with sweet alert
             Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async(result) => {
                if (result.isConfirmed) {
                    
                    // delete task with try catch
                    try {
                        await fetch(this.url + id, { method: 'DELETE' })
                    }catch(e) {
                        console.log(e.message)
                    }
                    // remove task from view
                    this.tasks = this.tasks.filter(task => task.id !== id)

                // pop-up again
                Swal.fire(
                    'Deleted!',
                    'Your task has been deleted.',
                    'success'
                )
                }
            })

        }
    },
})