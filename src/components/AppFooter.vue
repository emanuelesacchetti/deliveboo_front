<script>
export default {
    name: 'AppFooter',
    data() {
        return {
            developers: {
                
            }
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
            <div class="row">
                <div class="col-3">
                    <small>Emanuele Sacchetti</small>
                </div>
                <div class="col-3">
                    
                </div>
                <div class="col-3">
                    
                </div>
            </div>
            <small class="text-white">&COPY; {{ getYear() }} </small>

        </div>
    </footer>
</template>


<style scoped lang="scss">
@use '../partials/variables.scss' as *;

img {
    width: 100%;
    height: 200px;
}

.container_footer {
    background-color: $primary-color;
}
</style>