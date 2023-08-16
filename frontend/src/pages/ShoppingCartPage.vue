<template>
  <h1>Shopping Cart Page</h1>
<!-- It's listening for the event that we named in the child component, with the $event passed into the method defined in the script tag in this file -->
  <ShoppingCartList @remove-from-cart="removeFromCart($event)" :products="cartItems"/>
</template>

<script>
// import {cartItems} from "@/temp-data";
import ShoppingCartList from "@/components/ShoppingCartList.vue";
import axios from "axios";

export default {
  name : "ShoppingCartPage",
  components: {
    ShoppingCartList,
  },
  data () {
    return {
      cartItems: [],
    }
  },

  methods: {
    async removeFromCart(productId) {
      const response = await axios.delete(`/api/users/12345/cart/${productId}`);
      const updatedCart = response.data;

      this.cartItems = updatedCart;
    }
  },
  async created() {
    const response = await axios.get('/api/users/12345/cart');
    const cartItems = response.data;

    this.cartItems = cartItems;

  },

}
</script>
