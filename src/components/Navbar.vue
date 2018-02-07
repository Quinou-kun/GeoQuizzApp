<template>
  <div>
      <b-navbar class="geoquizz-navbar" toggleable="md" type="dark">
          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
          <router-link to="/">
              <b-navbar-brand href="/">
              <img src="../assets/logo/logo.png" alt="GEOQUIZZ">
              </b-navbar-brand>
          </router-link>
          <b-collapse is-nav id="nav_collapse">
              <!-- Right aligned nav items -->
              <b-navbar-nav v-if="$route.path !== '/game'" class="ml-auto mr-5">
                  <b-nav-item to="/" exact class="mr-3">Home</b-nav-item>
                  <b-nav-item to="/new" exact class="mr-3">New Game</b-nav-item>
              </b-navbar-nav>
              <b-navbar-nav v-else class="ml-auto mr-5">
                  <b-nav-item to="/" exact class="mr-3">Quit game</b-nav-item>
              </b-navbar-nav>
          </b-collapse>
      </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      msg: 'This is the Navbar'
    }
  }
}
</script>

<style>
    .geoquizz-navbar{
        height : 140px;
        padding : 30px;
        font-size : 1.5em;
    }

</style>
