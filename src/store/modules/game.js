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
    setGame (state, data) {
      state.city = data.city
      state.city.photos = data.photos
      state.difficulty = data.difficulty
    },
    initSeries (state, series) {
      state.series = series
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
    }
  }
}
