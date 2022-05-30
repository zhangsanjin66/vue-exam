<template>
  <div class="main">
    <div class="title">
      <div class="align-center">
        <div class="mr-5">
          任务名称:
          <el-input
            placeholder="请输入要搜索的内容"
            prefix-icon="el-icon-search"
            class="input"
            v-model="search"
          >
          </el-input>
        </div>
        <div class="mr-5">
          创建时间:
          <el-date-picker
            v-model="value2"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="center"
            class="input"
          >
          </el-date-picker>
        </div>
        <div class="mr-5">
          任务执行人
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in optionSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <el-button type="primary" @click="searchTaskName">搜索</el-button>
          <el-button>清空</el-button>
        </div>
      </div>
      <!-- <div class="icon-right">
        <span class="el-icon-s-cooperation logo-icon"></span>
        <span class="el-icon-s-tools icon-s"></span>
        <span class="el-icon-delete-solid logo-icon"></span>
      </div> -->
    </div>
    <div class="list">
      <el-table
        :data="tableData"
        size="mini"
        @selection-change="handleSelectionChange"
        tooltip-effect="dark"
        ref="multipleTable"
        >>
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column width="100" align="center" label="id">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          align="center"
          label="任务名称"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.taskName }}</span>
          </template>
        </el-table-column>
        <el-table-column width="100" align="center" label="状态">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <span v-if="scope.row.level == 1" class="level-red" size="medium"
                >紧急</span
              >
              <span v-else class="level-green" size="medium">普通</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          align="center"
          label="用户名"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <span size="medium">{{ scope.row.userName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          align="center"
          label="任务详情"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.desc }}</span>
          </template>
        </el-table-column>

        <el-table-column width="70" align="center" label="任务时长">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <span size="medium">{{ scope.row.duration }}小时</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="230" align="center" label="发布时间">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <span size="medium">{{
                new Date(scope.row.createdAt).toLocaleString()
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="70" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag type="success" v-if="scope.row.isReceived == 1"
                >已领取</el-tag
              >
              <el-tag v-else type="danger">未领取</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="300" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-link
                @click="details(scope.row)"
                type="primary"
                :underline="false"
                >查看详情</el-link
              >
              <el-link
                class="release"
                type="primary"
                :underline="false"
                @click="publishTask(scope.row)"
                >发布任务</el-link
              >
              <el-link
                v-if="scope.row.isReceived == 0"
                type="primary"
                :underline="false"
                @click="receiveTask(scope.row)"
                >领取任务</el-link
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-select v-model="value" filterable placeholder="请选择" multiple>
          <el-option
            v-for="(item, index) in obj"
            :key="index"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="define">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="footer flex-between">
      <div>一共{{ this.count }}条 共{{ this.pageCount }}页</div>
      <div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="count"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  queryTaskListApi,
  queryUserListApi,
  releaseTaskApi,
  queryTaskDetailApi,
} from "@/api/api";
export default {
  data() {
    return {
      dialogVisible: false,
      search: "",
      value2: "",
      optionSelect: [],
      tableData: [
        {
          id: "",
          createdAt: "",
          taskName: "",
          userName: "",
          desc: "",
          level: "",
          isReceived: null,
          duration: "",
        },
      ],
      taskId: "",
      pageSize: 10,
      pageNum: 1,
      pageCount: "",
      count: 0,
      checked: false,
      options: [],
      userId: [],
      obj: [],
      value: "",
    };
  },
  async created() {
    let res = await queryUserListApi({ pagination: false });
    this.options = res.data.data.data.rows;
    console.log(this.options);
    this.queryTaskList();
  },
  methods: {
    searchTaskName() {
      this.queryTaskList();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    async queryTaskList() {
      let res = await queryTaskListApi({
        pagination: true,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        taskName: this.search,
      });
      console.log(res);
      this.tableData = res.data.data.rows;
      this.pageCount = res.data.data.pageCount;
      this.count = res.data.data.count;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.queryTaskList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.queryTaskList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    details(item) {
      this.$router.push({
        name: "details",
        query: {
          taskId: item.id,  
        },
      });
    },
    receiveTask(item) {
      console.log(item);
      this.$confirm("确认是否领取该任务", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          releaseTaskApi({
            userId: [63],
            taskId: item.id,
          }).then((res) => {
            if (res.data.status == 1) {
              item.isReceived = 1;
              this.queryTaskList();
            }
            console.log(res);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async publishTask(item) {
      this.userId = [];
      this.taskId = item.id;
      this.dialogVisible = true;
      var arr = [];
      let res = await queryTaskDetailApi({
        taskId: item.id,
      });
      console.log(res);
      console.log(this.options);
      this.options.forEach((items) => {
        if (!res.data.data.receivedData.find((i) => i.userId == items.id)) {
          arr.push(items);
          this.obj = arr;
        }
      });
    },
    async define() {
      let res = await releaseTaskApi({
        userId: this.userId,
        taskId: this.taskId,
      });
      if (res.data.status == 1) {
        this.queryTaskList();
        this.dialogVisible = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding: 0 15px;
  display: grid;
  grid-template-rows: 0.5fr auto 50px;
  & .title {
    & .input {
      width: 300px;
      margin: 5px 0;
    }
  }
  & .icon-right {
    // border: 1px solid #ccc;
    // border-radius: 20px;
    & .logo-icon {
      padding: 0 8px;
    }
    & .icon-s {
      border-left: 2px solid #ccc;
      border-right: 2px solid #ccc;
      padding: 5px;
    }
  }
  & .list {
    & .star {
      padding: 0 10px;
    }
    & .level-green {
      color: green;
      padding: 40px 20px;
    }
    & .level-red {
      color: red;
      padding: 20px;
    }
    & .release {
      padding: 10px;
    }
  }
}
::v-deep .el-input__inner {
  background-color: #f5f6fa;
  border-radius: 20px;
}
</style>