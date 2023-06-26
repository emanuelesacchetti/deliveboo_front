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
        <AppCarousel />
        <AppCategory />
    </div>
</template>


<style lang="scss" scoped></style>