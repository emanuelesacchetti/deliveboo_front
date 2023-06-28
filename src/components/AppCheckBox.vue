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
    <div class="container py-2 categories-container">
        <div class="row overflow-auto flex-nowrap ">
            <div class="col text-center py-4" v-for="restaurantType in store.restaurantTypes" :key="restaurantType.id"
                @click="categoryFilter(restaurantType.slug)">
                <div class="restaurant-icon " :class="{ 'my_color': ifQueryExist(restaurantType.slug) }">
                    <img :src="restaurantType.image" alt="Card image cap" class="  w-50 m-auto ">
                    <div class="card-body">
                        <small class="my_text" :class="{ 'text-light': ifQueryExist(restaurantType.slug) }">{{
                            restaurantType.name }}</small>
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

.categories-container{
    margin-top: 15vw;
}
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



.my_text {
    font-size: 13px;
    color: $primary-color;
    font-weight: bolder;
}

.restaurant-icon {
    height: 100px;
    width: 100px;
    cursor: pointer;


}

.restaurant-icon:hover {
    transition: 0.4s;
    transform: scale(1.4);

}

.types::-webkit-scrollbar {
    display: none;
}

.my_color {
    background-color: $primary-color;
    border-radius: 50%;
}
</style>