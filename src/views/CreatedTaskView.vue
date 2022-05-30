<template>
  <div class="main">
    <div class="title">创建任务</div>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      :rules="rules"
    >
      <el-form-item label="任务名称 :" label-width="120px" required prop="name">
        <el-input
          v-model="ruleForm.name"
          placeholder="请填写任务名称"
          style="width: 200px"
        ></el-input>
      </el-form-item>
      <el-form-item label="任务时长 :" label-width="120px" required prop="date">
        <el-input v-model="ruleForm.date" style="width: 80px"></el-input>小时
      </el-form-item>
      <el-form-item label="任务描述 :" label-width="120px" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc" rows="8"></el-input>
      </el-form-item>
      <el-form-item label="执行人 :" label-width="120px" required>
        <el-select v-model="value" filterable placeholder="请选择" multiple>
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否紧急 :" label-width="120px" required>
        <el-switch v-model="ruleForm.level"></el-switch>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" @click="createdTask('ruleForm')"
        >创建</el-button
      >
    </div>
  </div>
</template>

<script>
import {
  createdTaskApi,
  queryTaskListApi,
  releaseTaskApi,
  queryUserListApi,
} from "@/api/api";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        region: "",
        date: "",
        level: 1,
        desc: "",
        userId: "",
        taskId: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
          { min: 3, message: "长度在 3个字符以上", trigger: "blur" },
        ],
        date: [
          {
            required: true,
            message: "请填写完成时间",
            trigger: "blur",
          },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
      options: [],
      value: [],
    };
  },
  async created() {
    let res = await queryTaskListApi({});
    console.log(res);
    queryUserListApi({ pagination: false }).then((res) => {
      this.options = res.data.data.data.rows;
      console.log(this.options);
    });
  },
  methods: {
    initFormParams() {
      this.ruleForm = {
        name: "",
        region: "",
        date: "",
        level: 0,
        desc: "",
      };
      this.value = [];
    },
    createdTask(formName) {
      console.log(this.value);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createdTaskApi({
            name: this.ruleForm.name,
            desc: this.ruleForm.desc,
            duration: this.ruleForm.date,
            level: this.ruleForm.level,
          }).then((res) => {
            this.ruleForm.taskId = res.data.data[0].id;
            if (res.data.status == 1) {
              releaseTaskApi({
                userId: this.value,
                taskId: this.ruleForm.taskId,
              }).then((res) => {
                console.log(res);
              });
              this.$message({
                message: "创建成功",
                type: "success",
              });
              this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "查看任务列表",
                cancelButtonText: "继续创建",
                type: "success",
                center: true,
              })
                .then(() => {
                  this.$router.push({
                    name: "jurisdiction",
                  });
                })
                .catch(() => {
                  this.initFormParams();
                });
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  margin: 0 auto;
  padding: 20px;
  width: 50%;
  & .title {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 30px;
  }
  & .demo-ruleForm {
    border-bottom: 1px solid #ccc;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
  }
}
</style>