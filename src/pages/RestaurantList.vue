<script>
import { store } from '../store.js';

import AppCheckBox from '../components/AppCheckBox.vue';
import axios from 'axios';
export default {

    name: 'RestaurantList',
    data() {
        return {
            store,
            cartAlert: {
                triggered: false,
                slug: '',
                id: '',
            },
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
                })
        },
        emptyCart() {
            this.store.cart = [];
            localStorage.setItem('cart', '');
        },
        clickOnRestaurant(restaurant) {
            //click su un ristorante diverso da quello già visitato o non è il primo
            if (!(this.store.lastVisitedRestaurantId == restaurant.id)) {
                //verifico se il carrello non è vuoto
                if (this.store.cart.length) {
                    //caso A: ALERT, prodotti nel carrello
                    this.cartAlert.triggered = true;
                    this.cartAlert.slug = restaurant.slug;
                    this.cartAlert.id = restaurant.id;
                } else {
                    //caso B: procedo al ristorante
                    this.goToRestaurant(restaurant.id, restaurant.slug)
                }
            } else {
                //caso B: procedo al ristorante
                this.goToRestaurant(restaurant.id, restaurant.slug)
            }

        },
        clickOnAlertBtn(input) {
            if (input == 'close') {

                this.cartAlert.triggered = false;
            } else if (input == 'confirm') {
                this.emptyCart();
                this.goToRestaurant(this.cartAlert.id, this.cartAlert.slug)
            }
        },
        goToRestaurant(id, slug) {
            this.store.lastVisitedRestaurantId = id;
            this.$router.push({ name: 'single-restaurant', params: { slug } });
        }
    },
    watch: {
        '$route.query.types'(newQuery, oldQuery) {
            axios.get(`${this.store.baseUrl}/api/restaurants?types=${newQuery}`)
                .then(response => {
                    this.store.restaurantList = response.data.results;
                })
        },
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
            <div class="col-sm-6 " v-for="restaurant in  this.store.restaurantList ">
                <div class="card h-100 text-center my_color rounded-5 overflow-hidden">
                    <img :src="restaurant.image" alt="Immagini Ristoranti" class="my_img">
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
    <div v-if="cartAlert.triggered"
        class="position-fixed bottom-50 start-50 translate-middle p-5 border border-dark rounded text-bg-light">
        <p>Hai dei prodotti nel carrello, se prosegui verranno eliminati.</p>
        <div class="d-flex justify-content-between px-3">
            <button class="btn btn-warning" @click="clickOnAlertBtn('confirm')">
                Procedi
            </button>
            <button class="btn btn-secondary" @click="clickOnAlertBtn('close')">
                Torna alla lista
            </button>
        </div>

        <button class="btn btn-close position-absolute top-0 end-0 m-3" @click="clickOnAlertBtn('close')"></button>
    </div>
</template>



<style lang="scss" scoped>
@use '../styles/general.scss';
@use '../partials/variables.scss' as *;
@use '../partials/mixins.scss';

.my_color {
    border: 3px solid $primary-color;
}

.my_rounded {
    border-radius: 30%;
}

.my_btn {
    background-color: $secondary-color;
    border-radius: 30px;
    padding: 10px;
}

.my_img {
    height: 70%;
}
</style>