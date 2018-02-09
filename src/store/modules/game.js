import api from '@/api'
import ls from 'local-storage'

export default {
  namespaced: true,
  state: {
    difficulty: null,
    series: null,
    city: {},
    photos: [],
    game: null
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
    },
    getGame (state) {
      return state.game
    }
  },
  mutations: {
    setGame (state, data) {
      state.city = data.city
      state.city.photos = data.photos
      state.difficulty = data.difficulty
    },
    initSeries (state, series) {
      state.series = series
    },
    continueGame (state, game) {
      state.game = game
    },
    resetGame (state) {
      state.game = null
    }
  },
  actions: {
    setGame ({commit}, credentials) {
      let nbPhotos = 10
      switch (credentials.difficulty) {
        case '0':
          nbPhotos = 5
          break
        case '1':
          nbPhotos = 10
          break
        case '2':
          nbPhotos = 20
          break
      }
      return api.get('/series/' + credentials.city.id + '?size=' + nbPhotos).then((response) => {
        commit('setGame', {photos: response.data.photos, city: credentials.city, difficulty: credentials.difficulty})
      })
    },
    initSeries ({commit}) {
      api.get('/series').then(response => {
        commit('initSeries', response.data)
      })
    },
    saveGame ({commit}, game) {
      ls.set('game', game)
    },
    removeGame () {
      ls.remove('game')
    },
    continueGame ({commit}) {
      let game = ls.get('game')
      ls.remove('game')
      commit('continueGame', game)
    },
    resetGame ({commit}) {
      commit('resetGame')
    }
  }
}
