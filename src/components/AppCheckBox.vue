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
    <div class="container-fluid">
        <div class="row overflow-x-auto flex-nowrap ">
            <div :class="{ 'my_color': ifQueryExist(restaurantType.slug) }" class=" text-center  restaurant-icon  col-2"
                v-for="restaurantType in store.restaurantTypes" :key="restaurantType.id"
                @click="categoryFilter(restaurantType.slug)">
                <img :src="`src/assets/iconcategory/${restaurantType.icon}`" alt="Card image">
                <small class="my_text" :class="{ 'text-light': ifQueryExist(restaurantType.slug) }">{{
                    restaurantType.name }}</small>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../styles/general.scss';
@use '../partials/variables.scss' as *;
@use '../partials/mixins.scss';






.my_text {
    display: none;
    font-size: 13px;
    color: $primary-color;
    font-weight: bolder;
}

.restaurant-icon {
    height: 200px;
    aspect-ratio: 1/1;
    padding: 10px;
    border-radius: 10%;
    overflow: hidden;
    cursor: pointer;


    img {
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
        aspect-ratio: 1/1;
        filter: brightness(60%);
    }


}

.restaurant-icon:hover {
    transition: 0.4s;
    //transform: scale(1.1);

}


.my_color {
    background-color: $primary-color;
    border-radius: 50%;
}
</style>