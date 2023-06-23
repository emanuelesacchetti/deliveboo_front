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
        <div class="mb-3">
            <label for="name" class="form-label">Nome</label>
            <input type="text" class="form-control" id="name" placeholder="Inserisci qui il tuo nome">
        </div>
        <div class="mb-3">
            <label for="Indirizzo" class="form-label">Indirizzo</label>
            <input type="text" class="form-control" id="Indirizzo" placeholder="Inserisci l'indirizzo per la consegna">
        </div>
        <div class="mb-3">
            <label for="phone" class="form-label">Num di telefono</label>
            <input type="text" class="form-control" id="phone" placeholder="Inserisci il tuo recapito telefonico">
        </div>

        <div id="dropin-container"></div>
        <!-- Submit button -->
        <button id="submit-payment-btn" class="btn btn-warning w-100" @click="sendForm()">Conferma pagamento</button>
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
            email: '',
            cardholderName: '',
            isUserPaying: false,
            store,
            address: ''

        }
    },
    methods: {
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
                                total: that.store.cartTotal

                            }).then(response => {

                                if (response.data.success == true) {

                                    that.emptyCart();
                                }else{
                                    submitBtn.classList.remove('disabled');
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
        // Invio dati al back per email di conferma
        sendForm() {

            const payload = {
                name: this.cardholderName,
                email: this.email,
                products: this.store.cart,
                price: this.store.total,
                address: this.address

            }

            axios.post(`${this.store.baseUrl}/api/neworder`, payload)
                .then(response => { //200

                    if (response.data.success) {
                        //resetto il form
                        this.name = '';
                        this.email = '';
                        this.products = '';
                        this.address = '';

                    } else {
                        this.errors = response.data.errors;
                        console.log(this.errors);
                    }

                    this.sending = false;

                });

        }
    },
}
</script>