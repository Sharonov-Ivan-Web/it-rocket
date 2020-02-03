<template>
  <div class="wrapper">
    <Loader />
    <Header />
    <MainMenu />
    <nuxt />
    <Footer />
  </div>
</template>
<script>
import Loader from '~/components/Loader.vue'
import Header from '~/components/Header.vue'
import MainMenu from '~/components/MainMenu.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Header,
    MainMenu,
    Footer,
    Loader
  }
}
</script>
<style>

</style>
