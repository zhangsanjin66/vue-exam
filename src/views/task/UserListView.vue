<template>
  <div class="main">
    <div class="header flex-between">
      <div class="title">
        <h1 class="usertitle">User Management</h1>
        <div class="Rocords">150 Rocords Found</div>
      </div>
      <div class="search">
        <span class="el-icon-refresh"></span>
        <span class="Refresh">Refresh</span>
        <span class="el-icon-search pl-5"></span> <span>Search</span>
      </div>
    </div>
    <div class="list">
      <el-table :data="tableData" style="width: 100%" size="small">
        <el-table-column prop="id" label="id" width="90" align="center">
        </el-table-column>
        <el-table-column prop="name" label="name" width="90" align="center">
        </el-table-column>
        <el-table-column
          prop="avatarName"
          label="avatarName"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="email" label="email" width="160" align="center">
        </el-table-column>
        <el-table-column prop="phone" label="phone" width="155" align="center">
        </el-table-column>
        <el-table-column label="createdAt" width="160" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              new Date(scope.row.createdAt).toLocaleString()
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="sex" width="55" align="center">
        </el-table-column>
        <el-table-column
          prop="provinceNo"
          label="provinceNo"
          width="110"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="cityNo"
          label="cityNo"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="areaNo" label="areaNo" width="80" align="center">
        </el-table-column>
        <el-table-column prop="Loon" width="90" align="center">
          <el-button type="danger" round size="mini">详情</el-button>
        </el-table-column>
        <el-table-column prop="Setup" width="90" align="center">
          <el-button type="success" round size="mini"
            >权限</el-button
          ></el-table-column
        >
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="50"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { queryUserListApi } from "@/api/api";
import cityData from "@/citydata.json";
import formatDate from "@/mixins/formatDate.js";
export default {
  mixins: [formatDate],
  data() {
    return {
      tableData: [
        {
          id: "",
          name: "",
          avatarName: "",
          email: "",
          phone: "",
          sex: "",
          provinceNo: "",
          cityNo: "",
          areaNo: "",
          createdAt: "",
        },
      ],
      pageSize: 10,
      pageNum: 1,
      pagination: true,
    };
  },
  created() {
    this.queryUserList();
  },
  methods: {
    async queryUserList() {
      let res = await queryUserListApi({
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        pagination: this.pagination,
      });
      this.tableData = res.data.data.data.rows;
      console.log(this.tableData);
      this.tableData.forEach((element) => {
        if (element.sex == 1) {
          element.sex = "男";
        } else {
          element.sex = "女";
        }
      });
      cityData.forEach((item) => {
        this.tableData.forEach((element) => {
          if (element.provinceNo == item.code) {
            element.provinceNo = item.name;
          }
        });
        if (item.children) {
          item.children.forEach((el) => {
            this.tableData.forEach((element) => {
              if (element.cityNo == el.code) {
                element.cityNo = el.name;
              }
            });
            if (el.children) {
              el.children.forEach((item) => {
                this.tableData.forEach((element) => {
                  if (element.areaNo == item.code) {
                    element.areaNo = item.name;
                  }
                });
              });
            }
          });
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.queryUserList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.queryUserList();
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding: 0 10px;
  display: grid;
  grid-template-rows: 0.5fr auto 0.5fr;
  & .header {
    padding: 10px 0;
    & .title {
      & .usertitle {
        color: #05007e;
      }
      & .Rocords {
        color: #aeaeae;
        font-size: 6px;
      }
    }
    & .search {
      color: #05007e;
      & .Refresh {
        border-right: 1px solid #62f1ef;
        padding: 5px;
      }
    }
  }
  & .block {
    display: flex;
    justify-content: center;
  }
}
</style>