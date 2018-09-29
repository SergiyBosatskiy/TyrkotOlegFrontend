<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
        <blockquote>
          <li><router-link to="/login">Products</router-link></li>
          <v-btn color="success" @click='tt'>test api</v-btn>
          &#8220;First, solve the problem. Then, write the code.&#8221;
          <footer>
            <small>
              <em>&mdash;John Johnson</em>
            </small>
            <p>{{qqq}}</p>
          </footer>
        </blockquote>
      </v-layout>
    </v-slide-y-transition>
    <button @click="logout">Вийти</button>
  </v-container>
</template>
<script>
  import axios from 'axios'
  export default {
    computed: {
      qqq: function(){ return this.$store.state.auth }
    },
    methods: {
      tt () {
      	// axios.defaults.headers.common['x-access-token'] = this.$store.state.auth.tokens.auth.accessToken
        axios.post('/test', {provirka: 'mememeemem'}).then(r=>{
        	console.log('axios ', r)
        }).catch((e)=>{console.log('helloworld ',e.response.data.message)})      },
        logout () {
      this.$store.dispatch('AUTH_LOGOUT')
      .then(()=>this.$router.push('/login'))
    }
    },
    
  }


</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
