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
                    linkedin: 'https://www.linkedin.com/in/emanuele-sacchetti-5b591b27b/'
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
        }
    }
}
</script>


<template>
    <div class="wave-container">
        <img src="src/assets/img/wave.png" alt="">
    </div>
    <footer class="container_footer py-5 ">
        <div class="container">
            <div class="row">
                <span v-for="developer in developers" class="dev-container col-lg-4 col-sm-6">
                    <span>
                        <small>{{ developer.nome }}</small>
                        <a :href="developer.git"><img src="src/assets/img/github.png" alt="github logo"></a>
                        <a :href="developer.linkedin"><img src="src/assets/img/linkedin.png" alt="linkedin logo"></a>
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
    background-color: $primary-color;
}
</style>