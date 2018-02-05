<template>
    <div>
        <b-container>
            <b-form @submit="signin()">
                <b-form-group label="Email address :" label-for="exampleInput1" description="We'll never share your email with anyone else.">
                    <b-form-input pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" id="exampleInput1" type="email" required placeholder="ex: john.doe@gmail.com"></b-form-input>
                </b-form-group>
                <b-form-group label="Password :" label-for="exampleInput2" description="Minimum eight characters, at least one letter and one number">
                    <b-form-input pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" id="exampleInput2" type="password" required placeholder="*******">
                    </b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">Submit</b-button>
            </b-form>
        </b-container>
    </div>
</template>

<script>
export default {
  name: 'Signin',
  data () {
    return {
      msg: 'This is the sign in page'
    }
  },
  methods: {
    signin () {
      console.log('sign in')
    }
  }
}
</script>
