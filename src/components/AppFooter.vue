<script>
export default {
    name: 'AppFooter',
    data() {
        return {

        }
    },
    methods: {
        getYear() {
            return new Date().getFullYear()
        }
    }
}
</script>


<template>
    <div>
        <img src="src/assets/img/wave.png" alt="">
    </div>
    <footer class="container_footer py-5 ">
        <div class="container">
            <small class="text-white">&COPY; {{ getYear() }} </small>
        </div>
    </footer>
</template>


<style scoped lang="scss">
@use '../partials/variables' as *;

img {
    width: 100%;
    height: 200px;
}

.container_footer {
    background-color: $primary-color;
}
</style>