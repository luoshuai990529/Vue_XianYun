<template>
  <div class="container">
    <!-- 主要内容
        type: 布局模式 可选flex
        justify:flex布局下的水平排列方式
        align:flex布局下的垂直排列方式
    -->
    <el-row type="flex" justify="center" align="middle" class="main">
      <div class="form-wrapper">
        <!-- 表单头部tab -->
        <el-row type="flex" justify="center" class="tabs">
          <span
            :class="{active: currentTab === index}"
            v-for="(item, index) in [`登录`, `注册`]"
            :key="index"
            @click="handleChangeTab(index)"
          >{{item}}</span>
        </el-row>

        <!-- 登录功能组件 -->
        <LoginForm v-if="currentTab == 0" />

        <!-- 注册功能组件 -->
        <RegisterForm v-if="currentTab == 1" @registSucess="registHandler" />
      </div>
    </el-row>
  </div>
</template>

<script>
import LoginForm from "@/components/user/loginForm.vue";
import RegisterForm from "@/components/user/registerForm.vue";
export default {
  components: {
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      currentTab: 0,
    };
  },
  methods: {
    // 切换登录注册处理函数，改变currentTab
    handleChangeTab(index) {
      this.currentTab = index;
    },
    // 处理注册成功后的事件
    registHandler() {
      // 改变currentTab索引
      this.currentTab = 0;
    },
  },
};
</script>

<style scoped lang="less">
.container {
  background: url(http://157.122.54.189:9095/assets/images/th03.jfif) center 0;
  height: 700px;
  min-width: 1000px;

  .main {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    position: relative;

    .form-wrapper {
      width: 400px;
      margin: 0 auto;
      background: #fff;
      box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
      overflow: hidden;

      .tabs {
        span {
          display: block;
          width: 50%;
          height: 50px;
          box-sizing: border-box;
          border-top: 2px #eee solid;
          background: #eee;
          line-height: 48px;
          text-align: center;
          cursor: pointer;
          color: #666;

          &.active {
            color: orange;
            border-top-color: orange;
            background: #fff;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>