<script>
import { store } from '../store.js';

import AppCheckBox from '../components/AppCheckBox.vue';
import axios from 'axios';
export default {

    name: 'RestaurantList',
    data() {
        return {
            store,
            products: []
        }
    },
    components: {
        AppCheckBox,
    },
    methods: {
        getRestaurantList(query) {
            let link = `${this.store.baseUrl}/api/restaurants`
            if (query) {
                link += `?types=${query}`
            }
            axios.get(link)
                .then(response => {
                    this.store.restaurantList = response.data.results;
                    console.log(response);
                })
        },
        emptyCart(id) {
            if (this.store.lastVisitedRestaurantId != id) {
                this.store.cart = [];
                localStorage.setItem('cart', '');
            }
            this.store.lastVisitedRestaurantId = id;
        }
    },
    watch: {
        '$route.query.types'(newQuery, oldQuery) {
            axios.get(`${this.store.baseUrl}/api/restaurants?types=${newQuery}`)
                .then(response => {
                    this.store.restaurantList = response.data.results;
                })
        }
    },
    created() {
        this.getRestaurantList(this.$route.query.types);
    }
}
</script>


<template>
    <AppCheckBox />
    <div class="container p-3">
        <div class="row g-4">
            <div class="col-12 " v-for="restaurant in  this.store.restaurantList ">
                <div class="card text-center w-50   m-auto my_color rounded-5 overflow-hidden">
                    <img :src="restaurant.image" alt="Immagini Ristoranti" class=" my_position  ">
                    <div class="card-body">
                        <h5 class="card-title">{{ restaurant.name }}</h5>
                    </div>
                    <div class="card-footer h-50">
                        <router-link :to="{ name: 'single-restaurant', params: { slug: restaurant.slug } }"
                            class="btn my_btn text-light button-78" role="button" @click="emptyCart(restaurant.id)">
                            Ordina da qui

                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.my_color {
    border: 3px solid rgb(255, 0, 84);





}

.my_position {}



.my_rounded {
    border-radius: 30%;
}

.my_btn {
    background-color: rgb(57, 0, 153);
}


/* CSS */
.button-78 {
    align-items: center;
    appearance: none;
    background-clip: padding-box;
    background-color: initial;
    background-image: none;
    border-style: none;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    flex-direction: row;
    flex-shrink: 0;
    font-family: Eina01, sans-serif;
    font-size: 16px;
    font-weight: 800;
    justify-content: center;
    line-height: 24px;
    margin: 0;
    min-height: 64px;
    outline: none;
    overflow: visible;
    padding: 19px 26px;
    pointer-events: auto;
    position: relative;
    text-align: center;
    text-decoration: none;
    text-transform: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    width: auto;
    word-break: keep-all;
    z-index: 0;
}

@media (min-width: 768px) {
    .button-78 {
        padding: 19px 32px;
    }
}

.button-78:before,
.button-78:after {
    border-radius: 80px;
}

.button-78:before {
    background-image: linear-gradient(92.83deg, #ff7426 0, #f93a13 100%);
    content: "";
    display: block;
    height: 100%;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -2;
}

.button-78:after {
    background-color: initial;
    background-image: linear-gradient(#541a0f 0, #0c0d0d 100%);
    bottom: 4px;
    content: "";
    display: block;
    left: 4px;
    overflow: hidden;
    position: absolute;
    right: 4px;
    top: 4px;
    transition: all 100ms ease-out;
    z-index: -1;
}

.button-78:hover:not(:disabled):before {
    background: linear-gradient(92.83deg, rgb(255, 116, 38) 0%, rgb(249, 58, 19) 100%);
}

.button-78:hover:not(:disabled):after {
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    transition-timing-function: ease-in;
    opacity: 0;
}

.button-78:active:not(:disabled) {
    color: #ccc;
}

.button-78:active:not(:disabled):before {
    background-image: linear-gradient(0deg, rgba(0, 0, 0, .2), rgba(0, 0, 0, .2)), linear-gradient(92.83deg, #ff7426 0, #f93a13 100%);
}

.button-78:active:not(:disabled):after {
    background-image: linear-gradient(#541a0f 0, #0c0d0d 100%);
    bottom: 4px;
    left: 4px;
    right: 4px;
    top: 4px;
}

.button-78:disabled {
    cursor: default;
    opacity: .24;
}
</style>