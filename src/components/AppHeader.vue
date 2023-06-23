<script>
import { store } from '../store.js';
import AppCart from './AppCart.vue';

export default {
  name: 'AppHeader',
  components: {
    AppCart,
  },
  data() {
    return {
      store,
    }
  },
  methods: {

  }
}

</script>




<template>
  <nav class="navbar navbar-expand-lg" id="header-nav">
    <div class="container-fluid px-3">
      <router-link :to="{ name: 'home' }">LOGO DELIVEBOO</router-link>
      <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item p-3">
          <a class="btn btn-outline-dark d-block mx-3 p-2 px-4 d-lg-flex align-items-center text-nowrap" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button"
            aria-controls="offcanvasExample">
            <span class=" me-2"> Vai al Carrello </span>
            <i class="fa-solid fa-cart-shopping"></i>
          </a>
        </li>

        <li class="nav-item p-3">
          <!--<router-link :to="{name: laravel}">Lavora con noi</router-link>-->
          <a :href="store.baseUrl" class="btn btn-outline-dark mx-3 text-nowrap p-2 px-4 d-block"> Lavora con noi </a>
        </li>
      </ul>
    </div>
  </nav>

  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
    <AppCart />
  </div>
</template>


<style lang="scss" scoped>
nav {
  position: sticky;
  overflow-y: scroll;
  width: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  background-color: rgba(238, 127, 11, 0.9);

}
</style>