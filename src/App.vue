<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';


export default {
    components: {
        AppHeader,
        AppFooter,
    }
}
</script>


<template>
    <AppHeader />
    <h1>ciao mondo</h1>
    <div class="container">
        <router-view />
    </div>
    <AppFooter />
</template>


<style lang="scss">
@use './styles/general.scss';
</style>
