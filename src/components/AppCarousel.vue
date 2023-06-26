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
.carousel-inner {
    height: 1000px;
    background-color: rgb(238, 137, 11);
}

img {
    object-fit: cover;
    height: 100%;
}

.carousel-item {
    height: 1000px;
}

#carouselExampleSlidesOnly {
    height: 1000px;
}

.container_carousel {
    position: relative;
    height: 100Vh;
}
</style>