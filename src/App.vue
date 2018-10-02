<template>
  <v-app>
  	<router-view/>
  </v-app>
</template>

<script>
import axios from 'axios'
import store from './store'
export default {
  name: 'App',
  created: () => {
    axios.interceptors.request.use(function (config) {
      if (store.state.auth.tokens.auth && !store.state.auth.skipInterceptor) {
      if ((store.state.auth.tokens.auth.expires_in - 5) > Math.floor(Date.now()/1000)) {
        //axios.defaults.headers.common['x-access-token'] = store.state.auth.tokens.auth.accessToken
        config.headers = { 'x-access-token': store.state.auth.tokens.auth.accessToken }
        return config
      } else {
        const originRequest = config
        return store.dispatch('REFRESH_TOKEN').then((resp) => {
          console.log('відповідь рефреш токена успіх ', resp)
          originRequest.headers = { 'x-access-token': store.state.auth.tokens.auth.accessToken }
          return Promise.resolve(originRequest)
        })
        .catch((err) => {
          console.log('відовідь рфереш токена помилка  ', err)
          return Promise.reject(err)
        })
      }
    }
      return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

    axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    if (error.response.status === 470) {
      store.dispatch('INVALID_TOKEN')
    }
    return Promise.reject(error);
  });
  }
}
</script>
