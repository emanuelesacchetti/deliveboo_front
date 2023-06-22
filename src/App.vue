<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import SingleRestaurant from './pages/SingleRestaurant.vue';


export default {
    components: {
        AppHeader,
        AppFooter,
        SingleRestaurant
    }
}
</script>


<template>
    <AppHeader />
    <h1>ciao mondo</h1>
    <div class="container">
        <router-view />
    </div>
    <SingleRestaurant></SingleRestaurant>
    <AppFooter />
</template>


<style lang="scss">
@use './styles/general.scss';
</style>
