export default {
  namespaced: true,
  state: {
    difficulty: null
  },
  getters: {
    getDifficulty (state) {
      return state.difficulty
    }
  },
  mutations: {
    setGame (state, dif) {
      state.difficulty = dif
    }
  },
  actions: {
    setGame ({commit}, dif) {
      commit('setGame', dif)
    }
  }
}
