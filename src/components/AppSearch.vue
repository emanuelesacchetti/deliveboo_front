<script>
export default {
    name: 'AppSearch',

}

</script>

<template>
    <div class="container text-center position-absolute start-50 top-50  z-1 translate-middle search">
        <!--Search-->
        <router-link :to="{ name: 'restaurants' }">
            <img src="" alt="">
            <button class="btn btn-outline-dark border fs-6">Scopri tutti i nostri ristoranti</button>

        </router-link>
    </div>
</template>
<style lang="scss" scoped>
/*button {
    background-color: rgb(238, 127, 11);
    color: white;

    &:hover {
        background-color: rgb(253, 165, 0);
        color: white;
    }
}*/
</style>