import axios from 'axios'

const state = {
  tokens: JSON.parse(localStorage.getItem('SB-Vue-admin')) || {},
  status: '',
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
                axios.defaults.headers.common['x-access-token'] = accessToken
                commit('AUTH_SUCCESS', setDataResp)
               // dispatch(USER_REQUEST)
               console.log('token= ', setDataResp)
               console.log('resp= ', resp)
                resolve(resp)
            })
            .catch(err => {
              console.log('err',err.response)
                commit('AUTH_ERROR', err)
                localStorage.removeItem('user-token')
                reject(err)
            })
        })
    },
    
    AUTH_LOGOUT ({commit, dispatch}) {
        return new Promise((resolve, reject) => {
            commit('AUTH_LOGOUT')
            localStorage.removeItem('SB-Vue-admin')
            // remove the axios default header
            delete axios.defaults.headers.common['x-access-token']
            resolve()
        })
    }
}

export default {
	state,
	mutations,
	actions,
	getters
}