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
    <body>
        <AppHeader/>
        <div>
            <router-view/>
        </div>
        <AppFooter/>
    </body>
</template>


<style lang="scss">
@use './styles/general.scss';


</style>
