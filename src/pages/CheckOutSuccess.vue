<template>
    <div class="container text-center mx-auto p-1">
        <h1 class="display-1 my-5">Ordine confermato!</h1>
        <h3 class="display-6 mb-5 text-break">Codice ordine: {{ orderCode }}</h3>
        <p>Riceverai una mail di conferma a breve.</p>
        <router-link to="/">
            <button class="btn btn-primary">
                Torna alla Home
            </button>
        </router-link>
    </div>
</template>
<script>
export default {
    name: 'CheckOutSuccess',
    data() {
        return {
        }
    },
    methods: {
        checkPageUrl() {
            if (this.orderCode.length != 32) {
                this.$router.push({ name: 'not-found' });
            }
        }
    },
    props: {
        orderCode: String,
    },
    mounted() {
        this.checkPageUrl();
    }
}
</script>
<style scoped lang="scss">
.container {
    margin: 150px 0 200px;
    min-height: 50vh;
}
</style>