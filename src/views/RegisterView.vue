<template>
  <div class="register flex-center">
    <div class="step shadow">
      <el-container class="container">
        <el-header class="align-center">
          <div>注册</div>
        </el-header>
        <el-main class="main shadow flex-column">
          <el-steps
            class="steps"
            :active="active"
            finish-status="success"
            align-center
          >
            <el-step title="注册账号"></el-step>
            <el-step title="注册成功"></el-step>
          </el-steps>
          <div v-show="isRegister">
            <div class="align-center">
              <label class="Mandatory">*</label>
              <el-input
                prefix-icon="el-icon-user-solid"
                class="mt-15"
                v-model="username"
                placeholder="请输入用户名"
              ></el-input>
            </div>
            <div class="align-center">
              <label class="Mandatory">*</label>
              <el-input
                prefix-icon="el-icon-user-solid"
                class="mt-15"
                v-model="password"
                placeholder="请输入密码"
                show-password
              ></el-input>
            </div>
            <div class="align-center">
              <label class="Mandatory">*</label>
              <el-input
                prefix-icon="el-icon-user-solid"
                class="mt-15"
                v-model="passwords"
                placeholder="请再次输入密码"
                show-password
              ></el-input>
            </div>
            <div class="align-center">
              <label class="Mandatory">*</label>
              <el-input
                prefix-icon="el-icon-user-solid"
                class="mt-15"
                v-model="email"
                placeholder="请输入邮箱"
                email
              ></el-input>
            </div>
            <div class="align-center">
              <label class="Mandatory">*</label>
              <el-input
                prefix-icon="el-icon-user-solid"
                class="mt-15"
                v-model="phone"
                placeholder="请输入手机号"
              ></el-input>
            </div>
            <div class="align-center">
              <label class="Mandatory">*</label>
              <el-input
                prefix-icon="el-icon-user-solid"
                class="mt-15"
                v-model="name"
                placeholder="请输入真实姓名"
              ></el-input>
            </div>
            <div class="align-center">
              <label class="Mandatory">*</label>
              <el-input
                prefix-icon="el-icon-user-solid"
                class="mt-15 pr-5"
                v-model="captcha"
                placeholder="请输入验证码"
              ></el-input>
              <img @click="getCaptch" :src="captchaSrc" alt="" />
            </div>
            <el-button
              class="btn"
              style="margin-top: 12px"
              @click="next"
              type="primary"
              >注册</el-button
            >
          </div>
          <div v-show="!isRegister" class="flex-colum">
            <i class="el-icon-circle-check"></i>
            <p>{{ count }}</p>
            <el-button type="primary" plain @click="confirm">确认</el-button>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import { encrypt } from "@/assets/utils";
import {
  getUserLoginApi,
  getUserRegisterApi,
  getCaptchaApi,
} from "@/api/api.js";
export default {
  name: "RegisterView",
  data() {
    return {
      active: 1,
      username: "",
      password: "",
      passwords: "",
      captcha: "",
      email: "",
      phone: "",
      name: "",
      captchaSrc: "/api/captcha",
      isRegister: true,
      count: "恭喜您注册成功,还有3秒跳转首页",
      timer: null,
    };
  },
  created() {
    this.keyupSubmit(); //键盘监听回车事件
  },
  methods: {
    keyupSubmit() {
      //键盘监听回车事件
      document.onkeydown = () => {
        let _key = window.event.keyCode;
        //!this.clickState是防止用户重复点击回车
        if (_key === 13 && !this.clickState) {
          this.next();
        }
      };
    },
    //校验input框
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
      } else if (this.email == "") {
        res.result = false;
        res.message = { type: "warning", message: "邮箱不能为空" };
      } else if (this.phone == "") {
        res.result = false;
        res.message = { type: "warning", message: "邮箱不能为空" };
      } else if (this.passwords == "") {
        res.result = false;
        res.message = { type: "warning", message: "再次输入密码不能为空" };
      } else if (this.password != this.passwords) {
        res.result = false;
        res.message = { type: "warning", message: "两次密码输入不正确" };
      } else if (/(\W)/.test(this.username)) {
        res.result = false;
        res.message = { type: "warning", message: "用户名有非法字符" };
      }
      if (!res.result) this.$message(res.message);
      return res.result;
    },

    //调用登录的接口
    async getTokenSessionStorage() {
      let res = await getUserLoginApi({
        username: this.username,
        password: encrypt(this.password),
        captcha: this.captcha,
      });
      if (res.data.status == 1) {
        sessionStorage.setItem("token", res.data.data);
      }
      console.log(res);
    },

    async next() {
      if (this.active++ > 1) this.active = 0;
      var isValidate = this.getValidateResult();
      if (!isValidate) return;
      const { username, password, captcha, email, phone, name } = this;
      //如果符合  就调用服务端借口
      let res = await getUserRegisterApi({
        username: username,
        password: password,
        captcha: captcha,
        email: email,
        phone: phone,
        name: name,
      });
      //如果注册成功
      if (res.data.status == 1) {
        this.$message({
          message: "注册成功",
          type: "success",
        });
        this.active = 2;
        this.isRegister = false;
        let second = 3;
        this.getTokenSessionStorage();
        this.timer = setInterval(() => {
          //倒计时3秒跳转
          second--;
          this.count = `恭喜您注册成功,还有${second}秒跳转首页`;
          if (second == 0) {
            // console.log(this.timer);
            this.$router.push({
              name: "home",
            });
          }
        }, 1000);
      } else {
        console.log("失败");
        this.$message({
          type: "warning",
          message: res.data.msg,
        });
        this.getCaptch();
      }
    },
    //获取验证码
    getCaptch() {
      this.captchaSrc = getCaptchaApi();
    },
    //点击确定按钮跳转
    confirm() {
      this.getTokenSessionStorage();
      this.$router.push({
        name: "home",
      });
    },
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss" scoped>
.register {
  height: 100vh;
  background-color: #fefefe;
  padding: 0 60px;
  & .step {
    background-color: #f9f9fd;
    border-radius: 4px;
    min-width: 800px;
    padding: 0 60px;
    & .container {
      height: 100%;
      padding-bottom: 60px;
      & .main {
        background-color: #fff;
        padding: 15px 30%;
        & .steps {
          width: 100%;
        }
        & .btn {
          width: 100%;
        }
        & .Mandatory {
          color: #ff4400;
        }
      }
    }
  }
}
</style>