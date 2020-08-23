<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item">
      <el-input placeholder="用户名/手机"></el-input>
    </el-form-item>

    <el-form-item class="form-item">
      <el-input placeholder="密码" type="password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
/* 
1. 在`components/user`中新建`loginForm.vue`表单组件
2. 使用`Element-ui`的 [form](https://element.eleme.cn/#/zh-CN/component/form) 表单组件进行表单验证
   1. 输入框失去焦点时,自动验证
   2. 点击登录按钮时, 再次验证
   3. 将 `token` 缓存到  `vuex`  中
 */
export default {
  data() {
    return {
      // 表单数据
      form: {},
      // 表单规则
      rules: {},
    };
  },
  methods: {
    // 提交登录
    handleLoginSubmit() {
      console.log(this.form);
    },
  },
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>