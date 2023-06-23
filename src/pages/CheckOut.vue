<template>

    <ul class="list-group">
        <li v-for="item in this.store.cart" class="list-group-item">{{ item.product.name }}</li>
    </ul>

    <p>totale {{ this.store.cartTotal }}</p>


    <div v-if="isUserPaying">
        <!-- Payment form fields -->
        <input type="email" v-model="email" placeholder="Your email">

        <div id="dropin-container"></div>
        <!-- Submit button -->
        <button id="submit-payment-btn">Conferma pagamento</button>
    </div>
    <button v-else @click="getPaymentData">Paga con carta</button>

</template>

<script>
import axios from 'axios';
import braintree from 'braintree-web';
import { store } from '../store.js';
import dropin from 'braintree-web-drop-in';

export default {
    data() {
        return {
            email: '',
            cardholderName: '',
            isUserPaying: false,
            store

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
                        dropinInstance.requestPaymentMethod(function (err, payload) {
                            // Send the nonce to your Laravel backend for server-side processing
                        
                            axios.post('http://localhost:8000/api/process-payment', {
                                paymentMethodNonce: payload.nonce,
                                total: that.store.cartTotal
                            
                            }).then(response => {

                                if(response.data.success == true) {
    
                                    that.emptyCart();
                                }

                                alert (response.data.message)

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
}
</script>