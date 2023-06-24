<script>
export default {
    name: 'AppMain',
}
</script>

<template>
    <div class="container_main">
        <div class="wave_up">
            <img src="/src/assets/img/wave.svg" alt="wave">
        </div>
        <div class="container-fluid general_container p-5">
            <div class="row text-center ">
                <h1>Come Ordinare su DELIVEBOO</h1>
            </div>
            <div class="row d-flex justify-content-center">
                <div class="col-md-4 col-sm-12">
                    <img src="src/assets/img/indirizzoicon.svg" alt="">
                    <h5>Inserisci i tuoi dati di spedizione </h5>
                    <p>Inserisci i tuoi dati e la tua Posizione</p>
                </div>
                <div class="col-md-4 col-sm-12">
                    <img src="src/assets/img/paymenticon.svg" alt="">
                    <h5>Paga</h5>
                    <p>DeliveBoo accetta solo pagamenti con carta di credito</p>
                </div>
                <div class="col-md-4 col-sm-12">
                    <img src="src/assets/img/eaticon.svg" alt="">
                    <h5>Preparati a gustare i piatti scelti</h5>
                    <p>Aspetta comodo sul divano il nostro fattorino </p>
                </div>
            </div>
        </div>
        <div class="wave_bottom">
            <img src="/src/assets/img/wave.svg" alt="wave">
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container_main {
    position: relative;
}

.general_container {
    //background: linear-gradient(to bottom, rgb(255, 255, 255)50%, rgb(33, 37, 41));
    background-color: #FEA50B;
    z-index: 99;
}

//da sistemare con posiion
.wave_up {
    margin-bottom: -100px;
}

.wave_bottom {
    margin-top: -70px;
    transform: rotate(180deg);
}
</style>