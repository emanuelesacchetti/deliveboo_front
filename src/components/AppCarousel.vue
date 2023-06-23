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
    <div id="carouselExampleSlidesOnly" class="carousel slide position-relative" data-bs-ride="carousel">
        <div class="carousel-inner w-100">
            <div class="carousel-item active">
                <img src="src/assets/jumbotron/donuts.jpg" class="d-block  dimensione_img" alt="...">
            </div>
            <div class="carousel-item" v-for="img in jumbotron" :key="img">
                <img :src="`src/assets/jumbotron/${img}`" class="d-block  dimensione_img" alt="...">

            </div>
            <AppSearch />
        </div>

    </div>
</template>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.carousel-inner {
    max-height: 70vh;
    background-color: rgb(238, 137, 11);

    .dimensione_img {
        width: 100%;
        object-fit: cover;
    }
}
</style>