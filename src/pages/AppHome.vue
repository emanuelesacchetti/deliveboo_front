<script>
import AppSearch from '../components/AppSearch.vue';
import AppCategory from '../components/AppCategory.vue';
import AppCarousel from '../components/AppCarousel.vue';
export default {
    name: 'AppHome',
    components: {
        AppSearch,
        AppCategory,
        AppCarousel
    }
}
</script>


<template>
    <AppSearch />
    <AppCarousel />
    <AppCategory />
    <h2><strong>ciao io sono la home page</strong></h2>
</template>


<style></style>