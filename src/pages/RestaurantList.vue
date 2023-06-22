<script>
import { store } from '../store.js';
import AppCheckBox from '../components/AppCheckBox.vue';
import axios from 'axios';
export default {
    name: 'RestaurantList',
    data() {
        return {
            store,
        }
    },
    components: {
        AppCheckBox,
    },
    methods: {
        getRestaurantList() {
            axios.get(`${this.store.baseUrl}/api/restaurants`)
                .then(response => {
                    this.store.allRestaurant = response.data.results;
                    console.log(response);
                })
        }
    },
    created() {
        this.getRestaurantList();
    }
}
</script>


<template>
    <AppCheckBox />

    <div class="container_general">
        <ul>
            <li v-for="restaurant in this.store.allRestaurant">
                {{ restaurant.name }}
            </li>
        </ul>
    </div>
</template>


<style lang="scss" scoped> .container_general {
     display: flex;
     justify-content: center;
 }
</style>