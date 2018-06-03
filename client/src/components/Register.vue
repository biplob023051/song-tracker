<template>
  <v-layout row wrap>
    <v-flex xs12 md6 offset-md3>
      <v-card>
        <v-toolbar color="indigo" dark>
          <v-toolbar-title>Become a member</v-toolbar-title>
        </v-toolbar>
        <form 
          name="register"
          autocomplete="off">
          <v-card-text>
            <span class="title">Please give email and password to signup</span>
            <v-text-field
              v-model="email"
              label="Your Email"
              class="mt-5"
              hint="Valid email required"
            ></v-text-field>
            <v-text-field
              v-model="password"
              type="password"
              label="Enter Password"
              hint="Min 8 and max 25 characters a-zA-Z0-9 allowed"
              autocomplete="new-password"
            ></v-text-field>
            <div class="error" v-html="error" />
              <v-btn
                class="blue lighten-2"
                dark
                large
                @click="register"
              >
                Register
              </v-btn>
          </v-card-text>
        </form>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$$store.dispatch('setUser', response.data.user)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>
<style scoped>
</style>
