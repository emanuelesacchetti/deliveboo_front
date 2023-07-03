
<script>
import axios from 'axios';
import { store } from '../store.js';
import AppSearch from './AppSearch.vue';

export default {
    name: 'AppCategory',
    components: {
        AppSearch,
    },
    data() {
        return {
            store,
            scrollDots: 0,
        }
    },
    methods: {
        //funzione per prendere dati di tipi di ristoranti
        getTypes() {
            axios.get(`${this.store.baseUrl}/api/types`)
                .then(response => {
                    this.store.restaurantTypes = response.data.results;
                    console.log(response);
                })
        },
        //funzione per prendere dati per singolo tipo di categoria
        getTypesById(slug) {
            axios.get(`${this.store.baseUrl}/api/restaurants?types=${slug}`)
                .then(response => {
                    this.store.restaurantList = response.data.results;
                    console.log(response);
                })
        },
        scroll(direction) {
            const categoryWindow = document.getElementById('category-window');
            if (direction == 'left' && categoryWindow.scrollLeft > 0) {
                categoryWindow.scroll({
                    top: 0,
                    left: categoryWindow.scrollLeft -= (window.innerWidth - 250),
                    behavior: "smooth",
                });
            } else if (direction == 'right' && categoryWindow.scrollLeft < categoryWindow.scrollWidth) {
                categoryWindow.scroll({
                    top: 0,
                    left: categoryWindow.scrollLeft += (window.innerWidth - 250),
                    behavior: "smooth",
                });

            }
        }
    },
    computed: {
        scrollDots() {
            const categoryWindow = document.getElementById('category-window');
            if (categoryWindow)
                return (window.innerWidth / categoryWindow.scrollWidth)
        }
    },
    mounted() {
        this.getTypes();
    }
}


</script>

<template>
    <div class="container-fluid">
        <AppSearch />
    </div>
    <div class="text-center alternative-choice">
        <br>
        oppure scegli una categoria</div>
        <br>
    <div class="container_category">
        <div class="container position-relative">

            <img @click="scroll('left')" class="position-absolute arrow_left d-none d-md-block"
                src="src/assets/img/arrowleft.svg" alt="">
            <div class="row flex-md-nowrap overflow-x-auto no-scroll row-cols-1 row-cols-md-4 row-cols-lg-6 row-cols-xl-8"
                id="category-window">
                <div v-for="restaurantType in store.restaurantTypes " class="z-1 p-2 col h-100">
                    <router-link class="d-block card_category position-relative" @click='getTypesById(restaurantType.slug)'
                        :to="{ name: 'restaurants', query: { types: restaurantType.slug } }">
                        <img class="w-100 my_img" :src="`src/assets/iconcategory/${restaurantType.icon}`" alt="">
                        <span class="text_category d-flex justify-content-center mt-2 fw-bold">{{ restaurantType.name
                        }}</span>
                    </router-link>
                </div>
            </div>
            <img @click="scroll('right')" class="position-absolute arrow_right d-none d-md-block"
                src="src/assets/img/arrowright.svg" alt="">
        </div>
        <div>
            <span v-for="scrollDot in scrollDots" class="p-2 rounded-circle bg-secondary">

            </span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../partials/_variables.scss' as *;

.alternative-choice{
    color: $primary-color;
            //text-transform: uppercase;
            text-shadow: 1px 1px 0px $secondary-color;
}
.container_category {


    .card_category {
        border-radius: 10px;
        text-decoration: none;

        .text_category {
            color: black;
            text-decoration: none;
            color: $primary-color;
            text-transform: uppercase;
            text-shadow: 1px 1px 0px $secondary-color;
        }


    }
}

.my_img {
    border-radius: 100%;
    object-fit: cover;
    aspect-ratio: 1/1;
    border: 1px solid $primary-color;
    transition: all 0.15s linear;

    &:hover {
        box-shadow: 6px 5px 15px 1px #38009996;
        border: 3px solid $primary-color;
    }
}



.no-scroll::-webkit-scrollbar {
    display: none;
}

.container_check {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -20px;
}

.arrow_left {
    z-index: 50;
    top: 50px;
    left: -45px;
    width: 80px;
    cursor: pointer;
}

.arrow_right {
    z-index: 50;
    top: 50px;
    right: -45px;
    width: 80px;
    cursor: pointer;
}

//media query
@media(max-width:768px) {
    .my_img {
        object-fit: cover;
        height: 250px;
        border-radius: 10px;

    }
}



//hover </style>