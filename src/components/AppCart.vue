<template>
    <div class="container p-3">


        <div class="row">
            <div class="col">
                <h1 class="p-3 border-bottom">Carrello</h1>
                <div>
                    <ul class="list-unstyled">
                        <li v-for="item in store.cart">
                            <div class="d-flex justify-content-between align-items-center py-1 border-bottom py-3">
                                <div>
                                    <span class="text-bg-light rounded-circle p-2 px-2 me-2"> x {{ item.product.quantity }}
                                    </span>
                                    <button @click="addToCart(item.product)">+</button>
                                    <span class="text-capitalize fw-semibold fs-5">{{ item.product.name }}</span>
                                </div>

                                <div>
                                    <span @click="deletefromCart(item.product)" class="text-danger me-3"><i
                                            class="fa-solid fa-trash"></i></span>
                                    <span class="fw-semibold fs-6"> {{ item.product.price * item.product.quantity }}
                                        &euro;</span>
                                </div>
                            </div>

                        </li>
                    </ul>
                    <p class="text-end me-5 fw-semibold fs-4">Totale: {{ total }} &euro; </p>
                    <router-link :to="{ name: 'payment'}"
                        class="btn btn-primary">
                        Vai al checkout
                    </router-link>
                </div>
            </div>

        </div>

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
            this.localstorage();
        },
        localstorage() {
            localStorage.setItem('cart', JSON.stringify(this.store.cart));
        },
    },
    computed: {
        total() {
            let total = 0;
            if (this.store.cart.length) {
                this.store.cart.forEach(item => {
                    total += (parseInt(item.product.price) * parseInt(item.product.quantity));
                })
            }

            this.store.cartTotal = total;
            return total;
        }
    },
    created() {
        let localStorageCart = localStorage.getItem('cart');
        if (localStorageCart) {
            this.store.cart = JSON.parse(localStorageCart);
        }
        console.log(localStorageCart);
    }
}
</script>

<style scoped lang="scss"></style>