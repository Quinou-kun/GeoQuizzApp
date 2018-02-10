<template>
  <div id="continue-container">
    <div id="continue">
        <b-card no-body bg-variant="dark"
                header="<h3>You tried to refresh the game, but it's forbidden !</h3>"
                text-variant="white"
                class="text-center">
        </b-card>
        <b-card no-nody bg-variant="dark"
                text-variant="white"
                class="text-center">
            <div class="choice-button">
                <h4>Want to start a new game ?</h4>
                <b-button size="lg" variant="danger" to="/new">Click here</b-button>
            </div>
            <div class="choice-button">
                <h4>Go home ?</h4>
                <b-button size="lg" variant="danger" to="/">Click here</b-button>
            </div>
        </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      msg: 'This is the Navbar'
    }
  },
  methods: {
    removeGame () {
      this.$store.dispatch('game/removeGame').then((response) => {
        this.$router.push({path: '/'})
      })
    },
    continueGame () {
      this.$store.dispatch('game/continueGame').then((response) => {
        this.$router.push({name: 'Game'}, response)
      })
    }
  }
}
</script>

<style>
    #continue-container{
        background-color : rgba(0,0,0,0.8);
        overflow-y: auto;
        height: calc(100vh - 140px);
    }

    #continue{
        width: 50%;
        margin : auto;
    }
    .choice-button {
        padding : 5%;
        display : inline-block;
    }
</style>
