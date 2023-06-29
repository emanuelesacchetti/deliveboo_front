<template>
    <div class="container p-2 mt-3">
        <h1 class="text-center mb-3">Riepilogo ordine</h1>
        <ul class="list-group fw-semibold">
            <li v-for="item in this.store.cart" class="list-group-item">{{ item.product.name }} x{{ item.product.quantity }}
            </li>
        </ul>
        <p class="text-capitalize fw-semibold fs-5 m-3">totale {{ this.store.cartTotal }} &euro;</p>
    </div>

    <div v-if="isUserPaying" class="container">
        <h2>Inserisci qui i tuoi dati</h2>
        <!-- Payment form fields -->
        <div v-show="errors" class="text-danger">
                <ul v-for="error,index in errors ">
                    <li>{{ error[0] }}</li>
                </ul>
        </div>
        
        <!-- Inserimento nome -->
        <div class="mb-3">
            <label for="name" class="form-label">Nome</label>
            <input v-model="orderPayload.name" type="text" class="form-control" id="name"  placeholder="Inserisci qui il tuo nome">
            <div v-show="!orderPayload.name && buttonClicked" class="text-danger">
                Il campo nome è richiesto
            </div>
        </div>

        <!-- Inserimento Indirizzo -->
        <div class="mb-3">
            <label for="Indirizzo" class="form-label">Indirizzo</label>
            <input v-model="orderPayload.address" type="text" class="form-control" id="Indirizzo"  placeholder="Inserisci l'indirizzo per la consegna">
            <div v-show="!orderPayload.address && buttonClicked" class="text-danger">
                L'indirizzo è richiesto
            </div>
        </div>

        <!-- Inserimento E-mail -->
        <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <input v-model="orderPayload.email" type="email" class="form-control" id="email"  placeholder="Inserisci la tua email">
            <div v-show="!orderPayload.email && buttonClicked" class="text-danger">
                L'E-mail è richiesta
            </div>
            <div v-show="(!orderPayload.email.match(/@[^.]*\.(?:com|it)\b/gm)) && buttonClicked" class="text-danger">
                L'E-mail non è valida
            </div>
        </div>

        <!-- Inserimento telefono -->
        <div class="mb-3">
            <label for="phone" class="form-label">Phone</label>
            <input v-model="orderPayload.phone_number" type="number" class="form-control" id="phone" placeholder="Inserisci il tuo recapito">

            <div v-show="!orderPayload.phone_number && buttonClicked" class="text-danger">
                Il contatto telefonico è richiesto
            </div>
            <div v-show="(orderPayload.phone_number > 9999999999) && buttonClicked" class="text-danger">
                Il campo può contenere solo 10 cifre
            </div>
        </div>


        <div id="dropin-container"></div>
        <!-- Submit button -->
        <button id="submit-payment-btn" class="btn btn-warning w-100" @click="buttonClicked = true" :class="{ 'disabled': checkFormValidity }">Conferma pagamento</button>
    </div>
    <div v-else class="container">
        <button @click="getPaymentData" class="btn btn-warning w-100">Procedi con il pagamento</button>
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
        getProducts(){
            let products = [];
            this.store.cart.forEach( item => {
                let product = {
                    id: item.product.id,
                    quantity: item.product.quantity
                }
                products.push(product);
            })
            this.orderPayload.products = products;
        },
        getRestaurantId(){
            if(store.cart.length){
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
                            if(err){
                                submitBtn.classList.remove('disabled');
                            }
                            // Send the nonce to your Laravel backend for server-side processing

                            axios.post('http://localhost:8000/api/process-payment', {
                                paymentMethodNonce: payload.nonce,
                                order: that.orderPayload,
                            }).then(response => {

                                if (response.data.success == true) {
                                    that.emptyCart();
                                    //
                                }else{
                                    submitBtn.classList.remove('disabled');
                                    that.errors = response.data.errors
                                }

                                alert(response.data.message)

                            })


                        })
                    })
                })


            } else {
                console.log('Dropin creation failed: token not found');
            }
            this.isDropinLoading = false;
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
                (this.orderPayload.phone_number)
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