<script>
export default {
    name: 'AppCarousel',
    data() {
        return {

            jumbotron: [
                'burger_type.jpg',
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
    <div class="container_jumbo">
        <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div v-for="img in jumbotron" :key="img" class="carousel-item active">
                    <img :src="`src/assets/jumbotron/${img}`" class="d-block w-100" alt="...">
                </div>
                <div v-for="img in jumbotron" :key="img" class="carousel-item">
                    <img :src="`src/assets/jumbotron/${img}`" class="d-block w-100" alt="...">
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container_jumbo {

    width: 100vw;
}
</style>