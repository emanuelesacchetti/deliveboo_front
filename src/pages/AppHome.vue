<script>
import AppCategory from '../components/AppCategory.vue';


export default {
    name: 'AppHome',
    components: {
        AppCategory,
    }
}
</script>


<template>
    <div class="home-container position-relative">
        <img class="slogan_img position-absolute top-0 left-50 translate-x-middle" src="src/assets/img/slogan.svg" alt="">
        <AppCategory />
    </div>
</template>


<style lang="scss" scoped>
.home-container {
    padding: 50vw 0 5vw;
}

.slogan_img {
    margin-top: 20px;
    width: 100%;
    z-index: 0;
}
</style>