
<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
    name: 'AppCategory',
    data() {
        return {
            store,
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
        }
    },
    mounted() {
        this.getTypes();
    }
}


</script>

<template>
    <div class="container_category">
        <div class="container-fluid">
            <div class="row flex-md-nowrap overflow-x-auto no-scroll">
                <div v-for="restaurantType in this.store.restaurantTypes " class=" p-2 col-md-2 col-sm-12">

                    <router-link class="d-block card_category  " @click='getTypesById(restaurantType.slug)'
                        :to="{ name: 'restaurants', query: { types: restaurantType.slug } }">
                        <img class="w-100" :src="`src/assets/iconcategory/${restaurantType.icon}`" alt="">
                        <span class="text_category d-flex justify-content-center mt-2">{{ restaurantType.name }}</span>
                    </router-link>


                </div>
            </div>

        </div>

    </div>
</template>

<style lang="scss" scoped>
@use '../partials/_variables.scss' as *;

.container_category {
    background-color: white;

    .card_category {
        border-radius: 10px;
        text-decoration: none;

        .text_category {
            color: black;
            text-decoration: none;
        }

        
    }
}
img {
            border-radius: 100%;
            object-fit: cover;
            aspect-ratio: 1/1;

            &:hover {
                box-shadow: 6px 5px 15px 1px #38009996;
            }
        }

.no-scroll::-webkit-scrollbar {
    display: none;
}

//media query
@media(max-width:768px) {
    img {
        object-fit: cover;
        height: 200px;
        border-radius: 10px;

    }
}

//hover </style>