<script>
    import AppHeader from './components/AppHeader.vue';
    import AppFooter from './components/AppFooter.vue';
    import AppCart from './components/AppCart.vue';

    export default {
        components: {
            AppHeader,
            AppFooter,
            AppCart,
        }
    }
</script>


<template>
    
    <AppHeader/>
    <h1>ciao mondo</h1>
    <div class="container">
        <AppCart></AppCart>
        <router-view/>
    </div>
    <AppFooter/>
</template>


<style lang="scss">
    @use './styles/general.scss';


</style>
