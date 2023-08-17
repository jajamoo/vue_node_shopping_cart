import {createApp} from 'vue'
import App from './App.vue'
import './main.css'
import * as VueRouter from 'vue-router'
import ShoppingCartPage from "@/pages/ShoppingCartPage.vue";
import ProductsPage from "@/pages/ProductsPage.vue";
import ProductDetailPage from "@/pages/ProductDetailPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import {initializeApp} from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDHg9vf0Ig9O3qNZpI7KXi21xJbU8j449g",
    authDomain: "olive-oil-95255.firebaseapp.com",
    projectId: "olive-oil-95255",
    storageBucket: "olive-oil-95255.appspot.com",
    messagingSenderId: "99314919602",
    appId: "1:99314919602:web:a3149957c7e07f446d81ab"
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App)
    .use(VueRouter.createRouter({
        history: VueRouter.createWebHistory(process.env.BASE_URL),
        routes: [{
            path: '/cart',
            component: ShoppingCartPage
        }, {
            path: '/products',
            component: ProductsPage
        }, {
            path: '/products/:productId',
            component: ProductDetailPage
        }, {
            path: '/',
            redirect: '/products'
        }, {
            path: '/:pathMatch(.*)*',
            component: NotFoundPage
        }]
    }))
    .mount('#app')
