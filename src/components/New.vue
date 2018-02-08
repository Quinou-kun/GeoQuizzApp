<template>
  <!-- eslint-disable -->
    <div id="new">
        <div id="new-container">
            <b-card bg-variant="dark"
                    header="<h3>Choose the city you think you know</h3>"
                    text-variant="white"
                    class="home-content text-center">
                <b-form-group>
                    <b-form-radio-group v-model="city" buttons button-variant="outline-danger" size="lg">
                        <b-form-radio  v-for="serie in series.series" :value=serie >{{serie.ville}}</b-form-radio>
                    </b-form-radio-group>
                </b-form-group>
            </b-card>

            <b-card bg-variant="dark"
                    header="<h3>Difficulty</h3>"
                    text-variant="white"
                    class="home-content text-center">
                <b-form-group>
                    <b-form-radio-group v-model="difficulty" buttons button-variant="outline-danger" size="lg">
                        <b-form-radio value='0' >EASY</b-form-radio>
                        <b-form-radio value='1' >NORMAL</b-form-radio>
                        <b-form-radio value='2' >HARDCORE</b-form-radio>
                    </b-form-radio-group>
                </b-form-group>
                <div v-if="difficulty === '0'">
                    <b-table striped hover :items="itemsEasy" :fields="fields"></b-table>
                </div>
                <div v-if="difficulty === '1'">
                    <b-table striped hover :items="itemsNormal" :fields="fields"></b-table>
                </div>
                <div v-if="difficulty === '2'">
                    <b-table striped hover :items="itemsHardcore" :fields="fields"></b-table>
                </div>
            </b-card>

            <b-card bg-variant="dark"
                    header="<h3>Are you ready ? Click to the button below if you think you are !</h3>"
                    text-variant="white"
                    class="home-content text-center">
                <b-button @click="setGame()" variant="danger"><h1>Start game ! </h1></b-button>
            </b-card>

        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'

export default {
  name: 'New',
  data () {
    return {
      msg: 'This is the new game page',
      difficulty: '1',
      city: {},
      fields: [ 'DISTANCE', 'POINTS' ],
      itemsEasy: [
        { 'DISTANCE': '300 meters', 'POINTS': '+5'},
        { 'DISTANCE': '500 meters', 'POINTS': '+3'},
        { 'DISTANCE': '700 meters', 'POINTS': '+1'}
      ],
      itemsNormal: [
        { 'DISTANCE': '150 meters', 'POINTS': '+5'},
        { 'DISTANCE': '300 meters', 'POINTS': '+3'},
        { 'DISTANCE': '500 meters', 'POINTS': '+1'}
      ],
      itemsHardcore: [
        { 'DISTANCE': '50 meters', 'POINTS': '+5'},
        { 'DISTANCE': '150 meters', 'POINTS': '+3'},
        { 'DISTANCE': '300 meters', 'POINTS': '+1'}
      ],
    }
  },
  created () {
    this.city = this.series.series[0]
  },
  computed: {
    ...mapGetters({
      series: 'game/getSeries'
    })
  },
  methods: {
    setGame () {
      this.$store.dispatch('game/setGame', {difficulty: this.difficulty, city: this.city}).then(response => {
        this.$router.push({name: 'Game'})
      })
    }
  }
}
</script>

<style>
    #new{
        text-align : center;
        background-color : rgba(0,0,0,0.8);
        color : white;
        height : calc(100% - 140px)
    }

    #new-container{
        width: 50%;
        margin : auto;
    }
</style>
