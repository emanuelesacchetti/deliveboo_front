<script>
import AppCategory from '../components/AppCategory.vue';
import AppCarousel from '../components/AppCarousel.vue';
import AppMain from '../components/AppMain.vue';
export default {
    name: 'AppHome',
    components: {
        AppMain,
        AppCategory,
        AppCarousel
    }
}
</script>


<template>
    <div class="position-relative">
        <AppCarousel />
        <AppCategory />
    </div>
    <AppMain />
</template>


<style lang="scss" scoped></style>