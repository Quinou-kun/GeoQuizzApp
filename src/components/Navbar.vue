<template>
  <div>
      <b-navbar class="geoquizz-navbar" toggleable="md" type="dark" variant="info">
          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
<<<<<<< HEAD
          <b-navbar-brand href="#">GEOQUIZZ</b-navbar-brand>
          <b-collapse is-nav id="nav_collapse">
              <!-- Right aligned nav items -->
              <b-navbar-nav class="ml-auto mr-5">
                  <b-nav-item to="/" class="mr-3">Home</b-nav-item>
                  <b-nav-item to="/new" class="mr-3">New Game</b-nav-item>
                  <b-nav-item to="/signin" class="mr-3">Log In</b-nav-item>
=======
          <b-navbar-brand href="/">GEOQUIZZ</b-navbar-brand>
          <b-collapse is-nav id="nav_collapse">
              <!-- Right aligned nav items -->
              <b-navbar-nav class="ml-auto mr-5">
                  <b-nav-item to="/" exact class="mr-3">Home</b-nav-item>
                  <b-nav-item to="/new" exact class="mr-3">New Game</b-nav-item>
                  <b-nav-item to="/signin" exact class="mr-3">Log In</b-nav-item>
>>>>>>> fd3a70b1241758a46271b9e8dc973c974acea504
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
        padding : 30px;
        font-size : 1.5em;
    }

</style>
