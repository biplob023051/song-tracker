<template>
  <v-layout row wrap>
    <v-flex xs12 md6 offset-md3>
      <v-card>
        <v-toolbar color="indigo" dark>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            v-model="email"
            label="Your Email"
            class="mt-5"
          ></v-text-field>
          <v-text-field
            v-model="password"
            type="password"
            label="Enter Password"
          ></v-text-field>
          <div class="error" v-html="error" />
            <v-btn
              class="blue lighten-2"
              dark
              large
              @click="login"
            >
              Login
            </v-btn>
        </v-card-text>
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
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>
<style scoped>
</style>
