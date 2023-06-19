<script>
    export default {
        name: 'AppHeader',
        methods: {

        }
    }
</script>


<template>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <router-link :to="{name: home}">LOGO DELIVEBOO</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
    </div>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
            <router-link :to="{name: laravel}">Lavora con noi</router-link>
        </li>
      </ul>
    </div>
  
</nav>
</template>


<style lang="scss">
   
</style>