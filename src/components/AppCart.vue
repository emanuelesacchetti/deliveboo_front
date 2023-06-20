<template>
    <div class="container p-3">


        <div class="row">
            <div class="col-6">
                <h1 class="p-3 border-bottom">Carrello</h1>
                <div>
                    <ul class="list-unstyled">
                        <li v-for="item in store.cart">
                            <div v-if="item.product.restaurant_id == restaurant_id"
                                class="d-flex justify-content-between align-items-center py-1 border-bottom py-3">
                                <div>
                                    <span class="text-bg-light rounded-circle p-2 px-2 me-2"> x {{ item.product.quantity }}
                                    </span>
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
                </div>
            </div>

            <div class="col-6">
                <h1 class="p-3 border-bottom">Prodotti</h1>
                <div>
                    <ul class="list-unstyled fs-5">
                        <li v-for="product in products">
                            <div v-if="product.restaurant_id == restaurant_id"
                                class="d-flex justify-content-around align-items-center py-1" :key="product.id">
                                <span>{{ product.name }}</span>
                                <span> {{ product.price }} &euro; </span>
                                <button @click="addToCart(product)" class="btn btn-dark">add to cart</button>
                            </div>
                        </li>
                    </ul>
                </div>
                <span v-for="index in 4" class="btn btn-primary m-2" @click="restaurant_id = index"> Ristorante {{ index }}
                </span>
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
            restaurant_id: 1,
            //product list 
            products: [
                {
                    name: 'product1',
                    price: 20,
                    restaurant_id: 1,
                },
                {
                    name: 'product2',
                    price: 30,
                    restaurant_id: 1,
                },
                {
                    name: 'product3',
                    price: 9,
                    restaurant_id: 1,
                },
                {
                    name: 'product4',
                    price: 3,
                    restaurant_id: 2,
                },
                {
                    name: 'product5',
                    price: 45,
                    restaurant_id: 2,
                },
                {
                    name: 'product6',
                    price: 24,
                    restaurant_id: 3,
                },
                {
                    name: 'product7',
                    price: 10,
                    restaurant_id: 4,
                },
                {
                    name: 'product8',
                    price: 26,
                    restaurant_id: 4,
                },
                {
                    name: 'product9',
                    price: 23,
                    restaurant_id: 4
                }
            ],
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
                    if (item.product.restaurant_id == this.restaurant_id)
                        total += (parseInt(item.product.price) * parseInt(item.product.quantity));
                })
            }
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