<template>
  <div>
    <div class="flex-between main">
      <el-upload
        class="avatar-uploader"
        action="/api/upload/image"
        :data="{ type: 2 }"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div>
        <img class="picture" :src="imageUrl" alt="" />
      </div>
      <div class="bbb">
        <div
          v-for="(item, index) in fileList"
          :key="index"
          @click="sum(item.url, index)"
          :class="{ active: active == index }"
          id="picture"
        >
          <img class="icon-moren" :src="item.url" alt="" />
        </div>
      </div>
    </div>
    <el-button type="primary" @click="open">修改</el-button>
  </div>
</template>

<script>
import { updateUserInfoApi, AvatarListApi } from "@/api/api.js";
export default {
  data() {
    return {
      imageUrl: "",
      avatarImg: "",
      dialogVisible: false,
      fileList: [],
      active: false,
    };
  },
  created() {
    this.getuserinfo();

    this.$store.dispatch("getUserInfoApi").then((res) => {
      this.imageUrl = res.data.data.avatarImg;
    });
  },
  methods: {
    async getuserinfo() {
      let res = await AvatarListApi();
      this.fileList = res.data.data;
      console.log(res.data.data);
    },
    open() {
      this.$confirm("是否修改头像", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          updateUserInfoApi({ avatarImg: this.avatarImg }).then((res) => {
            console.log(res);
            this.$store.dispatch("getUserInfoApi").then((e) => {
              this.$store.commit("userInfo", e.data.data);
            });
          });
          this.$message({
            type: "success",
            message: "修改成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改",
          });
        });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.avatarImg = res.data;
    },
    beforeAvatarUpload(file) {
      const isPng = file.type === "image/png";
      const isLt200kb = file.size / 1024 < 200;
      if (!isPng) {
        this.$message.error("上传头像图片只能是 png 格式!");
      }
      if (!isLt200kb) {
        this.$message.error("上传头像图片大小不能超过 200kb!");
      }
      return isPng && isLt200kb;
    },
    sum(url, index) {
      this.avatarImg = url;
      this.active = index;
    },
  },
};
</script>

<style>
.active {
  border: 2px solid red;
}
.bbb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.icon-moren {
  width: 130px;
  height: 130px;
}
.picture {
  width: 150px;
  height: 130px;
  border: 2px solid black;
  margin-right: 20px;
}
</style>