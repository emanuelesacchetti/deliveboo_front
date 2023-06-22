<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
    name: 'SingleRestaurant',
    data() {
        return {
            store,
            products: []

        }
    },
    methods: {
        getProducts(id) {
            //const restaurantId = this.$route.params.rastaurant_id;

            axios.get(`${this.store.baseUrl}/api/restaurants/${id}`)
                .then(response => {
                    console.log(response)
                    if (response.data.success) {
                        this.products = response.data.results;
                        console.log(this.products)
                    } else {
                        //alert(response.data.error);

                        this.$router.push({ name: 'not-found' });
                    }

                });
        },
        getImageUrl(name) {
            return new URL(`../ assets / ${name}`, import.meta.url).href;
        }
    },

    mounted () {
        this.getProducts(2);
    }
}
</script>


<template>
    <div class="container my-5">
        <div class="container my_bg">
            <h6>Ipotetico ristorante</h6>
            <h1 class="ms-3">Cucina tipica di ipotetico ristorante</h1>
            <div class="d-flex justify-content-center">
                <small class="text-end">indirizzo</small>
            </div>
        </div>

        <div class="container-fluid mt-5">
            <h1>Menù</h1>
            <hr>
            <div class="row">
                <div class="col-6" v-for="product in products">
                    <div class="card text-center m-3 w-75">
                        <img class=" card-img-top" :src="product.image" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">{{ product.name }}</h5>
                            <p class="card-text">{{ product.description }}</p>
                            <p class="card-text">{{ product.price }}</p>
                            <a href="#" class="btn btn-primary">Aggiungi al carrello</a>
                        </div>
                    </div>

                </div>

            </div>

        </div>

        <!--<router-link :to="{name: 'single-restaurant', params: {rastaurant_id: 'products'}}" class="btn btn-primary">
            Vedi Ristorante
        </router-link>-->




    </div>
</template>


<style></style>
