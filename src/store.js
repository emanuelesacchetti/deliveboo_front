import { reactive } from "vue"

export const store = reactive({
    baseUrl: 'http://localhost:8000',
    restaurantList: [],//Lista Ristoranti delle categorie selezionate   
    restaurantTypes: [],//categorie di ristocazzi
    selectedRestaurant: [],//categorie Filtrate ristoranti
})