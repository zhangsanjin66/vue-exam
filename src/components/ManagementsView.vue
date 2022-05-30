<template>
  <div>
    <div class="flex-between title">
      <div class="desc">设置角色对应的功能操作、应用管理、后台权限管理</div>
      <div><el-checkbox>全选</el-checkbox></div>
    </div>
    <div class="content">
      <div class="item flex">
        <div class="message"><el-checkbox>消息</el-checkbox></div>
        <div class="quanxian">
          <div>
            <div>
              <el-checkbox class="pd-10">消息应用设置</el-checkbox>
            </div>
            <div>
              <el-checkbox class="pd-10">管理公开群组</el-checkbox>
            </div>
            <div>
              <el-checkbox class="pd-10">群组中删除消息</el-checkbox>
            </div>
          </div>
          <div>
            <div>
              <el-checkbox class="pd-10">创建公开群组</el-checkbox>
            </div>
            <div>
              <el-checkbox class="pd-10">群组企业公告中发送消息</el-checkbox>
            </div>
          </div>
          <div>
            <div>
              <el-checkbox class="pd-10">创建私有群组</el-checkbox>
            </div>
          </div>
        </div>
      </div>
      <div class="item flex">
        <div class="message"><el-checkbox>项目</el-checkbox></div>
        <div class="quanxian flex">
          <div>
            <div>
              <el-checkbox class="pd-10">新建公开项目</el-checkbox>
            </div>
            <div>
              <el-checkbox class="pd-10">管理公开项目</el-checkbox>
            </div>
          </div>
          <div>
            <div>
              <el-checkbox class="pd-10">新建私有项目</el-checkbox>
            </div>
            <div>
              <el-checkbox class="pd-10">新建项目集</el-checkbox>
            </div>
          </div>
          <div>
            <div>
              <el-checkbox class="pd-10">创建非项目任务</el-checkbox>
            </div>
            <div>
              <el-checkbox class="pd-10">配置中心</el-checkbox>
            </div>
          </div>
        </div>
      </div>
      <div class="item flex">
        <div class="message"><el-checkbox>日历</el-checkbox></div>
        <div class="quanxian flex">
          <div>
            <div>
              <el-checkbox class="pd-10">日历应用设置</el-checkbox>
            </div>
            <div>
              <el-checkbox class="pd-10">管理公开日历</el-checkbox>
            </div>
          </div>
          <div>
            <div>
              <el-checkbox class="pd-10">新建公开日历</el-checkbox>
            </div>
          </div>
          <div>
            <div>
              <el-checkbox class="pd-10">新建私有日历</el-checkbox>
            </div>
          </div>
          <div class=""></div>
        </div>
      </div>
      <div class="item flex">
        <div class="message"><el-checkbox>网盘</el-checkbox></div>
        <div class="quanxian flex">
          <div class="">
            <div>
              <el-checkbox class="pd-10">网盘应用设置</el-checkbox>
            </div>
            <div>
              <el-checkbox class="pd-10">管理公开文件夹</el-checkbox>
            </div>
          </div>
          <div class="">
            <div>
              <el-checkbox class="pd-10"
                >网盘根目录添加文件和文件夹</el-checkbox
              >
            </div>
            <div>
              <el-checkbox class="pd-10">网盘标签管理</el-checkbox>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.title {
  padding: 10px;
}

.content {
  margin: 10px 20px;
  background-color: #fafbfc;
  & .item {
    min-width: 750px;
    padding: 10px;
    border: 1px solid #eef3fc;
    & .quanxian {
      display: grid;
      grid-template-columns: 300px 300px 100px;
    }
    & .message {
      padding: 15px 50px 0 0;
      border-right: 1px solid #eef3fc;
      display: flex;
      align-items: center;
    }
    & .desc {
      color: #aaaaaa;
      font-size: 14px;
    }
  }
}
</style>