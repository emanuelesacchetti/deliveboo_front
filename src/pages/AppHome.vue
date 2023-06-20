<script>
import AppSearch from '../components/AppSearch.vue';
import AppCategory from '../components/AppCategory.vue';
export default {
    name: 'AppHome',
    components: {
        AppSearch,
        AppCategory
    }
}
</script>


<template>
    <AppSearch />
    <AppCategory />
    <h2><strong>ciao io sono la home page</strong></h2>
</template>


<style></style>