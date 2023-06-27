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
                    console.log(this.store.restaurantTypes)
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
        ifQueryExist(slug) {
            if (this.$route.query.types) {
                return this.$route.query.types.includes(slug)
            }
        }
    },
    mounted() {
        this.getTypes();
    }

}

</script>

<template>
    <div class="container py-2 ">
        <div class="row  row-cols-3 row-cols-md-5 row-cols-lg-8 overflow-auto flex-nowrap ">
            <div class="col-sm-3  text-center py-4" v-for="restaurantType in store.restaurantTypes" :key="restaurantType.id"
                @click="categoryFilter(restaurantType.slug)">
                <div class="card my_background h-100 " :class="{ 'text-bg-warning': ifQueryExist(restaurantType.slug) }">
                    <img :src="restaurantType.image" alt="Card image cap" class="  w-50 m-auto  ">
                    <div class="card-body">
                        <small class=" my_btn rounded-5 text-light">{{ restaurantType.name }}</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../styles/general.scss';
@use '../partials/variables.scss' as *;
@use '../partials/mixins.scss';

.container_check {


    .card {
        border: 1px solid black;
        width: calc(100%/10);
        height: 100px;
    }
}

.my_background {
    background-color: $primary-color;
    cursor: pointer;



}

.my_btn:hover {
    cursor: pointer;
}

.my_hover:hover {
    background-color: rgb(255, 193, 7);
}

.types {
    position: sticky;
    overflow-y: scroll;
    width: 100%;
    z-index: 100;
    top: 0;
    left: 0;


}

.types::-webkit-scrollbar {
    display: none;
}
</style>