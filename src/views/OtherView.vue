<template>
  <div>
    <el-upload
      action="/api/upload/image"
      list-type="picture-card"
      :data="{ type: 2 }"
      :on-preview="handlePictureCardPreview"
      :limit="2"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      console.log(file);
      this.dialogVisible = true;
    },
  },
};
</script>

