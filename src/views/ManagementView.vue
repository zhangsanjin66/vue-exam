<template>
  <div class="main">
    <div class="header align-center">
      <img src="../assets/icon-management.png" alt="" /> <span>角色管理</span>
    </div>
    <div class="container">
      <div class="navigation">
        <div class="title flex">
          <div @click="newuser">
            <span class="el-icon-user"></span><span>新增角色</span>
          </div>
          <div>
            <span class="el-icon-user pl-30"></span><span>新建分组</span>
          </div>
        </div>
        <div class="tree">
          <el-tree
            :data="groupList"
            :props="defaultProps"
            @node-click="handleNodeClick"
          >
          </el-tree>
        </div>
      </div>
      <div class="management">
        <div class="title">
          <span class="all pr-5">所有者</span>
          <span class="desc"
            >系统默认角色,默认具有企业所有功能权限和全部数据可见范围</span
          >
        </div>
        <div class="tab">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="角色成员" name="first">
              <span v-for="(item, index) in options" :key="index">
                {{ item.roleName }}
              </span>
            </el-tab-pane>
            <el-tab-pane label="功能权限" name="second">
              <managements-view></managements-view>
            </el-tab-pane>
            <el-tab-pane label="数据范围" name="third">数据范围</el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ManagementsView from "@/components/ManagementsView.vue";
// import Group from "@/assets/data/group";
import { queryRoleListApi, queryRolegroupListApi } from "@/api/api";
export default {
  components: {
    ManagementsView,
  },
  data() {
    return {
      activeName: "second",
      data: [],
      options: [],
      groupData: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      roleList: [],
      groupList: [],
    };
  },
  async created() {
    let res = await queryRoleListApi({ pagination: false });
    console.log(res);
    this.options = res.data.data.rows;
    this.getMenuList();
  },
  methods: {
    async getMenuList() {
      let [roleData, groupData] = await Promise.all([
        queryRoleListApi({ pagination: false }),
        queryRolegroupListApi({ pagination: false }),
      ]);
      this.roleList = roleData.data.data.rows;
      this.groupList = groupData.data.data.rows;
      this.groupList.forEach((item) => {
        item.children = this.roleList.filter((e) => e.groupId == item.id);
        console.log(item.children);
        item.children.forEach((el) => {
          console.log(el);
          el.label = el.roleName;
        });
        item.label = item.groupName;
      });
      // let group = new Group({
      //   groupList,
      //   roleList,
      // });
      // this.data = group.menu;
      // console.log(this.data);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    newuser() {
      this.$router.push({
        name: "usermanagement",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding: 10px;
  display: grid;
  grid-template-rows: 38px auto;
  & .header {
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    color: #727f90;
    min-width: 100px;
  }
  & .container {
    display: grid;
    grid-template-columns: 0.8fr 3.5fr;
    & .navigation {
      border-right: 1px solid #ccc;
      min-width: 250px;
      & .title {
        color: #4c8edd;
        padding: 10px 20px;
      }
      & .tree {
        padding: 10px 20px;
      }
    }
    & .management {
      & .title {
        padding: 10px;
        & .all {
          color: #727f90;
          font-size: 18px;
        }
        & .desc {
          color: #aaaaaa;
          font-size: 14px;
        }
      }
      & .tab {
        padding: 10px;
        text-indent: 10px;
      }
    }
  }
}
</style>