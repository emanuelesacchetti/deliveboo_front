<script>
export default {
    name: 'AppFooter',
    data() {
        return {

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
    <footer class="bg-dark py-5">
        <div class="container">
            <small class="text-white">&COPY; {{ getYear() }} </small>
        </div>
    </footer>
</template>


<style scoped lang="scss"></style>