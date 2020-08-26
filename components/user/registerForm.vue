<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机号" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkPassword">
      <el-input placeholder="确认密码" type="password" v-model="form.checkPassword"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    // 密码校验规则
    const validatePass1 = (rule, value, callback) => {
      // 失去焦点判断密码框是否为空
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        // 如果不为空 在校验再次输入密码框
        if (this.form.checkPassword !== "") {
          this.$refs.form.validateField("checkPassword");
        }
        callback();
      }
    };
    // 再次输入密码校验规则
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      form: {
        username: "", // 登录用户名/手机
        password: "", // 登录密码
        checkPassword: "", // 确认密码
        nickname: "", // 昵称
        captcha: "", // 手机验证码
      },

      // 表单规则
      rules: {
        username: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            pattern:/^1[3456789]\d{9}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        password: [
          {
            validator: validatePass1,
            trigger: "blur",
          },
          { min: 3, max: 8, message: "长度在 3 到 8 位字符", trigger: "blur" },
        ],
        checkPassword: [
          {
            validator: validatePass2,
            trigger: "blur",
          },
        ],
        nickname: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur",
          },
        ],
        captcha: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
      //如果用户名手机为空
      // if (!this.form.username) {
      //   this.$confirm("用户名手机号码不能为空", "提示", {
      //     confirmButtonText: "确定",
      //     showCancelButton: false,
      //     type: "warning",
      //   }).then(() => {});
      //   return;
      // }
      // 如果手机号长度不够
      // if (this.form.username.length !== 11) {
      //   this.$confirm("手机号码格式错误", "提示", {
      //     confirmButtonText: "确定",
      //     showCancelButton: false,
      //     type: "warning",
      //   });
      //   return;
      // }
      this.$refs.form.validateField("username", (msg) => {
        if (msg === "") {
          console.log("通过验证，发送验证码");
          this.$axios({
            url: `/captchas`,
            method: "POST",
            data: {
              tel: this.form.username,
            },
          }).then((res) => {
            console.log(res.data);
            const { code } = res.data;
            this.$confirm(`模拟手机验证码为：${code}`, "提示", {
              confirmButtonText: "确定",
              showCancelButton: false,
              type: "warning",
            });
          });
        } else {
          this.$message.warning("手机号码格式有误");
          return;
        }
      });
    },

    // 注册
    handleRegSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // 注册提交
          // 因为参数不需要checkPassword，所以将它解构出来
          const { checkPassword, ...props } = this.form;

          this.$store.dispatch("user/registe", props).then((res) => {
            // console.log(res.data);
            this.$message({
              type: "success",
              message: "注册成功!",
            });
            //情况一： 注册自定义事件给父组件，跳转到登录页
            this.$emit("registSucess");
            //情况二：注册成功后直接让用户变为登录成功的状态
            // 1.因为res返回的就有用户信息
            // 2.直接可以调用mutations中的setUserInfo 设置用户信息方法
            // 3.跳转到首页
            // this.$store.commit("user/setUserInfo",res.data);
            // this.$router.replace("/")
          });
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