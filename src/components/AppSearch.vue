<script>
export default {
    name: 'AppSearch',

}

</script>

<template>
    <div class="container text-center position-absolute start-50 z-1 translate-middle search">
              <!--Search-->
        <router-link :to="{ name: 'restaurants' }">

            <button class="btn btn-lg border">Scopri tutti i nostri ristoranti</button>

        </router-link>
    </div>
</template>

<style lang="scss" scoped>
    .search {
        top: 55vh;
    }
    button {
        background-color: rgb(253, 165, 0);
        color: white;
        
        &:hover{
            background-color: rgb(253, 114, 0);
            color: white;
        }
    }

</style>