<template>
    <div class="container  text-center">
        <h1 class="display-1 my-5">Ordine confermato!</h1>
        <h3 class="display-6 mb-5">Ordine N° {{ orderCode }}</h3>
        <p>Riceverai una mail di conferma a breve.</p>
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
    margin-top: 150px;
    height: 50vh;
}
</style>