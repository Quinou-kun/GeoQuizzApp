import api from '@/api'

export default {
  namespaced: true,
  state: {
    difficulty: null,
    series: null,
    city: {},
    photos: []
  },
  getters: {
    getDifficulty (state) {
      return state.difficulty
    },
    getCity (state) {
      return state.city
    },
    getPhotos (state) {
      return state.photos
    },
    getSeries (state) {
      return state.series
    }
  },
  mutations: {
    setGame (state, credentials) {
      state.difficulty = credentials.difficulty
      state.city = credentials.city
    },
    initSeries (state, series) {
      state.series = series
    }
  },
  actions: {
    setGame ({commit}, credentials) {
      commit('setGame', credentials)
    },
    initSeries ({commit}) {
      api.get('/series').then(response => {
        commit('initSeries', response.data)
      })
    }
  }
}
