<template>
    <div class="container_wrapper">
        <div v-if="paymentLoading" class="my-5 text-center">
            <h1 class="display-6 p-2 text-dark rounded-3 my-3">Stiamo processando il pagamento</h1>
            <img src="src/assets/img/loadingDots.gif" alt="">
        </div>
        <div v-else-if="store.cartTotal">
            <div class="container p-2">
                <h1 class="text-center mb-5 display-4">Riepilogo ordine</h1>
                <ul class="list-group p-2">
                    <li v-for="item in this.store.cart" class="list-group-item">{{ item.product.name }} x{{
                        item.product.quantity }}
                    </li>
                </ul>
                <p class="text-capitalize fw-semibold fs-3 my-3 px-4">
                    Totale: {{ this.store.cartTotal }} &euro;
                </p>
            </div>


            <div v-if="isUserPaying" class="container">
                <h2 class="text-center">Inserisci qui i tuoi dati</h2>
                <!-- Payment form fields -->
                <div v-show="errors" class="text-danger">
                    <ul v-for="error, index in errors ">
                        <li>{{ error[0] }}</li>
                    </ul>
                </div>

                <!-- Inserimento nome -->
                <div class="mb-3">
                    <label for="name" class="form-label">Nome</label>
                    <input v-model="orderPayload.name" type="text" class="form-control" id="name"
                        placeholder="Inserisci qui il tuo nome" @focusin="inputs.name.shown = true"
                        @focusout="inputs.name.shown = false"
                        :class="{ 'is-valid': orderPayload.name, 'is-invalid': !orderPayload.name }">
                    <small v-show="inputs.name.shown">
                        <span v-show="!orderPayload.name">Il campo nome è richiesto.</span>
                    </small>
                </div>

                <!-- Inserimento Indirizzo -->
                <div class="mb-3">
                    <label for="Indirizzo" class="form-label">Indirizzo</label>
                    <input v-model="orderPayload.address" type="text" class="form-control" id="Indirizzo"
                        placeholder="Inserisci l'indirizzo per la consegna" @focusin="inputs.address.shown = true"
                        @focusout="inputs.address.shown = false"
                        :class="{ 'is-valid': orderPayload.address, 'is-invalid': !orderPayload.address }">
                    <small v-show="inputs.address.shown">
                        <span v-show="!orderPayload.address">L'indirizzo è richiesto.</span>
                    </small>
                </div>

                <!-- Inserimento E-mail -->
                <div class="mb-3">
                    <label for="email" class="form-label">E-mail</label>
                    <input v-model="orderPayload.email" type="email" class="form-control" id="email"
                        placeholder="Inserisci la tua email" @focusin="inputs.email.shown = true"
                        @focusout="inputs.email.shown = false"
                        :class="{ 'is-valid': orderPayload.email && inputs.email.hasValidFormat, 'is-invalid': !orderPayload.email || !inputs.email.hasValidFormat }">
                    <small v-show="inputs.email.shown">
                        <span v-show="!orderPayload.email">Il campo email è obbligatorio.</span>
                        <span v-show="!inputs.email.hasValidFormat && orderPayload.email"> Inserisci un formato
                            valido.</span>
                    </small>
                </div>

                <!-- Inserimento telefono -->
                <div class="mb-3">
                    <label for="phone" class="form-label">Phone</label>
                    <input v-model="orderPayload.phone_number" type="text" class="form-control" id="phone"
                        placeholder="Inserisci il tuo recapito" @focusin="inputs.phone_number.shown = true"
                        @focusout="inputs.phone_number.shown = false"
                        :class="{ 'is-valid': orderPayload.phone_number && inputs.phone_number.hasValidFormat && inputs.phone_number.hasValidLength, 'is-invalid': !(orderPayload.phone_number && inputs.phone_number.hasValidFormat && inputs.phone_number.hasValidLength) }">
                    <small v-show="inputs.phone_number.shown">
                        <span v-show="!orderPayload.phone_number">Il numero di telefono è richiesto.</span>
                        <span v-show="!inputs.phone_number.hasValidFormat && orderPayload.phone_number"> Sono ammessi solo
                            numeri.</span>
                        <span v-show="!inputs.phone_number.hasValidLength && orderPayload.phone_number"> Il numero deve essere di 10 cifre.</span>
                    </small>
                </div>


                <div id="dropin-container"></div>
                <!-- Submit button -->
                <div class="text-center">
                    <button id="submit-payment-btn" class="btn" @click="buttonClicked = true"
                        :class="{ 'disabled': (!isFormValid || paymentLoading) }">
                        Conferma pagamento
                    </button>
                    <p v-show="!isFormValid">
                        <small> Compila correttamente il form</small>
                    </p>
                </div>
            </div>
            <div v-else class="container d-flex justify-content-center">
                <button @click="getPaymentData" class="btn">
                    Procedi con il pagamento
                </button>

            </div>
        </div>
        <div v-else class="py-5 container d-flex justify-content-center flex-wrap">
            <p class="w-100 text-center fs-3">Ops! Si è verificato un errore...</p>
            <router-link to="/" class="d-flex btn">
                <button id="submit-payment-btn" class="d-flex ">
                    Torna alla Home
                </button>
            </router-link>
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
            inputs: {
                name: {
                    shown: false,
                },
                address: {
                    shown: false,
                },
                phone_number: {
                    shown: false,
                    hasValidLength: false,
                    hasValidFormat: false,
                },
                email: {
                    shown: false,
                    hasValidFormat: false,
                },
            },
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
            errors: null,
            paymentLoading: false,
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
                this.orderPayload.restaurant_id = store.cart[0].product.restaurant_id;
            }
        },
        getToken() {
            let token = axios.get('http://localhost:8000/api/generate-client-token')
                .catch(error => {
                    return
                });
            return token;
        },
        emptyCart() {

            this.store.cart = [];
            localStorage.setItem('cart', '');

        },
        async getPaymentData() {
            // richiedo il token al back
            const clientToken = await this.getToken();

            let that = this;
            if (clientToken) {
                //genero il form
                this.isUserPaying = true;
                //creo istanza di braintree
                const instance = await dropin.create({
                    authorization: clientToken.data.clientToken,
                    selector: '#dropin-container',
                    locale: 'it_IT'
                }, function (err, dropinInstance) {
                    if (err) {
                        //errori durante la creazione del dropin
                        console.log('Dropin creation failed.')
                    }

                    const submitBtn = document.getElementById('submit-payment-btn');
                    submitBtn.addEventListener('click', function () {
                        //invio i dati al back al click su submit
                        dropinInstance.requestPaymentMethod(function (err, payload) {
                            if (err) {
                                //errore durante la richiesta del metodo di pagamento
                                that.paymentLoading = false;
                            } else {
                                // Invio dei dati al back
                                that.paymentLoading = true;
                                axios.post('http://localhost:8000/api/process-payment', {
                                    paymentMethodNonce: payload.nonce,
                                    order: that.orderPayload,

                                }).then(response => {
                                    that.paymentLoading = false;
                                    //esito pagamento
                                    if (response.data.success == true) {
                                        that.emptyCart();
                                        that.$router.push({ name: 'checkout-success', params: { orderCode: response.data.orderCode } });
                                    } else {
                                        submitBtn.classList.remove('disabled');
                                    }
                                })
                            }

                        })
                    });
                })
            } else {
                console.log('Client token not found');
            }
        },
    },
    computed: {
        isFormValid() {
            let formValidity = true;

            //verifica campi vuoti
            let payload = this.orderPayload;
            if (!(payload.name && payload.address && payload.email && payload.phone_number)) {
                formValidity = false;
            }

            //phone_number
            let phone = this.inputs.phone_number;
            phone.hasValidFormat = !payload.phone_number.match(/[^0-9]/g);
            phone.hasValidLength = payload.phone_number.length == 10;
            if (!phone.hasValidFormat) {
                formValidity = false;
            }
            //email
            let email = this.inputs.email;
            email.hasValidFormat = payload.email.match(/@[^.]*\.(?:com|it)\b/gm) ? true : false;
            if (!email.hasValidFormat) {
                formValidity = false;
            }

            return formValidity
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
    margin: 200px 0;
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