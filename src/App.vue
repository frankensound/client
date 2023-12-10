<template>
  <div id="app">
    <button v-if="!isAuthenticated" @click="login">Log In</button>

    <div v-else>
      <p>Welcome, {{ userProfile.name }}</p>
      <button @click="logout">Log Out</button>
      <button @click="fetchProtectedData">Fetch Protected Data</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  data() {
    return {
      userProfile: null,
    };
  },
  computed: {
    isAuthenticated() {
      return this.$auth0.isAuthenticated.value;
    }
  },
  methods: {
    login() {
      this.$auth0.loginWithRedirect();
    },
    logout() {
      this.$auth0.logout({ logoutParams: { returnTo: window.location.origin } });
    },
    async loadUserProfile() {
      if (this.isAuthenticated) {
        this.userProfile = this.$auth0.user;
      }
    },
    async fetchProtectedData() {
      try {
        const token = await this.$auth0.getAccessTokenSilently();
        const response = await axios.get(`${this.$config.VITE_GATEWAY_URL}/jokes/random`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data);
      } catch (error) {
        console.error("API call error or token fetch error:", error);
      }
    }
  },
  watch: {
    isAuthenticated(newValue) {
      if (newValue) {
        this.loadUserProfile();
      } else {
        this.userProfile = null;
      }
    }
  },
  created() {
    this.loadUserProfile();
  }
};
</script>

<style>
</style>