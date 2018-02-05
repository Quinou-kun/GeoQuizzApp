<template>
    <div>
        <b-button to="/game"><h1>Start game ! </h1></b-button>
    </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
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
