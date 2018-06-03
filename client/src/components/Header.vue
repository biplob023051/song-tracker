<template>
  <v-toolbar fixed app>
    <v-toolbar-title><router-link to="/">SongTracker</router-link></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn 
        v-if="!$store.state.isUserLoggedIn"
        flat 
        @click="navigateTo({name: 'login'})"
        >Login
      </v-btn>
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat 
        @click="navigateTo({name: 'register'})"
        >Register
      </v-btn>
      <v-btn
        v-if="$store.state.isUserLoggedIn" 
        flat
        >Logout
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>
