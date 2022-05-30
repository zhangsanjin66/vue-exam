<template>
  <div class="home">
    <el-container class="container">
      <el-header class="header flex-between">
        <div class="pr-4 align-center">
          <img class="icon-logo" src="../assets/icon-menu.png" alt="" />
          现代学徒云平台
        </div>
        <div class="pr-4 align-center font-size_12">
          <div>武汉市 2017-07-20 15:00 星期三 21-22℃ 晴 风力 2级 风向 微风</div>
          <img
            class="icon-headportrait"
            src="../assets/icon_avatar.png"
            alt=""
          />
          <span>{{ phone }}</span>
          <img class="icon-close" src="../assets/icon-close.png" alt="" />
          <span @click="signOut">退出</span>
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#0c1c35"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>题库管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="navigator('manage')"
                  >题库管理</el-menu-item
                >
                <el-menu-item index="1-2">html题库</el-menu-item>
                <el-menu-item index="1-3" @click="navigator('about')"
                  >js题库</el-menu-item
                >
                <el-menu-item index="1-4">css题库</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2" @click="navigator('login')">
              <i class="el-icon-menu"></i>
              <span slot="title">匹配比赛</span>
            </el-menu-item>
            <el-menu-item index="3" @click="navigator('register')">
              <i class="el-icon-document"></i>
              <span slot="title">报名系统</span>
            </el-menu-item>
            <el-menu-item index="4" @click="navigator('about')">
              <i class="el-icon-setting"></i>
              <span slot="title">题库类型</span>
            </el-menu-item>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>个人信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-5">修改头像</el-menu-item>
                <el-menu-item index="1-6">修改密码</el-menu-item>
                <el-menu-item index="1-7" @click="navigator('personinfo')"
                  >账号绑定</el-menu-item
                >
                <el-menu-item index="1-8" @click="navigator('chat')"
                  >我的任务</el-menu-item
                >
                <el-menu-item index="1-9" @click="navigator('jurisdiction')"
                  >任务列表</el-menu-item
                >
                <el-menu-item index="1-10" @click="navigator('userlist')"
                  >用户列表</el-menu-item
                >
                <el-menu-item index="1-11" @click="navigator('management')"
                  >权限管理</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


 
<script>
import { getUserLogoutApi, getUserInfoApi } from "@/api/api.js";
export default {
  data() {
    return {
      username: "",
      phone: "",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    navigator(name) {
      if (this.$route.name == name) return;
      this.$router.push({
        name: name,
      });
    },
    async signOut() {
      let res = await getUserLogoutApi();
      console.log(res);
      if (res.data.status == 1) {
        sessionStorage.removeItem("token");
        this.$router.push({
          name: "login",
        });
      }
    },
  },
  async created() {
    let res = await getUserInfoApi();
    this.phone = res.data.data[0].phone;
    console.log(res.data.status);
    if (res.data.status == 401) {
      this.$router.push({
        name: "login",
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.header {
  min-width: 1000px;
  background-color: #3981ed;
  color: #fff;
  & .icon-logo {
    width: 40px;
    height: 30px;
    vertical-align: middle;
  }
  & .icon-headportrait {
    width: 40px;
    height: 40px;
    vertical-align: middle;
    border-radius: 20px;
    margin-left: 15px;
    margin-right: 8px;
  }
  & .icon-close {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-left: 10px;
  }
}
.el-aside {
  background-color: #0c1c35;
  color: #fff;
  height: calc(100vh - 60px);
  max-width: 200px;
  overflow-y: scroll;
}
.title {
  display: flex;
}
.el-main {
  padding: 0;
  height: calc(100vh - 60px);
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>

