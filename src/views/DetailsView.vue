<template>
  <div class="main">
    <div class="nav">
      <div class="header flex-between">
        <div class="align-center">
          <el-tag> <span class="el-icon-s-fold"></span> </el-tag><span>#1</span>
        </div>
        <div class="align-center">
          <span class="pr-5"><img src="../assets/icon-eye.png" alt="" /></span>
          <span>一人关注</span>
          <span class="el-icon-caret-bottom"></span>
          <span class="plr-15">|</span>
          <span><img src="../assets/icon-fangda.png" alt="" /></span>
          <span class="plr-15"
            ><img src="../assets/icon-fenxiang.png" alt=""
          /></span>
          <span><img src="../assets/icon-shenglue.png" alt="" /></span>
        </div>
      </div>
      <h3>任务测试</h3>
      <div class="btn">
        <el-button plain icon="el-icon-edit" size="small">编辑描述</el-button>
        <el-button plain icon="el-icon-upload2" size="small"
          >上传附件</el-button
        >
        <el-button plain icon="el-icon-edit" size="small"
          >关联代码仓库</el-button
        >
        <el-button plain icon="el-icon-edit" size="small">阻塞关系</el-button>
        <el-button plain icon="el-icon-edit" size="small">引用资源</el-button>
      </div>
      <div class="container">
        <el-descriptions :column="2" border size="small ">
          <el-descriptions-item label="任务描述">{{
            this.form.desc
          }}</el-descriptions-item>
          <el-descriptions-item label="已经领取人" :span="2">
            <span v-for="(item, index) in form.receivedData" :key="index">
              {{ item.userName }}
            </span>
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="journal">
        <el-descriptions direction="vertical" :column="1" border size="small">
          <el-descriptions-item label="活动日志">
            <el-timeline
              class="timer"
              v-for="(activity, index) in activities"
              :key="index"
            >
              <el-timeline-item>
                {{ activity.userName }} 创建了 {{ activity.taskName }}
                <span class="time">
                  {{ new Date(activity.createdAt).toLocaleString() }}
                </span>
              </el-timeline-item>
              <el-timeline-item>
                {{ activity.userName }}重新分配给了
                <span
                  v-for="(item, index) in activity.receivedData"
                  :key="index"
                  >{{ item.userName }},</span
                >
              </el-timeline-item>
              <el-timeline-item>
                <span
                  v-for="(item, index) in activity.receivedData"
                  :key="index"
                >
                  {{ item.userName }}
                  <template v-if="item.completedAt == null">
                    更新了处理状态 未开始
                  </template>
                  <template v-else> 更新了处理状态 已完成 </template>
                </span>
              </el-timeline-item>
            </el-timeline>
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="quill-wrap">
        <quill-editor ref="myQuillEditor" v-model="content" />
      </div>
    </div>
    <div class="aside">
      <div class="item">
        <div class="pd-5">
          <div class="pt-10 pb-10">项目</div>
          <div>
            <img src="@/assets/icon-dengpao.png" alt="" />
            {{ this.form.taskName }}
          </div>
        </div>
        <div class="pd-5">
          <div class="pt-10 pb-10">状态</div>
          <div>
            <el-tag>未开始</el-tag>
          </div>
        </div>
        <div class="pd-5">
          <div class="pt-10 pb-10">处理人</div>
          <div class="pt-10">
            <span class="pd-10 portrait">18</span>
            <span> {{ this.form.userName }}</span>
          </div>
        </div>
        <div class="pd-5">
          <div class="pt-10 pb-10">所属需求</div>
          <div>未关联需求</div>
        </div>
        <div class="pd-5">
          <div class="pt-10 pb-10">迭代</div>
          <div>未规划进迭代</div>
        </div>
      </div>
      <div class="item">
        <div class="pd-5">
          <div class="pt-10 pb-10">优先级</div>
          <div>
            <img src="@/assets/icon-dengpao.png" alt="" />
            中
          </div>
        </div>
        <div class="pd-5">
          <div class="pt-10 pb-10">截止日期</div>
          <div>未指定</div>
        </div>
        <div class="pd-5">
          <div class="pt-10 pb-10">标签</div>
          <div class="pt-10">
            <span class="el-icon-plus"></span>
          </div>
        </div>
        <div class="pd-5">
          <div class="pt-10 pb-10">腾讯会议</div>
          <div>
            <span> 快速回忆 </span>
            <span>预定会议</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryTaskDetailApi } from "@/api/api";
import "quill/dist/quill.snow.css";
import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      content: "",
      form: {
        desc: "",
        levelName: "",
        duration: "",
        createdAt: "",
        taskName: "",
        userName: "",
        receivedData: [],
      },
      activities: [],
    };
  },
  async created() {
    let res = await queryTaskDetailApi({
      taskId: this.$route.query.taskId,
    });
    this.form = res.data.data;
    this.activities.push(res.data.data);
    console.log(res.data.data);
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding: 0 10px;
  display: grid;
  grid-template-columns: auto 200px;
  & .nav {
    & .header {
      padding: 5px 0;
      color: #b4bdc7;
      font-size: 12px;
    }
    & .btn {
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
    }
    & .container {
      & .comment {
        border: 1px solid #ccc;
        & .title {
          padding: 5px;
          border-bottom: 1px solid #ccc;
        }
      }
    }
    & .journal {
      & .time {
        font-size: 12px;
        color: #868f9d;
      }
    }
    & .ql-container {
      min-height: 300px;
    }
    & .quill-editor {
      width: 1120px;
    }
  }
  & .aside {
    font-size: 12px;
    padding: 5px 15px;
    background-color: #fcfcfd;
    border-bottom: 1px solid #ccc;
    & .item {
      border-bottom: 1px solid #ccc;
    }
    & .portrait {
      background-color: #5f6c81;
      border-radius: 50%;
    }
  }
}
</style>