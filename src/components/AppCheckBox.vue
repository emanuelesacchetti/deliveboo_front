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
        categoryFilter($id) {  
                                                                                                       
            let myQuery = this.$route.query.types;
            console.log('cosa è ' + myQuery)                                  
            myQuery = myQuery.split(',');                                          
            console.log( 'ho spillato myQuery:');
            let found = false;
            myQuery.forEach(element => {                                            
                if (element == $id) {                                               
            found = true;                                                           
                }
            })
            if (found) {  
                myQuery.forEach((element,index) => {
                    if(element == $id){
                        myQuery.splice(index,1)
                        console.log('ho elimnato un elemento alla posizione' + index);   
                    }
                })                                                                                                       
            } else {
                console.log('elemento non trovato');
                if(myQuery[0] != ''){
                    console.log('il primo elemento NON è vuoto')
                    myQuery.push($id);
                }else{
                    
                    myQuery = [$id];
                    console.log('settato a' + $id)
                }   
            }
            if(myQuery.length >= 1){
                console.log(myQuery);
                myQuery = myQuery.join(',');
                console.log(myQuery);
            }else{
                myQuery = '';
            }
            console.log(myQuery);
                                                      
            myQuery = this.$router.replace({ query: { types: myQuery } });                                                                             
        }
    },
    watch: {
        '$route.query.types'(newQuery, oldQuery){
            axios.get(`${this.store.baseUrl}/api/restaurants?types=${newQuery}`)
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