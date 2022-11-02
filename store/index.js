export const state = () => ({
  menus: [],
})

export const getters = {
    isAuthenticated(state) {
      return state.auth.loggedIn
    },
    loggedInUser(state) {
      return state.auth.user
    },
    getMenus: state => {
      return state.menus;
    },
  }

  export const mutations = {
    SET_Menus (state, menus) {
        state.menus = menus
    }
  }

  export const actions = {
    async nuxtServerInit ({commit, dispatch}) {
      await dispatch('loadMenus')
    },
    async loadMenus ({ commit }) {
        await this.$axios
            .$get(this.$config.apiURL +'/api/menus/1?populate=*&nested')
            .then(response => response.data)
            .then(menus => {
            commit('SET_Menus', menus)
        })
    }
}

