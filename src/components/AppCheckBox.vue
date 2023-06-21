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
        /*   getnumbers(newArray) {
               let numbers;
               numbers = newArray.map(function (Str) { parseInt(Str) });
               return numbers;
           },
        */



        categoryFilter($id) {
            /*            let myquery = this.$route.query.types;
                        myquery = myquery.split(',');
                        console.log(myquery);
                        if (myquery.includes($id)) {
                            const index = myquery.indexOf($id);
                            myquery.splice(index, 1);
                            console.log('ramoif')
                        } else {
                            myquery.push($id);
                            console.log('ramoelse')
                        }
                        myquery = myquery.join(",");
                        delete this.$router.query;
                        myquery = this.$router.replace({ query: { types: myquery } });
            
            
                        // let myquery = 'ciao' + $id;
                        //myquery = this.$router.replace({ query: { types: myquery } });
            */

            // console.log(this.$route.query)
            let myQuery = this.$route.query.types;
            myQuery = myQuery.split(',');
            //console.log(myQuery);
            let found = false;
            myQuery.forEach(element => {
                if (element == $id) {
                    found = true;
                }
            })
            if (found) {
                let queryIndex = myQuery.indexOf($id);
                myQuery.splice(queryIndex, 1)
                console.log(myQuery);
            } else {
                myQuery.push($id)
            }
            myQuery = myQuery.join(',');
            myQuery = this.$router.replace({ query: { types: myQuery } });
            //console.log(myQuery);
            //porcc
            if (this.store.selectedRestaurant.includes($id)) {
                const index = this.store.selectedRestaurant.indexOf($id);
                //console.log(index);
                this.store.selectedRestaurant.splice(index, 1);
            } else {
                this.store.selectedRestaurant.push($id);
            }

            //  console.log(this.store.selectedRestaurant);

            axios.get(`${this.store.baseUrl}/api/restaurants?types=${this.store.selectedRestaurant.join(",")}`)
                .then(response => {
                    console.log(response);
                    this.store.restaurantList = response.data.results;
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

                <div class="card" v-for="restaurantType in this.store.restaurantTypes" :key="restaurantType.id">
                    <input type="checkbox" @click="categoryFilter(restaurantType.id)" :id="restaurantType.id"
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