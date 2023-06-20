<script>
import axios from 'axios';
import { store } from '../store.js';
export default {
    name: 'AppCheckBox',
    data() {
        return {
            store,
        }
    },
    methods: {
        getTypes() {
            axios.get(`${this.store.baseUrl}/api/types`)
                .then(response => {
                    this.store.restaurantTypes = response.data.results;
                    console.log(response);
                })
        },

        categoryFilter() {
            console.log(this.selectedRestaurants);
            axios.get(`${this.store.baseUrl}/api/restaurants?types=${$id}`)
                .then(response => {
                    this.store.restaurantList = response.data.results;
                    console.log($id);
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
    <div class="container_check">
        <div>
            <h2>Elenco dei ristoranti</h2>
            <div class="d-flex">
                <div class="card" v-for="restaurantType in this.store.restaurantTypes">
                    <input @click="categoryFilter(this.store.selectedRestaurants)" type="checkbox" :id="restaurantType.id"
                        :value="restaurantType.id" v-model="this.store.selectedRestaurants">
                    <label :for="restaurantType.id">{{ restaurantType.name }}</label>
                </div>

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container_check {


    .card {
        border: 1px solid black;
        width: calc(100%/10);
        height: 100px;
    }
}
</style>