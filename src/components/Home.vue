<template>
    <div>
        <navbar></navbar>
        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'Home',
  data () {
    return {
      msg: 'This is the home page'
    }
  },
  components: {
    'navbar': Navbar
  }
}
</script>

<style>
    .geoquizz-nav{
        padding : 50px 5px;
        background-color : grey;
    }
    .geoquizz-nav a{
        color : black;
    }

</style>
