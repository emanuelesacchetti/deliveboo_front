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
        categoryFilter(slug) {

            if (!this.$route.query.types) {
                this.$router.replace({ query: { types: slug } })
                console.log('query inesistente')
            } else {
                let myQuery = this.$route.query.types;
                myQuery = myQuery.split(',');
                let found = false;
                myQuery.forEach(element => {
                    if (element == slug) {
                        found = true;
                    }
                })
                if (found) {
                    myQuery.forEach((element, index) => {
                        if (element == slug) {
                            myQuery.splice(index, 1)
                        }
                    })
                } else {

                    if (myQuery[0] != '') {

                        myQuery.push(slug);
                    } else {
                        myQuery = [slug];
                    }
                }
                if (myQuery.length >= 1) {
                    this.store.selectedRestaurant = [...myQuery];
                    myQuery = myQuery.join(',');
                } else {
                    this.store.selectedRestaurant = [];
                    myQuery = '';
                }
                myQuery = this.$router.replace({ query: { types: myQuery } });
            }

        },
        ifQueryExist(slug){
            if(this.$route.query.types){
                if(this.$route.query.types.includes(slug)){
                    return 'text-danger'
                }
            }
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

                <div class="card" v-for="restaurantType in store.restaurantTypes" :key="restaurantType.id">
                    <div :class="ifQueryExist(restaurantType.slug)" @click="categoryFilter(restaurantType.slug)">
                        {{ restaurantType.name }}
                    </div>
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