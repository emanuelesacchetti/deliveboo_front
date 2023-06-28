<script>
export default {
    name: 'AppSearch',

}

</script>

<template>
    <div class="container-fluid d-flex justify-content-center mb-2">
        <!--Search-->
        <router-link :to="{ name: 'restaurants' }">
            <div class="container_img mt-5">
                <img class="img_static my-2 ps-5 " src="src/assets/img/mostra.svg" alt="">
                <img class="img_hover my-2 ps-5" src="src/assets/img/mostrahover.svg" alt="">
            </div>


            <!--  <button class="btn btn-outline-dark border fs-6">Scopri tutti i nostri ristoranti</button>-->

        </router-link>
    </div>
</template>
<style lang="scss" scoped>
@use '../partials/variables.scss' as *;
@use '../partials/mixins.scss';

/*
button {
    @include mixins.primary-btn;

}

button:hover {
    @include mixins.btn-hover;

}

button:active {
    @include mixins.btn-active;
}*/
//.container_img {}


.container_img {
    position: relative;
    transition: all 0.5s ease;
    border: 2px solid $secondary-color;
    border-radius: 20px;



}

.img_hover {
    position: absolute;
    left: 0;
    top: 0;
    filter: opacity(0);
    transition: all 0.5s ease;
}

.img_static {
    transition: all 0.5s ease;
}

.container_img:hover .img_hover {
    filter: opacity(1);


}

.container_img:hover .img_static {
    filter: opacity(0);
    // transition: all 1.0s ease-in-out;

}

.container_img:hover {
    background-color: rgba($color: black, $alpha: 1.0);
    transition: all 0.9s ease;
}
</style>