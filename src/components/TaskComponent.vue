<template>
  <div class="main">
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
      <el-form-item
        label="任务时长 :"
        label-width="120px"
        required
        prop="duration"
      >
        <el-input v-model="ruleForm.duration" style="width: 80px"></el-input
        >小时
      </el-form-item>
      <el-form-item label="任务描述 :" label-width="120px" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc" rows="8"></el-input>
      </el-form-item>
      <el-form-item label="执行人 :" label-width="120px" required>
        <el-select
          v-model="ruleForm.userId"
          filterable
          placeholder="请选择"
          multiple
        >
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
      <el-button type="primary" @click="createdTask">确定</el-button>
    </el-form>
  </div>
</template>

<script>
// import { queryTaskListApi, queryUserListApi } from "@/api/api";
export default {
  props: ["options"],
  data() {
    return {
      ruleForm: {
        name: "",
        duration: "",
        level: 1,
        desc: "",
        id: "",
        userId: [],
      },
      rules: {
        name: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
          { min: 3, message: "长度在 3个字符以上", trigger: "blur" },
        ],
        duration: [
          {
            required: true,
            message: "请填写完成时间",
            trigger: "blur",
          },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
      value: [],
    };
  },

  methods: {
    createdTask() {
      this.$emit("createTasks", this.ruleForm);
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
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
    align-items: flex-start;
  }
}
</style>