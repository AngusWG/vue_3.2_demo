import { login as loginAPI } from '@/apis/login'
import router from '@/router'

export default {
    namespaced: true,
    state: () => ({
        token: localStorage.getItem('token') || ''
    }),
    mutations: {
        setToken(state, token) {
            state.token = token
            localStorage.setItem('token', token)
        }
    },
    actions: {
        login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                loginAPI(userInfo)
                    .then(response => {
                        console.log(response)
                        commit('setToken', response.token)
                        router.replace('/')
                        resolve()
                    })
                    .catch(error => { reject(error) })
            })
        }
    }
}
