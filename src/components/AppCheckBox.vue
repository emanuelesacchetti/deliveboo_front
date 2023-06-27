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
        }
    },
    mounted() {
        this.getTypes();
    }

}
</script>

<template>
    <div class="container py-2">
        <div class="row  row-cols-3 row-cols-md-5 row-cols-lg-8 overflow-auto flex-nowrap border no-scroll">
            <div class="col border text-center py-4" v-for="restaurantType in store.restaurantTypes"
                :key="restaurantType.id" :class="{ 'text-bg-warning': ifQueryExist(restaurantType.slug) }"
                @click="categoryFilter(restaurantType.slug)">

                {{ restaurantType.name }}

            </div>

        </div>

    </div>
</template>

<style lang="scss" scoped>
.container_check {


    .card {
        border: 1px solid black;
        width: calc(100%/10);
        height: 100px;
    }
}

.no-scroll::-webkit-scrollbar {
  display: none;
}

</style>