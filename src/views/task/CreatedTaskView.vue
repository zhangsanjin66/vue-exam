<template>
  <div>
    <title-component>创建任务</title-component>
    <task-form @submit="createTasks" ref="forms"></task-form>
  </div>
</template>

<script>
import { createdTaskApi, releaseTaskApi } from "@/api/api";
import TaskForm from "@/components/TaskForm.vue";

import TitleComponent from "@/components/TitleComponent.vue";
export default {
  components: { TaskForm, TitleComponent },
  data() {
    return {};
  },
  methods: {
    createTasks(ruleForm, userIds) {
      createdTaskApi({
        name: ruleForm.name,
        desc: ruleForm.desc,
        duration: ruleForm.duration,
        level: ruleForm.level,
      }).then((res) => {
        ruleForm.id = res.data.data[0].id;
        if (res.data.status == 1) {
          releaseTaskApi({
            userIds: userIds,
            taskId: ruleForm.id,
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
              this.$refs.forms.initForm();
            });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>