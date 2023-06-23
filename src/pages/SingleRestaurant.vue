<script>
import axios from 'axios';
import { store } from '../store.js';
import AppCart from '../components/AppCart.vue';

export default {
    name: 'SingleRestaurant',
    components: {
        AppCart,
    },
    data() {
        return {
            store,
            products: [],
            restaurants: [],



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
        },
        addToCart(product) {
            if (!store.cart.length) {
                //carrello vuoto
                // console.log('carrello vuoto.')
                product.quantity = 1;
                this.store.cart.push({ product })
            } else {
                //carrello non vuoto, verifico se il prodotto c'è già nel carrello
                // console.log('carrello non vuoto')
                let itemFound = false;
                this.store.cart.forEach(item => {
                    if (item.product.name == product.name) {
                        //prodotto trovato, ne aumento la quantità
                        // console.log('ho trovato il prodotto')
                        item.product.quantity = item.product.quantity + 1;
                        itemFound = true;
                    }
                })
                if (!itemFound) {
                    //prodotto non trovato, lo aggiungo
                    // console.log('non ho trovato il prodotto')
                    product.quantity = 1;
                    this.store.cart.push({ product })
                }

            }
            this.localstorage();
        },
        localstorage() {
            localStorage.setItem('cart', JSON.stringify(this.store.cart));
        },
    },

    mounted() {
        this.getProducts();
        this.getNameRestaurants();
    }
}
</script>


<template>
    <div class="container my-5">
        <div class="container my_bg" v-for="restaurant in restaurants">
            <h1 v-if="restaurant.id == this.$route.params.restaurant_id"> {{ restaurant.name }}</h1>
        </div>

        <div class="container-fluid d-flex">

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
                                <button @click="addToCart(product)" class="btn btn-primary">Aggiungi al carrello</button>
                            </div>
                        </div>
                    </div>
    
                </div>
            </div>
            <div class="w-25">
                <AppCart />
            </div>
        </div>
    </div>
</template>


<style></style>