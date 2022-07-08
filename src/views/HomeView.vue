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
            :src="$store.state.userInfo.avatarImg"
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
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#0c1c35"
            text-color="#fff"
            active-text-color="#ffd04b"
            v-for="item in menu"
            :key="item.id"
          >
            <el-menu-item v-if="!item.children" @click="$navigator(item.path)">
              <div>
                <i :class="item.meta.icon"></i>
                <span>{{ item.lable }}</span>
              </div>
            </el-menu-item>
            <el-submenu :index="item.id" v-else>
              <template slot="title">
                <div>
                  <i :class="item.meta.icon"></i>
                  <span>{{ item.lable }}</span>
                </div>
              </template>

              <el-menu-item-group
                v-for="child in item.children"
                :key="child.id"
              >
                <el-menu-item
                  v-if="child.meta.identifys.includes(identify)"
                  :index="child.id"
                  @click="$navigator(child.path)"
                  >{{ child.lable }}</el-menu-item
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
import menu from "@/config/menu.config";
export default {
  data() {
    return {
      username: "",
      phone: "",
      menu,
      userinfo: {},
      identify: null,
    };
  },
  computed: {
    defaultActive() {
      return this.$route.name;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  created() {
    this.getUserInfo();
    console.log(this.menu);
  },
  methods: {
    async getUserInfo() {
      let res = await getUserInfoApi();
      this.userinfo = res.data.data;
      this.identify = res.data.data.identify;
      this.$store.commit("userInfo", res.data.data);
      this.phone = res.data.data.phone;
      this.$bus.setItem("userinfo", this.userinfo);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
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

