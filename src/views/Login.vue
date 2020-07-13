<!--
 * @Author: flynn.yang
 * @Date: 2019-07-17 09:50:48
 * @LastEditors: flynn.yang
 * @LastEditTime: 2020-07-10 13:31:55
 * @Description: 
 * @Version: 1.0
 -->
<template>
  <div class="cc-login">
    <div class="cc-login-wrapper">
      <div class="cc-login-form" @keyup.enter="doLogin">
        <el-card shadow="never" title="欢迎登陆">
          <div slot="header" class="clearfix">
            <span>欢迎登陆</span>
          </div>
          <el-form ref="form" :model="form" :rules="rules">
            <el-form-item prop="username">
              <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input autofocus v-model="form.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style="width: 100%"
                size="small"
                @click="doLogin"
                :loading="loading"
              >{{loading ? '正在登陆中...' : '登录'}}</el-button>
            </el-form-item>
            <p style="font-size: 12px;text-align: center;color: #999;">输入任意用户名密码登录</p>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      form: {
        username: "admin",
        password: "123456"
      },
      rules: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },
      loading: false
    };
  },
  computed: {},

  methods: {
    doLogin() {
      console.log(123);
      console.log(this.$route);
      this.$refs.form.validate(async validate => {
        if (validate) {
          this.$axios.post("/login", qs.stringify(this.form)).then(res => {
            console.log(res);
            if (res.code == 0) {
              this.$router.push({ path: "/pages", query: { name: 1 } });
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.cc-login {
  &-wrapper {
    height: 100vh;
    background: url("https://img.ccode.live/image/jpg/login.jpglogin-bg.29b543c1.jpg")
      no-repeat center center;
    background-size: cover;
  }
  &-form {
    width: 330px;
    position: absolute;
    right: 250px;
    top: 50%;
    transform: translateY(-60%);
  }
}
</style>
