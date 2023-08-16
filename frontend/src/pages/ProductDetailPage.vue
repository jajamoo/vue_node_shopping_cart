<template>
  <div v-if="product">
    <div class="img-wrap">
      <img :src="product.imageUrl"/>
    </div>
    <div class="product-details">
      <h1> {{ product.name }} </h1>
      <h3 class="price"> {{ product.price }}</h3>
      <button @click="addToCart" class="add-to-cart">Add to cart</button>
    </div>
  </div>
  <div v-else>
    <NotFoundPage/>
  </div>


  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Event created</h5>
        </div>
        <div class="modal-body"> Item added to cart! </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {products} from "@/temp-data";
import NotFoundPage from '@/pages/NotFoundPage.vue'
import axios from "axios";
import {Modal} from 'bootstrap'

export default {
  name: "ProductDetailPage",
  components: {NotFoundPage},
  data() {
    return {
      product: [],
      cartModal: null,
    }
  },
  methods: {
    async addToCart () {
      await axios.post('/api/users/12345/cart', {
        id: this.$route.params.productId
      }).then(response =>{
        console.log(response.data);
        this.showUniqueModal();
      });
    },
    showUniqueModal() {
      this.cartModal = new Modal(document.getElementById("exampleModal"),{ keyboard: false });
      this.cartModal.show();
    },
    closeUniqueModal() {
      this.cartModal.hide();
    },
  },
  async created() {
    const response = await axios.get(`/api/products/${this.$route.params.productId}`);
    const product = response.data;

    this.product = product;
  }
}
</script>
