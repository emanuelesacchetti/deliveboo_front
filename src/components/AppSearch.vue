<script>
export default {
    name: 'AppSearch',

}

</script>

<template>
    <div class="container_general">
        <!--Search-->
        <router-link :to="{ name: 'restaurants' }">

            <button> Ristoranti</button>

        </router-link>
    </div>
</template>

<style lang="scss" scoped>
.container_general {
    width: 100%;
    display: flex;
    justify-content: center;

    input {
        padding: 6px;
        border: 1px solid black;
        border-radius: 4px;
    }

    button {
        border: 1px solid black;
    }
}
</style>