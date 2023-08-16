
<template>
  <div v-if="products.length > 0">
    <div
        class="product-container"
        v-for="product in products"
        :key="product.id"
    >
      <img class="product-image" :src="product.imageUrl" />
      <div class="details-wrap">
        <h3> {{ product.name }} </h3>
        <p> {{ product.price }} </p>
      </div>
      <button class="remove-button">Remove from Cart</button>
    </div>
    <button class="checkout-button">Proceed to Checkout</button>
  </div>
  <div v-else>
    You currently have no items in your cart!
  </div>
</template>


<script>
  export default {
    name: "ShoppingCartList",
    props: ['products']
  }
</script>
