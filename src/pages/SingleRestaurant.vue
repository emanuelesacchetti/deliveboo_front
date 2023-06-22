<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
    name: 'SingleRestaurant',
    data() {
        return {
            store,
            products: [],
            restaurants: []


        }
    },
    methods: {
        getProducts() {

            const restaurantId = this.$route.params.restaurant_id
            

            axios.get(`${this.store.baseUrl}/api/restaurants/${restaurantId}`)
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

        getNameRestaurants() {
            axios.get(`${this.store.baseUrl}/api/restaurants`)
                .then(response => {
                    console.log(response)
                    if (response.data.success) {
                        this.restaurants = response.data.results;
                        console.log(this.restaurants)
                    } else {
                        //alert(response.data.error);
                        this.$router.push({ name: 'not-found' });
                    }
                })
        },
        getImageUrl(name) {
            return new URL(`../ assets / ${name}`, import.meta.url).href;
        }
    },

    mounted() {
        this.getProducts();
    }
}
</script>


<template>
    <div class="container my-5">
        <div class="container my_bg" v-for="restaurant in restaurants">
            <h6>{{ restaurant.name }}</h6>

            <div class="d-flex justify-content-center">
                <small class="text-end">{{ restaurant.address }}</small>
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

    </div>
</template>


<style></style>