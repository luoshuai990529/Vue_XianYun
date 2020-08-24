<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit('form')">登录</el-button>
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
      form: {
        username: "", // 登录用户名/手机
        password: "", // 登录密码
      },
      // 表单规则
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 提交登录
    handleLoginSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过
          const data = {
            username: this.form.username,
            password: this.form.password,
          };
          // 将数据存到store中
          // 调用store的commit方法(用于同步操作)把用户的数据传过去 调用user下的setUserInfo方法
          // this.$store.commit("user/setUserInfo", res.data);
          // dispatch方法(用于异步操作)
          this.$store.dispatch("user/loginIn",data).then(res=>{
            // console.log('登录成功');
            this.$message.success("登陆成功")
            this.$router.replace("/")
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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