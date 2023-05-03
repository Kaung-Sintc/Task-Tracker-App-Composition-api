<template>
    <nav>
      <router-link :to="{ name: 'home' }">Tasks</router-link>
      <router-link :to="{ name: 'add-task'}" >Add Task</router-link>
    </nav>
  </template>
  
<style scoped>
    nav {
        text-align:center;
        margin:40px auto;
    }
    nav a {
        text-decoration:none;
        color:#112;
        font-size: 20px;
        margin-left:20px;
        padding:10px;
        opacity:0.6;
    }
    a.router-link-active {
        opacity:1;
        border-bottom: 5px solid #040404;
        padding:10px;
    }
</style>