
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
    <div class="container_category mt-5">
        <div class="container-fluid">
            <div class="row flex-md-nowrap overflow-x-auto ">
                <div v-for="restaurantType in this.store.restaurantTypes " class=" p-2  col-md-2 col-sm-12 ">

                    <router-link class="d-block card_category " @click='getTypesById(restaurantType.slug)'
                        :to="{ name: 'restaurants', query: { types: restaurantType.slug } }">
                        <img class="w-100" :src="`src/assets/iconcategory/${restaurantType.icon}`" alt="">
                        <span class="text_category">{{ restaurantType.name }}</span>
                    </router-link>
                </div>
            </div>

        </div>

    </div>
</template>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.container_category {
    .card_category {
        border-radius: 10px;
        position: relative;

        .text_category {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: black;
            display: none;
            text-decoration: none;
        }




        img {
            object-fit: cover;
            aspect-ratio: 1/1;
            border-radius: 100%;
            box-shadow: -10px 0px 0px 4px rgb(238, 127, 11);

        }

        //media query
        @media(max-width:768px) {
            img {
                object-fit: cover;
                height: 200px;
                border-radius: 10px;
                box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.5);
            }
        }



    }

}

.card_category:hover .text_category {
    display: block;
    color: white;
    font-weight: bold;
}

.card_category:hover img {
    filter: blur(2px);
}
</style>