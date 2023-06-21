
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
        getTypesById(id) {
            axios.get(`${this.store.baseUrl}/api/restaurants?types=${id}`)
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
        <div v-for="restaurantType in this.store.restaurantTypes " class="card_category p-4">

            <router-link @click='getTypesById(restaurantType.id)'
                :to="{ name: 'restaurants', query: { types: restaurantType.id } }">
                <h5 class="text-center">{{ restaurantType.name }}</h5>
            </router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container_category {
    display: flex;


    .card_category {
        border: 1px solid black;
        width: calc(100%/10);
        height: 100px;

    }
}
</style>