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
                })
        },                                                                          
        categoryFilter($id) {  
                                                                                                       
            let myQuery = this.$route.query.types;                                      
            myQuery = myQuery.split(',');                                                  
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
                    }
                })                                                                                                       
            } else {
                
                if(myQuery[0] != ''){
                    
                    myQuery.push($id);
                }else{     
                    myQuery = [$id];
                }   
            }
            if(myQuery.length >= 1){
                myQuery = myQuery.join(',');
            }else{
                myQuery = '';
            }
            myQuery = this.$router.replace({ query: { types: myQuery } });                                                                             
        }
    },
    watch: {
        '$route.query.types'(newQuery, oldQuery){
            axios.get(`${this.store.baseUrl}/api/restaurants?types=${newQuery}`)
                .then(response => {
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