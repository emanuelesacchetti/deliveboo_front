<template>
    <div class="container_wrapper">
        <div class="container p-2">
            <h1 class="text-center mb-3">Riepilogo ordine</h1>
            <ul class="list-group fw-semibold">
                <li v-for="item in this.store.cart" class="list-group-item">{{ item.product.name }} x{{
                    item.product.quantity }}
                </li>
            </ul>
            <p class="text-capitalize fw-semibold fs-5 m-3">totale {{ this.store.cartTotal }} &euro;</p>
        </div>

    <div v-if="isUserPaying" class="container">
        <h2>Inserisci qui i tuoi dati</h2>
        <!-- Payment form fields -->
        <div class="mb-3">
            <label for="name" class="form-label">Nome</label>
            <input v-model="orderPayload.name" type="text" class="form-control" id="name" placeholder="Inserisci qui il tuo nome">
        </div>
        <div class="mb-3">
            <label for="Indirizzo" class="form-label">Indirizzo</label>
            <input v-model="orderPayload.address" type="text" class="form-control" id="Indirizzo" placeholder="Inserisci l'indirizzo per la consegna">
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <input v-model="orderPayload.email" type="email" class="form-control" id="email" placeholder="Inserisci la tua email">
        </div>
        <div class="mb-3">
            <label for="phone" class="form-label">Phone</label>
            <input v-model="orderPayload.phone_number" type="email" class="form-control" id="phone" placeholder="Inserisci il tuo recapito">
        </div>

            <div id="dropin-container"></div>
            <!-- Submit button -->
            <div class="container_button">
                <button id="submit-payment-btn">Conferma pagamento</button>
            </div>

        </div>
        <div v-else class="container_button">
            <button @click="getPaymentData" :class="{ 'disabled': !store.cart.length }">Procedi
                con
                il pagamento</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
// import braintree from 'braintree-web';
import { store } from '../store.js';
import dropin from 'braintree-web-drop-in';

export default {
    data() {
        return {
            orderPayload: {
                name: '',
                address: '',
                phone_number: '',
                email: '',
                total: store.cartTotal,
                products: [],
                restaurant_id: null,
            },
            isUserPaying: false,
            store,
            buttonClicked: false,
            errors: null

        }
    },
    methods: {
        getProducts() {
            let products = [];
            this.store.cart.forEach(item => {
                let product = {
                    id: item.product.id,
                    quantity: item.product.quantity
                }
                products.push(product);
            })
            this.orderPayload.products = products;
        },
        getRestaurantId() {
            if (store.cart.length) {
                //da provare this.orderPayload.restaurant_id = this.store.lastVisitedRestaurantId;
                this.orderPayload.restaurant_id = store.cart[0].product.restaurant_id;
            }
        },
        getToken() {
            let token = axios.get('http://localhost:8000/api/generate-client-token')
                .catch(error => {
                    console.log('Token request failed: ' + error.message);
                    return
                });
            return token;
        },
        emptyCart() {

            this.store.cart = [];
            localStorage.setItem('cart', '');

        },
        async getPaymentData() {
            // Create a client-side Braintree instance
            const clientToken = await this.getToken();

            let that = this;
            if (clientToken) {
                this.isUserPaying = true;
                const instance = await dropin.create({
                    authorization: clientToken.data.clientToken,
                    selector: '#dropin-container',
                    locale: 'it_IT'
                }, function (err, dropinInstance) {
                    const submitBtn = document.getElementById('submit-payment-btn');

                    submitBtn.addEventListener('click', function () {
                        this.classList.add('disabled');
                        dropinInstance.requestPaymentMethod(function (err, payload) {
                            if (err) {
                                submitBtn.classList.remove('disabled');
                            }
                            // Send the nonce to your Laravel backend for server-side processing

                            axios.post('http://localhost:8000/api/process-payment', {
                                paymentMethodNonce: payload.nonce,
                                order: that.orderPayload,
                            }).then(response => {

                                if (response.data.success == true) {
                                    that.emptyCart();
                                    that.$router.push({ name: 'checkout-success', params: { orderCode: response.data.orderCode } });
                                } else {
                                    submitBtn.classList.remove('disabled');
                                    that.errors = response.data.errors
                                }
                            })


                        })
                    })
                })


            } else {
                console.log('Dropin creation failed: token not found');
            }
            // this.isDropinLoading = false;
        },
    },
    computed : {

        checkFormValidity() {

        if(this.buttonClicked) {

            if((this.orderPayload.name) && 
                (this.orderPayload.email)&&
                (this.orderPayload.address)&&
                (this.orderPayload.phone_number) &&
                (this.orderPayload.email.match(/@[^.]*\.(?:com|it)\b/gm)) &&
                (this.orderPayload.phone_number.match(/[^0-9]/g))
                ) 
            {
                return '';
            } else {
                return 'disabled';
            }

        }

            
    }

    },
    mounted() {
        this.getProducts();
        this.getRestaurantId();
    }

}
</script>

<style lang="scss" scoped>
@use '../partials/variables.scss' as *;
@use '../partials/mixins.scss';

.container_wrapper {
    margin-top: 40vh;
    margin-bottom: 40vh;
}

button {
    @include mixins.primary-btn;
    border-color: $secondary-color;
}

button:hover {
    @include mixins.btn-hover;
    font-size: 12px;
}

button:active {
    @include mixins.btn-active;
}

.container_button {
    display: flex;
    justify-content: center;
}
</style>