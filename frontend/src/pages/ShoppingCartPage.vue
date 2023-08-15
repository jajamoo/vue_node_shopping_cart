<template>
  <h1>Shopping Cart Page</h1>
  <ShoppingCartList :products="cartItems"/>
</template>

<script>
import {cartItems} from "@/temp-data";
import ShoppingCartList from "@/components/ShoppingCartList.vue";
export default {
  name : "ShoppingCartPage",
  components: {
    ShoppingCartList,
  },
  data () {
    return {
      cartItems,
    }
  }
}
</script>
