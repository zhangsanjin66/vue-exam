<template>
  <div class="block">
    <div class="flex-between">
      <h2>权限配置</h2>
      <el-button type="primary" round size="small" @click="add"
        >添加权限</el-button
      >
    </div>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.title }}</span>
        <span>
          <el-button type="text" size="mini" @click="append(data)">
            增加
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => open(node, data)"
            v-if="!node.childNodes.length"
          >
            删除
          </el-button>
          <el-button type="text" size="mini" @click="() => modify(data)">
            修改
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog title="填加权限" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item
          label="权限名称"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="权限类型"
          :label-width="formLabelWidth"
          prop="type"
        >
          <el-select v-model="form.type" filterable placeholder="请选择">
            <el-option
              v-for="item in types"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="所在目录"
          :label-width="formLabelWidth"
          v-if="flag"
        >
          <el-select v-model="form.pid" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="determine" v-if="createPERmission"
          >确 定</el-button
        >
        <el-button
          type="primary"
          @click="modifypermission"
          v-if="updatePermission"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPermissionListApi,
  createPermissionApi,
  deletePermissionApi,
  updatePermissionApi,
} from "@/api/api";
export default {
  data() {
    const data = [];
    return {
      rules: {
        title: [{ required: true, message: "请输入任务名称", trigger: "blur" }],
        type: [
          { required: true, message: "请选择任务类型", trigger: "change" },
        ],
      },
      data: JSON.parse(JSON.stringify(data)),
      form: {
        id: null,
        title: "",
        type: 1,
        pid: null,
      },
      options: [],
      flag: false,
      createPERmission: false,
      dialogFormVisible: false,
      updatePermission: false,
      formLabelWidth: "120px",
      types: [
        {
          id: 1,
          label: "左侧栏",
        },
        {
          id: 2,
          label: "页面",
        },
        {
          id: 3,
          label: "功能",
        },
      ],
    };
  },
  created() {
    this.getPermissionList();
  },
  methods: {
    async getPermissionList() {
      let res = await getPermissionListApi({ pagination: false });
      console.log(res);
      let data = res.data.data.rows;
      this.options = res.data.data.rows;
      if (res.data.status == 1) {
        data.forEach(
          (item) => (item.children = data.filter((i) => i.pid == item.id))
        );
        this.data = data.filter((s) => !s.pid);
        // data.forEach((item) => {
        //   let parent = data.find((parentItem) => parentItem.id == item.pid);
        //   if (!item.pid) return; //没有pid 就是最高的那级
        //   parent.children = parent.children || [];
        //   parent.children.push(item);
        // });
        // this.data = data.filter((item) => !item.pid);
      } else {
        this.$message.warning("获取失败");
      }
    },
    modify(data) {
      //修改
      this.createPERmission = false;
      this.flag = true;
      this.dialogFormVisible = true;
      this.updatePermission = true;
      this.form.title = data.title;
      this.form.type =
      data.type == 1 ? "左侧栏" : data.type == 2 ? "页面" : "功能";
      this.form.id = data.id;
      this.form.pid = data.pid;
    },
    async modifypermission() {
      const { title, type, pid, id } = this.form;
      let res = await updatePermissionApi({
        title,
        type: type == "左侧栏" ? 1 : type == "页面" ? 2 : 3,
        id,
        pid,
      });
      if (res.data.status == 1) {
        this.getPermissionList();
        this.dialogFormVisible = false;
      }
    },
    getSelectedIds(data) {
      let res = [data.id];
      data.children.forEach((item) => {
        if (item.children.length) {
          let ids = this.getSelectedIds(item);
          if (ids.length) res.push(...ids);
        }
        res.push(item.id);
      });
      return res;
    },
    open(node, data) {
      //删除
      console.log(node);
      this.$confirm("是否确认删除当前任务", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let childrenId = this.getSelectedIds(data);
          deletePermissionApi({ id: childrenId }).then((res) => {
            console.log(res);
            this.getPermissionList();
            this.$message.success("删除成功");
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    initForm() {
      this.form = {
        title: "",
        type: null,
      };
    },
    add() {
      this.dialogFormVisible = true;
      this.initForm();
      this.determine();
      this.createPERmission = true;
      this.updatePermission = false;
      this.flag = false;
    },
    append(data) {
      this.initForm();
      this.form.pid = data.id;
      //点击增加
      this.dialogFormVisible = true;
      this.flag = false;
      this.createPERmission = true;
      this.updatePermission = false;
    },
    async determine() {
      //修改确定按钮
      const { title, type, pid } = this.form;
      let res = await createPermissionApi({ title, type, pid });
      if (res.data.status == 1) {
        this.dialogFormVisible = false;
        this.getPermissionList();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>