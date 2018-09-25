<template>
  <v-app>
  	<router-view/>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  created: () => {
    axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log('zapros')
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

    axios.interceptors.response.use(function (response) {
    // Do something with response data
    console.log('otvet ', response)
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
  }
}
</script>
