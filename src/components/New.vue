<template>
  <!-- eslint-disable -->
    <div>
        <b-form-group label="Difficulty : ">
            <b-form-radio-group id="btnradios2" buttons button-variant="outline-primary" size="lg" v-model="selected" :options="options"/>
        </b-form-group>
        <div v-if="selected == 0">
            <p>distance &lt; 300 = 5 pts<br>distance &lt; 500 = 3 pts<br>distance &lt; 700 = 1 pts</p>
        </div>
        <div v-if="selected == 1">
            <p>distance &lt; 150 = 5 pts<br>distance &lt; 300 = 3 pts<br>distance &lt; 500 = 1 pts</p>
        </div>
        <div v-if="selected == 2">
            <p>distance &lt; 50 = 5 pts<br>distance &lt; 150 = 3 pts<br>distance &lt; 300 = 1 pts</p>
        </div>
        <h2>Are you ready ? Click to the button below if you think you are !</h2>
        <b-button to="/game"><h1>Start game ! </h1></b-button>
    </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Register',
  data () {
    return {
      msg: 'This is the register page',
      selected: '1',
      options: [
        { text: 'EASY', value: '0' },
        { text: 'NORMAL', value: '1' },
        { text: 'HARD CORE', value: '2' }
      ]
    }
  }
}
</script>
