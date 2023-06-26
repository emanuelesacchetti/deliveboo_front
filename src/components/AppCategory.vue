
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
        <div class="container">
            <div class="row row-cols-md-6 row-cols-1 ">
                <div v-for="restaurantType in this.store.restaurantTypes " class=" p-2 ">
                    <div class="card_category">
                        <router-link class="d-block card_category " @click='getTypesById(restaurantType.slug)'
                            :to="{ name: 'restaurants', query: { types: restaurantType.slug } }">
                            <div class="d-flex justify-content-center img_container">
                                <img class="mt-2" :src="`src/assets/iconcategory/${restaurantType.icon}`" alt="">
                            </div>
                            <span class="d-flex justify-content-center">{{ restaurantType.name }}</span>
                        </router-link>
                    </div>


                </div>
            </div>

        </div>

    </div>
</template>

<style lang="scss" scoped>
.container_category {
    background-color: #FFBD00;

    .card_category {
        border: 1px solid #FF5400;
        border-radius: 10px;
        background-color: white;

        img {
            border-radius: 100%;
            object-fit: cover;

        }
    }


    //media query
    /*   @media(max-width:768px) {
        img {
            object-fit: cover;
            height: 200px;
            border-radius: 10px;
            box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.5);
        }
    }*/
    .card_category:hover {
        background-color: #FF5400;
    }



}
</style>