<template>
  <!-- eslint-disable -->
    <div>
        <div>
            <b-form-group label="cities">
                <b-form-radio-group v-model="city">
                    <b-form-radio v-for="serie in series.series" :value=serie >{{serie.ville}}</b-form-radio>
                </b-form-radio-group>
            </b-form-group>
        </div>
        <div>
            <b-form-group label="difficulties">
                <b-form-radio-group v-model="difficulty">
                    <b-form-radio value='0' >EASY</b-form-radio>
                    <b-form-radio value='1' >NORMAL</b-form-radio>
                    <b-form-radio value='2' >HARDCORE</b-form-radio>
                </b-form-radio-group>
            </b-form-group>
        </div>
        <div v-if="difficulty === '0'">
            <p>distance &lt; 300 = 5 pts<br>distance &lt; 500 = 3 pts<br>distance &lt; 700 = 1 pts</p>
        </div>
        <div v-if="difficulty === '1'">
            <p>distance &lt; 150 = 5 pts<br>distance &lt; 300 = 3 pts<br>distance &lt; 500 = 1 pts</p>
        </div>
        <div v-if="difficulty === '2'">
            <p>distance &lt; 50 = 5 pts<br>distance &lt; 150 = 3 pts<br>distance &lt; 300 = 1 pts</p>
        </div>
        <h2>Are you ready ? Click to the button below if you think you are !</h2>
        <b-button @click="setGame()"><h1>Start game ! </h1></b-button>
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
      city: {}
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
