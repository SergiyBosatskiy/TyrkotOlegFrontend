<template>
	<v-container grid-list-xl text-xs-center>
      <v-layout row wrap align-center fill-height>
        <v-flex xs10 sm8 md6 lg2 offset-xs1 offset-sm2 offset-md3 offset-lg5>
			 <h2>Вхід в адмінку</h2>
       <h4>{{test}}</h4>
       <br>
      <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="login"
      :rules="nameRules"
      :counter="15"
      label="Логін"
      required
    ></v-text-field>
    <v-text-field
            v-model="password"
            :append-icon="show1 ? 'visibility_off' : 'visibility'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Пароль"
            hint="Не менше 6 символів"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
    <br>
    <v-btn
      :disabled="!valid"
      @click="submit"
    >
      Вхід
    </v-btn>
  </v-form>
        </v-flex>
      </v-layout>
	</v-container>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    data: () => ({
      valid: true,
      login: '',
      password: '',
      show1: false,
      rules: {
          required: value => !!value || 'Пароль обов\'язковий',
          min: v => v.length >= 6 || 'Мінімум 6 символів'
        },
      nameRules: [
        v => !!v || 'Логін обов\'язковий',
        v => (v && v.length <= 15) || 'Логін повинен бути не більше 15 символів'
      ]
    }),
    computed: {
      test (){return this.$store.state.auth.status}
    },
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          const { login, password } = this
          this.$store.dispatch('AUTH_REQUEST', { login, password })
          .then(() => this.$router.push('/'))
          .catch((err) => console.log('Помилка актіонc vuex store вернув реджект ',err))
     } }
    }
  }
</script>
