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
    getImageUrl(img) {
      return new URL(`../assets/img/${img}`, import.meta.url).href;
    }
  }
}

</script>




<template>
  <header>
    <nav class="navbar navbar-expand-sm" id="header-nav">
      <div class="container px-3 h-100">
        <router-link :to="{ name: 'home' }"><img class="logo_img" :src="getImageUrl('logo.svg')" alt=""></router-link>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse w-50" id="navbarSupportedContent">


        <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex">
          <li class="nav-item p-1 py-lg-3">
            <a class="my_btn d-block mx-3 p-2 px-3 align-items-center text-nowrap" data-bs-toggle="offcanvas"
              href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
              <span class=" me-2"> Vai al Carrello </span>
              <i class="fa-solid fa-cart-shopping my_cart"></i>
            </a>
          </li>

          <li class="nav-item p-1 py-lg-3">
            <a :href="store.baseUrl" class="my_btn mx-3 text-nowrap p-2 px-3 d-block"> Lavora con noi </a>
          </li>
        </ul>


      </div>
    </nav>
    <div class="position-relative wave-container">
      <img class="wave_img w-100 position-absolute top-0 start-0 z-1" :src="getImageUrl('wave.png')" alt="">
    </div>
  </header>
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
    <AppCart />
    <button type="button" class="btn-close position-absolute m-3" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
</template>


<style lang="scss" scoped>
@use '../styles/general.scss';
@use '../partials/variables.scss' as *;
@use '../partials/mixins.scss';

nav {
  position: sticky;
  overflow-y: scroll;
  width: 100%;
  top: 0;
  left: 0;
  background-color: $primary-color;

  .logo_img {
    width: 200px;
  }
}


nav::-webkit-scrollbar {
  display: none;
}

a {
  text-decoration: none;
  color: $neutral-color;
}

.my_cart {
  color: $secondary-color;
}

.my_btn {
  @include mixins.primary-btn;
  min-width: 200px;
}

.my_btn:hover {
  @include mixins.btn-hover
}

.my_btn:hover .my_cart {
  color: $neutral-color;
}

.my_btn:active {
  @include mixins.btn-active
}

//mediquery 
@media(max-width:992px) {

  .navbar-expand-sm .navbar-nav {
    flex-direction: column;
  }

  .my_btn {
    text-align: center;
    min-width: 200px;
  }
}

@media(max-width:576px) {
  .nav-item {
    display: flex;
    justify-content: center;
  }
}

.wave_img {
  width: 100%;
  height: 200px;
  transform: rotate(180deg);
  display: block;
  margin-top: -10px;
}
</style>