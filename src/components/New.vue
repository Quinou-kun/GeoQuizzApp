<template>
    <div>
        <h1>{{timer}}</h1>
        <h2>Are you ready ? Click to the button below if you think you are !</h2>
        <b-button to="/game"><h1>Start game ! </h1></b-button>
    </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      timer: 5,
      msg: 'This is the register page'
    }
  },
  created () {
    this.count()
  },
  methods: {
    register () {
      console.log('register')
    },
    setTimer (sec) {
      this.timer = sec
    },
    count () {
      let interval = setInterval(() => {
        this.setTimer(this.timer)
        this.timer--
        if (this.timer < 0) {
          clearInterval(interval)
          this.reset()
        }
      }, 1000)
    },
    reset () {
      this.timer = 5
      this.count()
      msg: 'This is the register page'
    }
  },
  methods: {
    register () {
      console.log('register')
    }
  }
}
</script>
