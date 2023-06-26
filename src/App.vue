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
    <body class="min-vh-100">
        <AppHeader class="vh-15"/>
        <div class="vh-70">
            <router-view/>
        </div>
        <AppFooter class="vh-15"/>
    </body>
</template>


<style lang="scss">
@use './styles/general.scss';

.vh-15{
    min-height: 15vh;
}
.vh-70 {
    min-height: 85vh;
}
</style>
