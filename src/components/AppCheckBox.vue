<script>
import axios from 'axios';
import { store } from '../store.js';
export default {
    name: 'AppCheckBox',
    data() {
        return {
            store,

        }
    },
    methods: {
        getTypes() {
            axios.get(`${this.store.baseUrl}/api/types`)
                .then(response => {
                    this.store.restaurantTypes = response.data.results;
                    console.log(this.store.restaurantTypes)
                })
        },
        categoryFilter(slug) {

            if (!this.$route.query.types) {
                this.$router.replace({ query: { types: slug } })
                console.log('query inesistente')
            } else {
                let myQuery = this.$route.query.types;
                myQuery = myQuery.split(',');
                let found = false;
                myQuery.forEach(element => {
                    if (element == slug) {
                        found = true;
                    }
                })
                if (found) {
                    myQuery.forEach((element, index) => {
                        if (element == slug) {
                            myQuery.splice(index, 1)
                        }
                    })
                } else {

                    if (myQuery[0] != '') {

                        myQuery.push(slug);
                    } else {
                        myQuery = [slug];
                    }
                }
                if (myQuery.length >= 1) {
                    this.store.selectedRestaurant = [...myQuery];
                    myQuery = myQuery.join(',');
                } else {
                    this.store.selectedRestaurant = [];
                    myQuery = '';
                }
                myQuery = this.$router.replace({ query: { types: myQuery } });
            }

        },
        ifQueryExist(slug) {
            if (this.$route.query.types) {
                return this.$route.query.types.includes(slug)
            }
        },
        scroll(direction) {
            const categoryWindow = document.getElementById('category-window');
            if (direction == 'left' && categoryWindow.scrollLeft > 0) {
                categoryWindow.scroll({
                    top: 0,
                    left: categoryWindow.scrollLeft -= ( window.innerWidth - 250),
                    behavior: "smooth",
                });
            } else if (direction == 'right' && categoryWindow.scrollLeft < categoryWindow.scrollWidth) {
                categoryWindow.scroll({
                    top: 0,
                    left: categoryWindow.scrollLeft += ( window.innerWidth - 250),
                    behavior: "smooth",
                });

            }
        }
    },
    mounted() {
        this.getTypes();
    }

}

</script>

<template>
        <div class="container component-wrapper position-relative">
            <span @click="scroll('left')"
                class="position-absolute top-50 start-0 fs-2 translate-middle-y px-4 py-1 text-bg-dark rounded-circle z-2">
                &langle;
            </span>
            <div class="row overflow-x-auto flex-nowrap row-cols-3 row-cols-md-5 row-cols-lg-6" id="category-window">
                <div class="col text-center py-4 z-1" v-for="restaurantType in store.restaurantTypes"
                    :key="restaurantType.id" @click="categoryFilter(restaurantType.slug)">
                    <div class="restaurant-icon pt-3" :class="{ 'my_color': ifQueryExist(restaurantType.slug) }">
                        <img :src="restaurantType.image" alt="Card image cap" class="  w-50 m-auto ">
                        <div class="card-body">
                            <small class="my_text" :class="{ 'text-light': ifQueryExist(restaurantType.slug) }">{{
                                restaurantType.name }}</small>
                        </div>
                    </div>
                </div>
            </div>
            <span @click="scroll('right')"
                class="position-absolute top-50 end-0 fs-2 translate-middle-y px-4 py-1 text-bg-dark rounded-circle z-2">
                &rangle;
            </span>
        </div>
</template>

<style lang="scss" scoped>
@use '../styles/general.scss';
@use '../partials/variables.scss' as *;
@use '../partials/mixins.scss';

.component-wrapper {
    margin-top: 15vw;
}

.container_check {


    .card {
        border: 1px solid black;

    }
}

.my_background {
    background-color: $primary-color;
    cursor: pointer;
}



.my_text {
    font-size: 13px;
    color: $primary-color;
    font-weight: bolder;
}

.restaurant-icon {
    border-radius: 15px;
    width: 100%;
    aspect-ratio: 1/1;
    cursor: pointer;


}

.restaurant-icon:hover {
    transition: 0.4s;
    scale: 1.2;
}

#category-window::-webkit-scrollbar {
    display: none;
}

.my_color {
    background-color: $primary-color;
    border-radius: 50%;
}
</style>