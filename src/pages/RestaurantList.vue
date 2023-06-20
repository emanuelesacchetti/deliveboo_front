<script>
import { store } from '../store.js';
import AppCheckBox from '../components/AppCheckBox.vue';
export default {
    name: 'RestaurantList',
    data() {
        return {
            store,
        }
    },
    components: {
        AppCheckBox,
    }
}
</script>


<template>
    <AppCheckBox />

    <div class="container_general">
        <ul>
            <li v-for="restaurant in this.store.restaurantList">
                {{ restaurant.name }}
            </li>
        </ul>
    </div>
</template>


<style lang="scss" scoped> .container_general {
     display: flex;
     justify-content: center;
 }
</style>