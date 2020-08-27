/* 
Vue.use(Vuex)
new Vuex.Store({
    state:{},
    mutations:{},
    actions:{}
})
*/

export const state = () => ({

});

export const mutations = {

}

export const actions = {
  //   获取来往城市
  getFromCity({
    commit
  }, departCity) {
    // 如果城市值为空，则直接返回resolve([])
    if (!departCity) {
      return Promise.resolve([])
    }

    return this.$axios.get("/airs/city", {
        params: {
          name: departCity,
        },
      })
      .then((res) => {
        const cityList = res.data.data.map((v) => {
          return {
            ...v,
            value: v.name.replace("市", "")
          };
        });
        // 将cityList返回出去，以便在搜索表单可以通过then获取
        return cityList;
      });
  },

  // 获取特价机票
  getCheapTicket() {
    return this.$axios.get("/airs/sale").then(res => {
      return res.data.data;
    })
  }
};
