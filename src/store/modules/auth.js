import axios from 'axios'
import router from './../../router'

const state = {
  tokens: JSON.parse(localStorage.getItem('SB-Vue-admin')) || {},
  status: '',
  skipInterceptor: false
}

const getters = {
  isAuthenticated: function (state) {
    if (state.tokens && state.tokens.auth && state.tokens.auth.accessToken && state.tokens.auth.refreshToken && state.tokens.auth.expires_in) {
      return true
    } else {
      return false
    }
  },
  authStatus: state => state.status,
}

const mutations = {
  AUTH_REQUEST (state) {
    state.status = 'loading'
  },
  AUTH_SUCCESS (state, authData) {
    state.status = 'success'
    state.tokens = JSON.parse(authData)
  },
  AUTH_ERROR (state) {
    state.status = 'error'
  },
  AUTH_LOGOUT (state) {
    state.status = ''
    state.tokens = {}
  },
  AUTH_REFRESH_TOKEN (state, refreshData) {
    state.tokens = JSON.parse(refreshData)
  },
  SKIP_INTERCEPTOR (state, toogle) {
    state.skipInterceptor = toogle
  }
}

const actions = {
    AUTH_REQUEST ({commit, dispatch}, user) {
        return new Promise((resolve, reject) => {
            commit('AUTH_REQUEST')
            axios({url: '/adminlogin', data: user, method: 'POST' })
            .then(resp => {
                const { accessToken, refreshToken, expires_in } = resp.data
                const setDataResp = JSON.stringify({ auth: {
                  "accessToken": accessToken, "refreshToken": refreshToken, "expires_in": expires_in
                } })
                localStorage.setItem('SB-Vue-admin', setDataResp)
                // Add the following line:
                // axios.defaults.headers.common['x-access-token'] = accessToken
                commit('AUTH_SUCCESS', setDataResp)
                resolve(resp)
            })
            .catch(err => {
                commit('AUTH_ERROR', err)
                localStorage.removeItem('SB-Vue-admin')
                reject(err)
            })
        })
    },
    REFRESH_TOKEN ({commit, dispatch}) {
      return new Promise((resolve, reject) => {
        commit('SKIP_INTERCEPTOR', true)
        axios({url: '/refresh-token', data: { 'refreshToken': state.tokens.auth.refreshToken }, method: 'POST' })
        .then(resp => {
            const { accessToken, refreshToken, expires_in } = resp.data
            const setDataResp = JSON.stringify({ auth: {
              "accessToken": accessToken, "refreshToken": refreshToken, "expires_in": expires_in
            } })
            localStorage.setItem('SB-Vue-admin', setDataResp)
            commit('AUTH_REFRESH_TOKEN', setDataResp)
            commit('SKIP_INTERCEPTOR', false)
            resolve(resp)
        })
        .catch(err => {
          router.push('/login')
          localStorage.removeItem('SB-Vue-admin')
          commit('SKIP_INTERCEPTOR', false)
          commit('AUTH_LOGOUT')
          reject(err)
        })
      })
    },
    INVALID_TOKEN ({commit, dispatch}) {
      return new Promise((resolve, reject) => {
        router.push('/login')
        commit('AUTH_LOGOUT')
        localStorage.removeItem('SB-Vue-admin')
        resolve()
      })
    },
    AUTH_LOGOUT ({commit, dispatch}) {
        return new Promise((resolve, reject) => {
          axios({url: '/logout', method: 'GET'})
          .then(resp => {
            router.push('/login')
            commit('AUTH_LOGOUT')
            localStorage.removeItem('SB-Vue-admin')
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
        })
    }
}

export default {
	state,
	mutations,
	actions,
	getters
}