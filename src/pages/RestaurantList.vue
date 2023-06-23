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
    <div class="container_general">
        <ul>
            <li v-for="restaurant in this.store.restaurantList" @click="">
                {{ restaurant.name }}
                <router-link :to="{ name: 'single-restaurant', params: { restaurant_id: restaurant.id } }"
                    class="btn btn-primary" @click="emptyCart(restaurant.id)">
                    Ordina da qui
                </router-link>

            </li>
        </ul>
    </div>
</template>


<style lang="scss" scoped> .container_general {
    display: flex;
    justify-content: center;
}
</style>