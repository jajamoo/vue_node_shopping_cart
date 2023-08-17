<template>
  <div v-if="product">
    <div class="img-wrap">
      <img :src="product.imageUrl"/>
    </div>
    <div class="product-details">
      <h1> {{ product.name }} </h1>
      <h3 class="price"> {{ product.price }}</h3>
      <button @click="addToCart" class="add-to-cart" v-if="user && !itemIsInCart">Add to cart</button>
<!--      <button @click="addToCart" class="add-to-cart" v-if="!checkCart(product.id)">Add to cart</button>-->
      <button class="grey-button" v-if="user && itemIsInCart">Item is already in cart</button>
      <button class="sign-in" @click="signIn" v-if="!user">Sign in to add to cart</button>

    </div>
  </div>
  <div v-else>
    <NotFoundPage/>
  </div>


  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Shopping Cart</h5>
        </div>
        <div class="modal-body"> Item added to cart!</div>
      </div>
    </div>
  </div>
</template>

<script>
import NotFoundPage from '@/pages/NotFoundPage.vue'
import axios from "axios";
import {Modal} from 'bootstrap';
import {getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink} from 'firebase/auth'


export default {
  name: "ProductDetailPage",
  components: {NotFoundPage},
  props:['user'],

  data() {
    return {
      product: [],
      cartItems: [],
      cartModal: null,
    }
  },
  computed: {
    itemIsInCart() {
      return this.cartItems.some(item => item.id === this.$route.params.productId);
    }
  },
  watch:{
    async user (newUserValue) {
      if (newUserValue) {
        const cartResponse = await axios.get(`/api/users/${newUserValue.uid}/cart`);
        this.cartItems = cartResponse.data;
      }
    }
  },
  methods: {
    async addToCart() {
      await axios.post('/api/users/12345/cart', {
        id: this.$route.params.productId
      }).then(response => {
        console.log(response.data);
        this.showUniqueModal();
      }).catch(error => {
        console.log(error);
      });
    },

    async signIn() {
      const email = prompt('Please enter email to sign in: ');
      const auth = getAuth();

      const actionCodeSettings = {
        url: `https://localhost:8080/products/${this.$route.params.productId}`,
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);

      alert('A login link was sent to the email you provided');
      window.localStorage.setItem('emailForSignIn', email);
    },

    //this way also works -- pass into a method instead of a computed property
    // checkCart(productId) {
    //   return this.cartItems.some(item => item.id === productId);
    // },
    showUniqueModal() {
      this.cartModal = new Modal(document.getElementById("exampleModal"), {keyboard: false});
      this.cartModal.show();
    },
    closeUniqueModal() {
      this.cartModal.hide();
    },
  },
  async created() {
    const auth = getAuth();
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const email = window.localStorage.getItem('emailForSignIn');
      await signInWithEmailLink(auth, email, window.location. href);

      alert('Successfully Signed In!');

      window.localStorage.removeItem('emailForSignIn');
    }

    const response = await axios.get(`/api/products/${this.$route.params.productId}`);
    this.product = response.data;

    if (this.user) {
      const cartResponse = await axios.get(`/api/users/${this.user.uid}/cart`);
      this.cartItems = cartResponse.data;

    }
  }
}
</script>
