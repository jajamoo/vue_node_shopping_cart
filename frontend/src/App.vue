<template>
<!--  <HelloWorld msg="Welcome to Your Vue.js App, yo!"/>-->
  <NavBar/>
  <div class="page-wrap">
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'App',
  components: {
    NavBar,
  }
};

</script>
