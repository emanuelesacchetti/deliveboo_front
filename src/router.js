import { createRouter, createWebHistory } from "vue-router";

import AppHome from './pages/AppHome.vue';
import RestaurantList from './pages/RestaurantList.vue';
import SingleRestaurant from './pages/SingleRestaurant.vue';
import SingleProduct from './pages/SingleProduct.vue';
import NotFound from './pages/NotFound.vue';
import LaravelPage from './pages/LaravelPage.vue';

const router = createRouter(
    {
        history: createWebHistory(),
        routes: [
            {
                path: '/',
                name: 'home',
                component: AppHome
            },
            {
                path: '/restaurants',
                name: 'restaurants',
                component: RestaurantList
            },
            {
                path: '/restaurants/:restaurant_id',
                name: 'single-restaurant',
                component: SingleRestaurant
            },
            {
                path: '/restaurants/:rastaurant_id/:product_id',
                name: 'single-product',
                component: SingleProduct
            },
            {
                path: '/:pathMatch(.*)*',
                name: 'not-found',
                component: NotFound
            },
            {
                path: '/laravel',
                name: 'laravel',
                component: LaravelPage
            }
        ]
    }
);

export { router };