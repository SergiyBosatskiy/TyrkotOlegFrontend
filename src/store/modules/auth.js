import axios from 'axios'

const state = {
  token: localStorage.getItem('user-token') || '',
  status: '',
}

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
}

const mutations = {
  AUTH_REQUEST (state) {
    state.status = 'loading'
  },
  AUTH_SUCCESS (state, token) {
    state.status = 'success'
    state.token = token
  },
  AUTH_ERROR (state) {
    state.status = 'error'
  },
}

const actions = {

    AUTH_REQUEST ({commit, dispatch}, user) {
        return new Promise((resolve, reject) => {
            commit('AUTH_REQUEST')
            axios({url: '/adminlogin', data: user, method: 'POST' })
            .then(resp => {
                const token = resp.data.token
                localStorage.setItem('user-token', token)
                // Add the following line:
                axios.defaults.headers.common['x-access-token'] = token
                commit('AUTH_SUCCESS', token)
               // dispatch(USER_REQUEST)
               console.log('token= ', token)
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
            commit(AUTH_LOGOUT)
            localStorage.removeItem('user-token')
            // remove the axios default header
            delete axios.defaults.headers.common['Authorization']
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