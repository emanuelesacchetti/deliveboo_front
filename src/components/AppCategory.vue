
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
            <div class="row flex-md-nowrap overflow-x-auto">
                <div v-for="restaurantType in this.store.restaurantTypes " class=" p-2 col-md-2 col-sm-12 ">

                    <router-link class="d-block card_category  " @click='getTypesById(restaurantType.slug)'
                        :to="{ name: 'restaurants', query: { types: restaurantType.slug } }">
                        <div class="container_img">
                            <img class="w-100" :src="`src/assets/iconcategory/${restaurantType.icon}`" alt="">
                        </div>
                        <h4 class="text_category d-flex justify-content-center">{{ restaurantType.name }}</h4>
                    </router-link>


                </div>
            </div>

        </div>

    </div>
</template>

<style lang="scss" scoped>
.container_category {
    background-color: #FFBD00;

    .container_img {
        height: 80%;
    }

    .card_category {
        border-radius: 10px;
        position: relative;
        border: 1px solid black;

        .text_category {
            /*  position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: black;
            display: none;*/
            color: black;
        }






        img {
            object-fit: cover;
            aspect-ratio: 1/1;
            border-radius: 10px 10px 0 0;


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
    display: none;
}

.card_category:hover img {
    filter: blur(2px);
}
</style>