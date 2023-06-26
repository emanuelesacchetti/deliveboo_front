<script>
import { store } from '../store.js';

import AppCheckBox from '../components/AppCheckBox.vue';
import axios from 'axios';
export default {

    name: 'RestaurantList',
    data() {
        return {
            store,
            products: []
        }
    },
    components: {
        AppCheckBox,
    },
    methods: {
        getRestaurantList(query) {
            let link = `${this.store.baseUrl}/api/restaurants`
            if (query) {
                link += `?types=${query}`
            }
            axios.get(link)
                .then(response => {
                    this.store.restaurantList = response.data.results;
                    console.log(response);
                })
        },
        emptyCart(id) {
            if (this.store.lastVisitedRestaurantId != id) {
                this.store.cart = [];
                localStorage.setItem('cart', '');
            }
            this.store.lastVisitedRestaurantId = id;
        }
    },
    watch: {
        '$route.query.types'(newQuery, oldQuery) {
            axios.get(`${this.store.baseUrl}/api/restaurants?types=${newQuery}`)
                .then(response => {
                    this.store.restaurantList = response.data.results;
                })
        }
    },
    created() {
        this.getRestaurantList(this.$route.query.types);
    }
}
</script>


<template>
    <AppCheckBox />
    <div class="container p-3">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            <div class="col" v-for="restaurant in  this.store.restaurantList ">
                <div class="card text-center h-100 my_color rounded-5">
                    <img :src="restaurant.image" alt="Immagini Ristoranti" class="my_rounded w-75 m-auto mt-3">
                    <div class="card-body">
                        <h5 class="card-title">{{ restaurant.name }}</h5>
                    </div>
                    <div class="card-footer">
                        <router-link :to="{ name: 'single-restaurant', params: { slug: restaurant.slug } }"
                            class="btn btn-warning" @click="emptyCart(restaurant.id)">
                            Ordina da qui
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.my_color {
    background-color: rgb(240, 140, 35);
}

.my_rounded {
    border-radius: 40%;
}
</style>