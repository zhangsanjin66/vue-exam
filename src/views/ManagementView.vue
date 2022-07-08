<template>
  <div class="main">
    <div class="header align-center">
      <img src="../assets/icon-management.png" alt="" /> <span>角色管理</span>
    </div>
    <div class="container">
      <div class="navigation">
        <div class="title flex">
          <div @click="$navigator('usermanagement')">
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
            <el-tab-pane label="角色成员" name="first" class="role">
              <div class="flex-between role-header">
                <div>
                  <span>小千金</span>
                  <span class="el-icon-user"></span>
                  <span>1</span>
                </div>
                <div class="font-color">
                  <span class="el-icon-user"></span>
                  <span>已离职成员</span>
                  <span class="el-icon-user"></span>
                  <span>邀请成员加入本组织</span>
                </div>
              </div>
              <!--  -->
              <div class="flex-between role-container">
                <div class="align-center">
                  <div>
                    <el-select v-model="value" placeholder="请选择">
                      <el-option
                        v-for="item in optionsName"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div>
                    <el-button class="btn"
                      ><img src="@/assets/icon-menus.png" alt=""
                    /></el-button>
                  </div>
                </div>
                <div>
                  <el-button type="primary" class="btn">
                    <span class="el-icon-plus"></span>
                    <span>添加成员</span>
                  </el-button>
                  <el-button class="btn"> 批量导入/导出 </el-button>
                  <el-button class="btn"> 变更部门 </el-button>
                  <el-button class="btn"> 操作离职 </el-button>
                </div>
              </div>
              <!--  -->
              <div class="role-tab">
                <el-table
                  max-height="360"
                  ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" width="80" align="center">
                  </el-table-column>
                  <el-table-column label="姓名" width="150" align="center">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                  </el-table-column>
                  <el-table-column
                    prop="status"
                    label="账号状态"
                    width="200"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="phone"
                    label="手机"
                    align="center"
                    width="300"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="department"
                    label="部门"
                    align="center"
                    width="200"
                  >
                  </el-table-column>
                  <el-table-column align="center" width="100">
                    <el-tag>
                      <span class="el-icon-arrow-left"></span>
                    </el-tag>
                  </el-table-column>
                </el-table>
              </div>
              <div class="role-footer flex-between">
                <div>
                  <el-switch
                    v-model="value1"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                  >
                  </el-switch>
                  仅展示部门的直属成员
                </div>
                <div>
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="1000"
                  >
                  </el-pagination>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="功能权限" name="second">
              <managements-view :dataId="dataId"></managements-view>
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
import { getRoleListApi, getRolegroupListApi } from "@/api/api";
export default {
  components: {
    ManagementsView,
  },
  data() {
    return {
      activeName: "second",
      data: [],
      options: [],
      optionsName: [],
      value: "",
      value1: true,
      groupData: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      roleList: [],
      groupList: [],
      tableData: [
        {
          date: "2016-05-03",
          status: "王小虎",
          phone: "上海市普陀区金沙江路 1518 弄",
          department: "管理",
        },
        {
          date: "2016-05-03",
          status: "王小虎",
          phone: "上海市普陀区金沙江路 1518 弄",
          department: "管理",
        },
        {
          date: "2016-05-03",
          status: "王小虎",
          phone: "上海市普陀区金沙江路 1518 弄",
          department: "管理",
        },
        {
          date: "2016-05-03",
          status: "王小虎",
          phone: "上海市普陀区金沙江路 1518 弄",
          department: "管理",
        },
        {
          date: "2016-05-03",
          status: "王小虎",
          phone: "上海市普陀区金沙江路 1518 弄",
          department: "管理",
        },
        {
          date: "2016-05-03",
          status: "王小虎",
          phone: "上海市普陀区金沙江路 1518 弄",
          department: "管理",
        },
        {
          date: "2016-05-03",
          status: "王小虎",
          phone: "上海市普陀区金沙江路 1518 弄",
          department: "管理",
        },
      ],
      multipleSelection: [],
      dataId: "",
    };
  },
  async created() {
    let res = await getRoleListApi({ pagination: false });
    this.options = res.data.data.rows;
    this.getMenuList();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async getMenuList() {
      let [roleData, groupData] = await Promise.all([
        getRoleListApi({ pagination: false }),
        getRolegroupListApi({ pagination: false }),
      ]);
      this.roleList = roleData.data.data.rows;
      this.groupList = groupData.data.data.rows;
      this.groupList.forEach((item) => {
        item.children = this.roleList.filter((e) => e.groupId == item.id);
        item.children.forEach((el) => {
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
      this.dataId = data.id;
    },
    handleClick(tab, event) {
      console.log(tab, event);
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
        & .font-color {
          color: #87abff;
        }
        & .btn {
          height: 40px;
        }
        & .role-container {
          padding: 10px;
          text-indent: 0;
        }
        & .role-tab {
          & .el-table {
            ::-webkit-scrollbar {
              height: 0;
              width: 0;
            }
          }
        }
        & .role {
          display: grid;
          grid-template-rows: 40px 60px auto 50px;
        }
      }
    }
  }
}
</style>