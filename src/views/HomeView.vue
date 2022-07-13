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

          <img class="icon-headportrait" :src="userInfo.avatarImg" alt="" />
          <span>{{ userInfo.phone }}</span>
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
            <el-submenu :index="item.id" v-if="item.flag">
              <template slot="title">
                <div>
                  <i :class="item.meta.icon"></i>
                  <span>{{ item.lable }}</span>
                </div>
              </template>
              <div v-for="child in item.children" :key="child.id">
                <div v-for="item in title" :key="item.id">
                  <template v-if="child.flag">
                    <el-menu-item
                      :index="child.id"
                      @click="$navigator(child.name)"
                      v-if="child.lable == item.title"
                    >
                      {{ child.lable }}
                    </el-menu-item>
                  </template>
                </div>
              </div>
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
import { getUserLogoutApi } from "@/api/api.js";
import menu from "@/config/menu.config";
import { mapState, mapActions } from "vuex";
import router from "@/router";
export default {
  data() {
    return {
      username: "",
      phone: "",
      menu,
      titlelist: [],
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      title: (state) => state.user.title,
    }),
    defaultActive() {
      return this.$route.name;
    },
  },
  async created() {
    await this.getUserInfoApi();
    this.getRolepermissionList();
  },
  methods: {
    ...mapActions(["getUserInfoApi", "getRolepermissionListApi"]),
    async getRolepermissionList() {
      await this.getRolepermissionListApi({
        role: this.userInfo.identify,
      });
      let usertitle = [];
      this.title.forEach((el) => {
        usertitle.push(el.title);
      });
      this.menu = this.menu.map((e) => {
        if (usertitle.includes(e.lable)) {
          e.flag = true;
        } else {
          e.flag = false;
        }
        e.children.forEach((el) => {
          if (usertitle.includes(el.lable)) {
            el.flag = true;
            e.flag = true;
          } else {
            el.flag = false;
          }
        });
        return e;
      });
      let userRout = [];
      this.title.forEach((el) => {
        this.menu.forEach((item) => {
          item.children.filter((rout) => {
            if (rout.lable == el.title) {
              userRout.push(rout);
            }
          });
        });
      });
      this.$store.commit("ROUT", userRout);
      this.$store.state.user.userRout.forEach((el) => {
        router.addRoute("home", el);
      });
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

