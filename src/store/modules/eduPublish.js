const eduPublish = {
  namespaced: true,
  state: {
    eduInfo: {},
    eduChapter: {},
    eduFinalPublish: {}
  },
  mutations: {
    setInfo:  (state, payload) => {
        state.eduInfo = payload
      }
  },
  actions: {

  }
}

export default eduPublish
