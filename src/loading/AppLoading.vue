<script>
import { store } from '../store.js'
export default {
    name: 'ThisLoading',
    data() {
        return {
            store
        }

    },
    created() {
        setTimeout(firstload => {
            this.store.loading = false
        }, 3500);

    }

}
</script>

<template>
    <div class="load" v-if="store.loading">
        <img src="src/assets/img/logo.svg" alt="">

    </div>
</template>

<style lang="scss" scoped>
@use '../partials/variables.scss' as *;
@use '../partials/mixins.scss';

.load {
    background-color: $tertiarycolor;
    position: fixed;
    z-index: 150;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;


    img {
        animation: animationdeliveboo 3.5s ease-in-out;
        width: 10vw;
        will-change: transform;
    }
}

@keyframes animationdeliveboo {


    0% {
        transform: scale(1);
    }


    100% {
        transform: scale(10);
    }





}
</style>