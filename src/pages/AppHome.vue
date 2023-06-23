<script>
import AppCategory from '../components/AppCategory.vue';
import AppCarousel from '../components/AppCarousel.vue';
export default {
    name: 'AppHome',
    components: {
        
        AppCategory,
        AppCarousel
    }
}
</script>


<template>
    <div class="position-relative">           
        <AppCarousel />
        <AppCategory />
    </div>

</template>


<style lang="scss" scoped>
    .appSearch{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50% , -50%);
    }
</style>