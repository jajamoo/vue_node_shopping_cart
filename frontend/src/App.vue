<template>
<!--  <HelloWorld msg="Welcome to Your Vue.js App, yo!"/>-->
  <NavBar :user="user"/>
  <div class="page-wrap">
    <router-view :user="user"></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import {getAuth, onAuthStateChanged} from "firebase/auth";
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'App',
  components: {
    NavBar,
  },

  data(){
    return {
      user:null,
    }
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      this.user = user;
    });
    document.title = "Two Trees Olive Oil";
  }
};

</script>
