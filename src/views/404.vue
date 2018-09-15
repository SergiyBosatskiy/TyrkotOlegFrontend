<template>
  <v-app>
	<v-layout align-center justify-center column fill-height>
		<h1>Помилка 404</h1>
		<br>
		<h3>Нажаль, дана сторінка не знайдена :(</h3>
		<br>
		<v-btn outline color="indigo" @click='back'>Повернутись</v-btn>
	</v-layout>
  </v-app>
</template>

<script>
	export default {
		methods: {
			back () {
				this.$router.go(-1)
				// this.$router.push('/')
			}
		}
	}
</script>