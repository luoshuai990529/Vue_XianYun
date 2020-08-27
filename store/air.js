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
    return this.$axios.get("/airs/city", {
        params: {
          name: departCity,
        },
      })
      .then((res) => {
        const cityList = res.data.data.map((v) => {
          return {
            ...v,
            value: v.name
          };
        });
        // 将cityList返回出去，以便在搜索表单可以通过then获取
        return cityList;
      });
  }
};
