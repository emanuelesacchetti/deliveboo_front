<script>
import AppSearch from '../components/AppSearch.vue';

export default {
    name: 'AppCarousel',
    components: {
        AppSearch
    },
    data() {
        return {

            jumbotron: [

                'madonna.jpg',
                'pizza.jpg',
                'sushi.jpg',
                'vegetarian.jpg'
            ]
        }
    }
}
</script>

<template>
    <div id="carouselExampleSlidesOnly" class="carousel slide position-relative" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="src/assets/jumbotron/burger_type.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item" v-for="img in jumbotron" :key="img">
                <img :src="`src/assets/jumbotron/${img}`" class="d-block w-100" alt="...">
            </div>
        </div>
        <AppSearch />
    </div>
</template>

<style lang="scss" scoped>
    .carousel-inner{
        height: 60vh;
    }
</style>