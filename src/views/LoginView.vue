<template>
  <div class="login flex-center">
    <div class="popup flex-center">
      <div class="logo flex-colum">
        <div class="icon-logo shadow">H5</div>
        <div class="decs mt-20">mobideo</div>
        <div class="mt-20">DIGITIZING INDUSTRIAL SERVICES</div>
      </div>
      <div class="from">
        <div>
          <div class="lable">USERNAME</div>
          <el-input v-model="username" placeholder="请输入账号"></el-input>
        </div>
        <div class="mt-10">
          <div class="lable">PASSWORD</div>
          <el-input
            v-model="password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </div>
        <div class="mt-10 flex-between">
          <el-input
            placeholder="请输入验证码"
            max-length="4"
            v-model="captcha"
            class="captcha"
          ></el-input>
          <img @click="getCaptcha" :src="captchaSrc" alt="" />
        </div>
        <div class="flex-between">
          <router-link to="">忘记密码</router-link>
          <router-link to="/register">注册密码</router-link>
        </div>
        <el-button class="mt-30" type="primary" @click="submit"
          >LOGIN</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { encrypt } from "@/assets/utils";
import { getUserLoginApi, getCaptchaApi } from "@/api/api.js";
export default {
  data() {
    return {
      username: "zhangxin",
      password: "123456789",
      captcha: "",
      captchaSrc: "/api/captcha",
    };
  },
  created() {
    this.keyupSubmit();
  },
  methods: {
    keyupSubmit() {
      document.onkeydown = () => {
        let _key = window.event.keyCode;
        //!this.clickState是防止用户重复点击回车
        if (_key === 13 && !this.clickState) {
          this.submit();
        }
      };
    },
    getCaptcha() {
      this.captchaSrc = getCaptchaApi();
    },
    getValidateResult() {
      var res = { result: true };
      if (this.username == "") {
        this.$message();
        res.result = false;
        res.message = { type: "warning", message: "用户名不能为空" };
      } else if (this.password == "") {
        res.result = false;
        res.message = { type: "warning", message: "密码不能为空" };
      } else if (this.captcha == "") {
        res.result = false;
        res.message = { type: "warning", message: "验证码不能为空" };
      } else if (5 > this.username.length || this.username.length > 16) {
        res.result = false;
        res.message = { type: "warning", message: "用户名长度应该在6-15之间" };
      } else if (5 > this.password.length || this.password.length > 16) {
        res.result = false;
        res.message = { type: "warning", message: "密码长度应该在6-15之间" };
      } else if (this.captcha.length != 4) {
        res.result = false;
        res.message = { type: "warning", message: "验证码输入不正确" };
      } else if (/(\W)/.test(this.username)) {
        res.result = false;
        res.message = { type: "warning", message: "用户名有非法字符" };
      }
      if (!res.result) this.$message(res.message);
      return res.result;
    },
    async submit() {
      // 校验  input框里的值是否符合要求
      var isValidate = this.getValidateResult();
      if (!isValidate) return;
      const { username, password, captcha } = this;
      //如果符合  就调用服务端借口
      let res = await getUserLoginApi({
        username: username,
        password: encrypt(password),
        captcha: captcha,
      });
      //登录成功
      if (res.data.status == 1) {
        this.$message({
          message: "登陆成功",
          type: "success",
        });
        sessionStorage.setItem("token", res.data.data);
        this.$router.push({
          name: "chat",
        });
      } else {
        //登录失败
        this.$message({
          message: res.data,
          type: "warning",
        });
        this.getCaptcha();
      }
    },
    registerPassword() {
      this.$router.push({
        name: "register",
      });
    },
  },
};
</script>
<style scoped lang='scss'>
.login {
  height: 100vh;
  background-color: #f5f8fd;
  & .popup {
    width: 800px;
    display: grid;
    grid-template-columns: 2.7fr 3fr;
    border: 14px solid #1e80e1;
    padding: 40px;
    color: #0c80e7;
    font-size: 12px;
    gap: 0 30px;
    & .logo {
      height: 478px;
      background-color: #1e80e1;
      min-width: 200px;
      transform: skewX(-10deg) translateX(40px);
      z-index: 100;
      color: #fff;
      & .icon-logo {
        padding: 20px;
        font-size: 60px;
        box-sizing: border-box;
        transform: skewX(10deg);
      }
    }
    & .from {
      min-height: 50%;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 50px;
      box-sizing: border-box;
      & .lable {
        padding: 10px 0;
      }
      & .captcha {
        min-width: 100px;
      }
    }
  }
}
</style>