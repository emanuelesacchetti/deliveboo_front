<template>
    <div class="container vh-100 p-2 d-flex flex-column">
        <h1 class="p-3 border-bottom text-center">Riepilogo</h1>
        <ul class="list-unstyled flex-column d-flex overflow-auto px-1">
            <li v-for="item in store.cart">
                <div class="d-flex justify-content-between align-items-center py-1 border-bottom py-3">
                    <div class="w-25 d-flex align-items-center justify-content-between px-1">

                        <i class=" fa-solid fa-circle-plus fs-5" @click="addToCart(item.product)" role="button"></i>

                        <div class="text-bg-light rounded-circle p-2 px-2">
                            x{{ item.product.quantity }}
                        </div>
                    </div>

                    <div class="text-capitalize w-50 fw-semibold fs-6 text-nowrap text-truncate">
                        {{ item.product.name }}
                    </div>

                    <div class="w-25 d-flex px-1">
                        <div @click="deletefromCart(item.product)" class="text-danger text-nowrap"><i
                                class="fa-solid fa-trash"></i></div>
                        <div class="fw-semibold fs-6 text-nowrap text-end flex-grow-1"> {{ (item.product.price *
                            item.product.quantity).toFixed(2) }}
                            &euro;</div>
                    </div>
                </div>

            </li>
        </ul>
        <p v-if="store.cart.length" class="text-center fw-semibold fs-4">Totale: <span class="ms-1">{{ total }}</span>
            &euro; </p>
        <p v-else class="p-3 text-center"> Nessun elemento nel carrello</p>

        <router-link :to="{ name: 'payment' }" v-if="total != 0" class= "my_btn p-2 w-100">
            Vai al checkout
        </router-link>
    </div>
</template>

<script>
import { store } from '../store.js';

export default {
    name: 'AppCart',
    data() {
        return {
            store,
        }
    },
    methods: {
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
        deletefromCart(product) {
            if (product.quantity > 1) {
                // abbasso la quantità se ho più pezzi
                product.quantity--;
            } else {
                //elimino il prodotto se è l'ultimo rimasto nel carrello
                this.store.cart.forEach((item, index) => {
                    if (item.product.name == product.name) {
                        this.store.cart.splice(index, 1);
                    }
                })
            }
            if(!store.cart.length){
                this.store.cartTotal = 0;
            }
            this.localstorage();
        },
        localstorage() {
            localStorage.setItem('cart', JSON.stringify(this.store.cart));
        },
    },
    computed: {
        total() {
            let total = 0.00;
            if (this.store.cart.length) {
                this.store.cart.forEach(item => {
                    total += (parseFloat(item.product.price) * parseFloat(item.product.quantity));
                })
            }
            this.store.cartTotal = total.toFixed(2);
            return total.toFixed(2);
        }
    },
    created() {
        let localStorageCart = localStorage.getItem('cart');
        if (localStorageCart) {
            this.store.cart = JSON.parse(localStorageCart);
        }
    }
}
</script>

<style scoped lang="scss">
@use '../partials/variables.scss' as *;
@use '../partials/mixins.scss';

.my_btn {
    @include mixins.primary-btn;
    border-color: $secondary-color;
    text-align: center;
    text-decoration: none;
    color: $secondary-color;
}

.my_btn:hover {
    @include mixins.btn-hover;
    font-size: 12px;
    scale: 1.0.9;
}

.my_btn:active {
    @include mixins.btn-active;
}

.fa-circle-plus {
    color: $secondary-color;
}
</style>