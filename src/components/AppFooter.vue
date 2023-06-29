<script>
export default {
    name: 'AppFooter',
    data() {
        return {
            developers: [
                {
                    nome: 'Emanuele Sacchetti',
                    git: 'https://github.com/emanuelesacchetti',
                    linkedin: 'https://www.linkedin.com/in/emanuele-sacchetti-5b591b27b/'
                },
                {
                    nome: 'Valerio Salzano',
                    git: 'https://github.com/valeriosalzano',
                    linkedin: 'https://www.linkedin.com/in/valerio-salzano/'
                },
                {
                    nome: 'Giovanni Maiorana',
                    git: 'https://github.com/Giovannimaiorana',
                    linkedin: 'https://www.linkedin.com/in/giovanni-maiorana-316b001b0/'
                },
                {
                    nome: 'Angelo Roudani',
                    git: 'https://github.com/AngeloRoudani',
                    linkedin: 'www.linkedin.com/in/angelo-roudani-2456b6281'
                },
                {
                    nome: 'Giuseppe Suanno',
                    git: 'https://github.com/GiuseppeSU',
                    linkedin: 'https://www.linkedin.com/in/giuseppe-suanno-0860a1181/'
                }
            ]
        }

    },
    methods: {
        getYear() {
            return new Date().getFullYear()
        },
        getImageUrl(img) {
            return new URL(`../assets/img/${img}`, import.meta.url).href;
        }
    }
}
</script>


<template>
    <footer class="container_footer py-5 position-relative">
        <div class="wave-container">
            <img :src="getImageUrl('wave.png')" alt="">
        </div>
        <div class="container">
            <div class="row">
                <span v-for="developer in developers" class="dev-container col-lg-4 col-sm-6">
                    <span>
                        <small>{{ developer.nome }}</small>
                        <a :href="developer.git"><img :src="getImageUrl('github.png')" alt="github logo"></a>
                        <a :href="developer.linkedin"><img :src="getImageUrl('linkedin.png')" alt="linkedin logo"></a>
                        <hr />
                    </span>
                </span>

            </div>
        </div>
    </footer>
</template>


<style scoped lang="scss">
@use '../partials/variables.scss' as *;

.wave-container img {
    position: absolute;
    bottom: 100%;
    left:0;
    width: 100%;
    height: 200px;
}

.dev-container {
    color: $neutral-color;
    text-align: center;

    small {
        margin-right: 10px;
    }

    a {
        padding: 0 5px;
    }

    img {
        width: 1rem;

    }
}

.container_footer {
    margin-top: 100px;
    background-color: $primary-color;
}
</style>