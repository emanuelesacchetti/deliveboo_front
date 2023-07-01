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
            products: [],
            loadingRestaurants : true,
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
        },
        resetFilters() {
            this.$router.push({ query: { types: '' } })
        }
    },
    watch: {
        '$route.query.types'(newQuery, oldQuery) {
            this.loadingRestaurants = true;
            axios.get(`${this.store.baseUrl}/api/restaurants?types=${newQuery}`)
                .then(response => {
                    this.store.restaurantList = response.data.results;
                    let timingLoading = setTimeout( () => {
                        this.loadingRestaurants = false;
                    }, 1500);
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
    <div class="container p-3 component-container rounded-4">
        <div v-if="store.restaurantList.length" class="row row-cols-1 row-cols-lg-2  g-4 justify-content-center">
            <div class=" col my_height" v-for="restaurant in  this.store.restaurantList">
                <div class=" card h-100 rounded-5 overflow-hidden card-border">
                    <div class=" row h-100">
                        <div class="col-md-8 position-relative">
                            <div class="position-absolute top-0 start-0 w-100 h-100 my_style"></div>
                            <img :src="`${store.baseUrl}/img/${restaurant.image}`" alt="Immagini Ristoranti"
                                class="w-100 h-100 my_image" loading="lazy">
                        </div>
                        <div class="col-md-4 d-flex justify-content-center align-items-center text-box">
                            <div class="text-center text-dark">
                                <h5 class="p-2">{{ restaurant.name }}</h5>
                                <button class=" my_btn mt-3" @click="clickOnRestaurant(restaurant)">
                                    Ordina da qui
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="loadingRestaurants" class="my-5 text-center">
            <h1 class="display-6 p-2 text-dark rounded-3 my-3">Stiamo cercando i migliori ristoranti per te</h1>
            <img src="src/assets/img/loadingDots.gif" alt="">
        </div>
        <div v-else class="my-5 text-center">
            <h1 class="display-6 p-2 text-dark rounded-3 my-3">Non ci sono ristoranti che soddisfino tutte le categorie
                selezionate</h1>
            <button class="my_btn mt-3" @click="resetFilters()">Deseleziona tutto</button>
        </div>
    </div>
    <div v-if="cartAlert.triggered"
        class="position-fixed top-50 start-50 translate-middle p-5 text-bg-light z-9 container_allert" id="my_allert">
        <p class="text-center">Hai dei prodotti nel carrello, se prosegui verranno eliminati.</p>
        <div class="d-flex justify-content-between px-3">
            <button class="my_btn me-1" @click="clickOnAlertBtn('confirm')">
                Procedi
            </button>
            <button class="my_btn" @click="clickOnAlertBtn('close')">
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

.component-container {
    background: whitesmoke;
    margin-bottom: 150px;
}

.my_color {
    border: 3px solid $primary-color;
}

.card-border {
    box-shadow: 4px 4px 5px 0px rgba($color: $primary-color, $alpha: 0.8);
    z-index: 5;
}

.text-box {
    background-color: white;
}

.card:hover {
    //border: 1px solid rgba($secondary-color, $alpha: 4.0);
    transform: scale(1.05);
    transition: 0.4s all;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    z-index: 51;
}

.my_style {
    background: linear-gradient(to left, white 5%, transparent 30%);
    z-index: 50;

}

button {
    @include mixins.primary-btn;
    border-color: $primary-color;

}

button:hover {
    @include mixins.btn-hover;
    font-size: 12px;
    background-color: $primary-color;
    box-shadow: $primary-color 0px 0px 15px 0px;
}

button:active {
    @include mixins.btn-active;
}


.my_height {
    height: 250px;
}


#my_allert {
    z-index: 99;
}

.container_allert {
    border-radius: 40px;
    border: 2px solid $secondary-color;

    .my_btn {
        @include mixins.primary-btn;
        border-color: $secondary-color;
        background-color: $primary-color;
        color: white;
        border: white;

    }

    .my_btn:hover {
        @include mixins.btn-hover;
        font-size: 12px;
    }

    .my_btn:active {
        @include mixins.btn-active;
    }
}

@media(max-width:550px){
    .container_allert{
        flex-direction: column;
        .my_btn{
            font-size: 10px;
        }
    }

}


@media screen and (max-width:767px) {
    .container_allert{
        
        div{
            flex-direction: column;
        }
    }
    .my_height {
        height: 100%;
    }

    .my_btn {
        margin-bottom: 20px;
        font-size: 8px;
    }
}



@media screen and (max-width:1200px) {


    .my_btn {
        font-size: 11px;
    }
}
</style>