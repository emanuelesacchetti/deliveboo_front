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

        /*  categoryFilter($id) {
               console.log(this.store.selectedRestaurant);
               const typeIds = this.store.selectedRestaurant.map(restaurantType => restaurantType.id);
               axios.get(`${this.store.baseUrl} / api / restaurants ? types = ${typeIds.join(',')}`)
                   .then(response => {
                       this.store.restaurantList = response.data.results;
                       console.log(typeIds);
                       console.log(response);
                   })
           }
           */
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
                    <input type="checkbox" v-model="this.store.selectedRestaurant" :id="restaurantType.id"
                        :value="restaurantType.id">
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