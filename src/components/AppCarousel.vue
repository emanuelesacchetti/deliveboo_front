<script>
import AppSearch from '../components/AppSearch.vue';

export default {
    name: 'AppCarousel',
    components: {
        AppSearch,
    },
    data() {
        return {

            jumbotron: [
                'burger.jpg',
                'pizza.jpg',
                'sushi.jpg',
                'donuts.jpg',
                'fruit.jpg'
            ]
        }
    }
}
</script>

<template>
    <div class="container_carousel">
        <div id="carouselExampleSlidesOnly" class="carousel slide position-relative carousel-fade" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="src/assets/jumbotron/test.png" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item" v-for="img in jumbotron" :key="img">
                    <img :src="`src/assets/jumbotron/${img}`" class="d-block w-100" alt="...">

                </div>

            </div>

        </div>
        <AppSearch />
    </div>
</template>

<style lang="scss" scoped>
#carouselExampleSlidesOnly {
    height: 100%;
}

.carousel-item {
    height: 100%;
}

.carousel-inner {
    height: 100%;
    //background-color: rgb(238, 137, 11);
}

img {
    height: 100%;
    object-fit: cover;
}

.container_carousel {
    position: relative;
    height: 100vh;
}
</style>