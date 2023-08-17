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
  name: "ShoppingCartPage",
  props: ['user'],
  components: {
    ShoppingCartList,
  },
  data() {
    return {
      cartItems: [],
    }
  },
  watch: {
    async user(newUserValue) {
      if (newUserValue) {
        const cartResponse = await axios.get(`/api/users/${newUserValue.uid}/cart`);
        this.cartItems = cartResponse.data;
      }
    }
  },
  methods: {
    async removeFromCart(productId) {
      const response = await axios.delete(`/api/users/${this.user.uid}/cart/${productId}`);
      this.cartItems = response.data;
    }
  },
  async created() {
    if (this.user) {
      const response = await axios.get(`/api/users/${this.user.uid}/cart`);
      this.cartItems = response.data;
    }
  },

}
</script>
