<template>
    <div id="app">
        <navbar></navbar>
        <router-view/>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'App',
  components: {
    'navbar': Navbar
  },
  created () {
    this.$store.dispatch('game/initSeries')
  }
}
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        margin:0;
        padding:0;
        background: url(http://img15.hostingpics.net/pics/211357IMG6777Copie.jpg) no-repeat center fixed;
        -webkit-background-size: cover;
        background-size: cover;
    }
</style>
