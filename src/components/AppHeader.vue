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
    <div class="container-fluid">
      <router-link :to="{ name: 'home' }">LOGO DELIVEBOO</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="btn btn-primary nav-link" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button"
            aria-controls="offcanvasExample">
            <i class="fa-solid fa-cart-shopping"></i>
          </a>
        </li>

        <li class="nav-item">
          <!--<router-link :to="{name: laravel}">Lavora con noi</router-link>-->
          <a :href="store.baseUrl"> lavora con noi</a>
        </li>
      </ul>
    </div>
  </nav>

  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
    <AppCart/>
  </div>
</template>


<style lang="scss" scoped>
nav {
  background-color: rgba(238, 127, 11, 1);

}
</style>