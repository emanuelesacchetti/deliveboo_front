<script>
import axios from 'axios';
import { store } from '../store.js';
import AppCart from '../components/AppCart.vue';

export default {
    name: 'SingleRestaurant',
    components: {
        AppCart,
    },
    data() {
        return {
            store,
            restaurant: {},
        }
    },
    methods: {
        getProducts() {

            const slug = this.$route.params.slug


            axios.get(`${this.store.baseUrl}/api/restaurants/${slug}`)
                .then(response => {
                    console.log(response)
                    if (response.data.success) {
                        this.restaurant = response.data.results[0];
                        // this.products = response.data.results.;
                        // console.log(this.products)

                    } else {
                        //alert(response.data.error);

                        this.$router.push({ name: 'not-found' });
                    }

                });
        },

        getImageUrl(name) {
            return new URL(`../ assets / ${name}`, import.meta.url).href;
        },
        addToCart(product) {
            if (!store.cart.length) {
                //carrello vuoto
                // console.log('carrello vuoto.')
                product.quantity = 1;
                this.store.cart.push({ product })
            } else {
                //carrello non vuoto, verifico se il prodotto c'è già nel carrello
                // console.log('carrello non vuoto')
                let itemFound = false;
                this.store.cart.forEach(item => {
                    if (item.product.name == product.name) {
                        //prodotto trovato, ne aumento la quantità
                        // console.log('ho trovato il prodotto')
                        item.product.quantity = item.product.quantity + 1;
                        itemFound = true;
                    }
                })
                if (!itemFound) {
                    //prodotto non trovato, lo aggiungo
                    // console.log('non ho trovato il prodotto')
                    product.quantity = 1;
                    this.store.cart.push({ product })
                }

            }
            this.localstorage();
        },
        localstorage() {
            localStorage.setItem('cart', JSON.stringify(this.store.cart));
        },
    },

    mounted() {
        this.getProducts();
    }
}
</script>


<template>
    <div class="container my-5">
        <div class="container my_bg text-center">
            <h1 class="display-1"> {{ restaurant.name }}</h1>
        </div>
        <div>
            <img :src="`${store.baseUrl}/storage/${restaurant.image}`" alt="Card image cap">
        </div>

        <div class="container-fluid d-flex">

            <div class="container-fluid mt-5 my_menu">
                <div class=" row row-cols-1 row-cols-lg-1 row-cols-xl-1">
                    <div class="col p-2 mt-5 d-flex justify-content-center" v-for="product in restaurant.products">
                        <div class="my_card text-center col-sm-12 col-lg-8 col-xl-8">
                            <div class="img_container">
                                <img class=" card-img-top" :src="`${store.baseUrl}/storage/${product.image}`"
                                    alt="Card image cap">
                            </div>
                            <div class="my_cardText">
                                <h5 class=" fs-3 mb-3">{{ product.name }}</h5>
                                <p>{{ product.description }}</p>
                                <p> &euro; {{ product.price }}</p>
                                <button @click="addToCart(product)">Aggiungi al
                                    carrello</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="cart-container mt-5 ms-2 p-2 d-none d-md-block">
                <AppCart class="cart_element" />
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
@use '../partials/variables.scss' as *;
@use '../partials/mixins.scss';

.cart-container {
    width: 40%;

    .cart_element {
        border-radius: 40px;
        background-color: whitesmoke;
    }
}


.my_card {
    width: 100%;
    border-radius: 40px 40px 40px 40px;
    //border-bottom: 2px solid $secondary-color;
    //border-left: 2px solid $secondary-color;
    // box-shadow: -5px 5px 10px 0px $secondary-color;
    //background-color: rgba(255, 0, 85, 0.096);
    // background: linear-gradient(to bottom left, #FF0054 2%, #FFFFFF 100%);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    background-color: white;


    .img_container {
        position: relative;
        width: 20%;
        height: 100%;

        img {
            position: absolute;
            width: 150px;
            border-radius: 100%;
            aspect-ratio: 1/1;
            top: 0px;
            left: -80px;
        }
    }



    .my_cardText {
        width: 80%;
        padding: 1rem;
    }
}

.my_menu {
    padding: 30px;
    //border-right: 1px solid $secondary-color;
    padding: 50px;
    border-radius: 40px;
    background-color: whitesmoke
}



button {
    @include mixins.primary-btn;
    border-color: $secondary-color;
}

button:hover {
    @include mixins.btn-hover;
}

button:active {
    @include mixins.btn-active;
}

//hover
.my_card:hover {
    box-shadow: -5px 5px 5px 0px $secondary-color;
}
</style>