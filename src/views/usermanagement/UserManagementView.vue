<template>
  <div class="main">
    <div class="header">
      <span class="title pr-20">新增角色权限</span>
      <span class="el-icon-house jurisdiction"></span>
      <span class="plr-10">·</span>
      <span class="jurisdiction">权限管理</span>
      <span class="plr-10">·</span>
      <span class="jurisdiction">角色与权限</span>
      <span class="plr-10">·</span>
      <span class="jurisdiction">新增角色与权限</span>
    </div>
    <div class="container">
      <div class="title">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="角色名称">
            <el-input
              v-model="formInline.roleName"
              placeholder="请输入新增角色名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属部门">
            <el-select
              v-model="formInline.groupId"
              placeholder="请选择所属部门"
            >
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item.groupName"
                :value="item.id"
              >
                {{ item.groupName }}
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="check">
        <managements-view @add="cart"></managements-view>
      </div>
      <div>
        <el-button type="primary" round @click="submit">创建成功</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import ManagementsView from "@/components/ManagementsView.vue";
import {
  getRolegroupListApi,
  createdRoleApi,
  createjurisdictionApi,
  getrolepermissionApi,
  getRolepermissionListApi,
} from "@/api/api";
export default {
  components: { ManagementsView },
  data() {
    return {
      formInline: {
        roleName: "",
        groupId: "",
      },
      options: [],
      value: {},
      titleData: [],
      permissionId: [],
      rolepermissionlist: [],
    };
  },
  async created() {
    let res = await getRolegroupListApi({ pagination: false });
    this.options = res.data.data.rows;
    let rolepermission = await getrolepermissionApi({ pagination: false });
    console.log(rolepermission);
    let jurisdictionlist = await getRolepermissionListApi({
      role: this.$store.state.userInfo.identify,
    });
    console.log(jurisdictionlist);
    this.rolepermissionlist = rolepermission.data.data.rows;
  },
  methods: {
    cart(menu) {
      let res = [];
      menu.forEach((element) => {
        res = res.concat(element.arr);
      });
      this.titleData = res;

      this.rolepermissionlist.forEach((el) => {
        this.titleData.filter((item) => {
          if (el.title == item) {
            this.permissionId.push(el.id);
          }
        });
      });
    },
    async submit() {
      let Role = await createdRoleApi(this.formInline);
      if (Role.data.status == 1) {
        let res = await createjurisdictionApi({
          permissionId: [...new Set(this.permissionId)],
          roleId: Role.data.data[0].id,
        });
        console.log(res);
        if (res.data.status == 1) {
          this.formInline = {};
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding: 0 20px;
  background-color: #f2f5fa;
  & .header {
    min-width: 395px;
    padding: 20px 0;
    & .title {
      font-weight: bold;
    }
    & .jurisdiction {
      font-size: 12px;
      color: #6d91ec;
    }
  }
  & .container {
    min-width: 700px;
    padding: 0 10px;
    background-color: #ffffff;
    & .check {
      padding-bottom: 10px;
    }
  }
}
</style>