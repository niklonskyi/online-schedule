<template>
  <div>
    <Header/>

    <main>
      <router-view/>
    </main>

    <Footer/>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default defineComponent({
  name: "app",
  components: {
    Header,
    Footer
  },
});
</script>