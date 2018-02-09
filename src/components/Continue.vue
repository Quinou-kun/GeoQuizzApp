<template>
  <div id="continue-container">
    <div id="continue">
        <b-card no-body bg-variant="dark"
                header="<h3>Hey ! We had saved a current game, what do you want to do ?</h3>"
                text-variant="white"
                class="text-center">
        </b-card>
        <b-card no-nody bg-variant="dark"
                text-variant="white"
                class="text-center">
            <div class="choice-button">
                <h4>Want to continue this game?</h4>
                <b-button size="lg" variant="danger" @click="continueGame()">Click here</b-button>
            </div>
            <div class="choice-button">
                <h4>Give up this game ?</h4>
                <b-button size="lg" variant="danger" @click="removeGame()">Click here</b-button>
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
