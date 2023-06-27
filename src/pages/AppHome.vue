<script>
import AppCategory from '../components/AppCategory.vue';
import AppCarousel from '../components/AppCarousel.vue';

export default {
    name: 'AppHome',
    components: {
        AppCategory,
        AppCarousel
    }
}
</script>


<template>
    <div class="position-relative">


        <div class="container_wave ">
            <img class="wave_img" src="src/assets/img/wave.png" alt="">
            <img class="slogan_img" src="src/assets/img/slogan.svg" alt="">


        </div>
        <!--<AppCarousel />-->
        <AppCategory />
    </div>
</template>


<style lang="scss" scoped>
.container_wave {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;

    .slogan_img {
        display: block;
        margin: auto;
        width: 60vw;
        margin-top: -20vw;
    }

    .wave_img {
        width: 100%;
        transform: rotate(180deg);
        display: block;
        margin-top: -10px;
    }
}
</style>