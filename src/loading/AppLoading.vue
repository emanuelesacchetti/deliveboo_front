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
        }, 2000);

    }

}
</script>

<template>
    <div class="load" v-if="store.loading">
        <img src="src/assets/img/slogan.png" alt="">

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
        animation-name: animationdeliveboo;
        animation-duration: 2.5s;
        animation-timing-function: linear;

    }
}

@keyframes animationdeliveboo {
    0% {
        width: 0px;
    }

    25% {
        width: 600px;
    }

    100% {
        width: 500px;
    }

    /* 5% {
        width: 10px;
    }

    10% {
        width: 900px;
    }

    15% {
        width: 850px;
    }

    20% {
        width: 800px;
    }

    25% {
        width: 750px;
    }

    30% {
        width: 600px;
    }

    35% {
        width: 550px;
    }

    40% {
        width: 500px;
    }

    45% {
        width: 450px;
    }

    50% {
        width: 400px;
    }

    55% {
        width: 450px;
    }

    60% {
        width: 500px;
    }

    65% {
        width: 550px;
    }

    70% {
        width: 600px;
    }

    75% {
        width: 650px;
    }

    80% {
        width: 700px;
    }

    85% {
        width: 750px;
    }

    90% {
        width: 800px;
    }

    95% {
        width: 700px;
    }

    100% {
        width: 700px;
    }*/

}
</style>