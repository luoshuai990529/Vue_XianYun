/* 
Vue.use(Vuex)
new Vuex.Store({
    state:{},
    mutations:{},
    actions:{}
})
*/

// store下的每个文件都是一个store的实例，不需要去手动创建
// 只需要暴露store的属性(固定写法)
export const state = () => ({
  userInfo: {
    // username: "奥利给老八"
    token: "",
    user: {}
  }
});

// mutation专门用在同步修改仓库数据
export const mutations = {
  // 设置用户的的数据的方法
  setUserInfo(state, data) {
    console.log('调用setUserInfo方法');
    console.log(data);
    state.userInfo = data
  },
  //登出方法
  loginOut(state) {
    state.userInfo.token = "";
    state.userInfo.user = null;
  }
}
// action专门用来做异步修改 仓库数据
// action提交的是mutation，而不是直接变更状态
// action可以包含任意异步操作
// 放公共的异步操作方法
export const actions = {
  loginIn({
    commit
  }, data) {
    console.log('执行action中的loginIn，派发到mutations');
    return this.$axios.post("/accounts/login", data).then((res) => {
      console.log(res.data);
      console.log('将数据存到store中');
      commit("setUserInfo", res.data)
    });
  }
};
