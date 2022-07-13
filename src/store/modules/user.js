import { removeToken } from '@/utils/auth'
import router from '@/router'
// import { apiSysUserInfo } from '@/api/sys'
import { Message } from 'element-ui'

const state = {
  userinfo: null
}

const mutations = {
  SET_USERINFO: (state, data) => {
    state.userinfo = data
  }
}

const actions = {
  async getInfo({ commit, state }) {
    if (state.userinfo) return
    try {
      // const data = await apiSysUserInfo()
      commit('SET_USERINFO', {})
    } catch (error) {
      Message.error(error.message)
    }
  },

  logout({ commit, state }) {
    removeToken()
    commit('SET_USERINFO', null)
    router.replace('/login')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
