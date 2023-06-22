<script>
import { store } from '../store.js';

import AppCheckBox from '../components/AppCheckBox.vue';
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
        
    },
    mounted() {
        
    }
}
</script>


<template>
    <AppCheckBox />

    <div class="container_general">
        <ul>
            <li v-for="restaurant in this.store.restaurantList" @click="">
                {{ restaurant.name }}
                <router-link :to="{name: 'single-restaurant', params: { restaurant_id: restaurant.id }}" class="btn btn-primary">
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