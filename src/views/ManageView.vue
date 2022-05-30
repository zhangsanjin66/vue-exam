<template>
  <div>
    <el-container>
      <el-main>
        <div class="header">
          <p class="pl-10">
            <span class="pr-5">适用考试:</span>
            <el-button size="mini" round style="color: #bbbbbb"
              >全部(34)</el-button
            >
            <el-button size="mini" round style="color: #bbbbbb"
              >期中考试(14)</el-button
            >
            <el-button size="mini" round style="color: #bbbbbb"
              >期末考试(18)</el-button
            >
            <el-button size="mini" round style="color: #bbbbbb"
              >其他考试(2)</el-button
            >
          </p>
          <p class="pl-10">
            <span class="pr-5">试卷形式:</span>
            <el-button size="mini" round style="color: #bbbbbb">全部</el-button>
            <el-button size="mini" round style="color: #bbbbbb"
              >考生同卷</el-button
            >
            <el-button size="mini" round style="color: #bbbbbb"
              >随机顺序</el-button
            >
            <el-button size="mini" round style="color: #bbbbbb"
              >考生异卷</el-button
            >
          </p>
          <div class="pl-10 flex-between">
            <div>
              <el-button type="primary">策略组卷</el-button>
              <el-button type="primary">手动组卷</el-button>
              <el-button type="primary">导入试卷</el-button>
            </div>
            <div>
              <el-input
                placeholder="请输入要搜索的内容"
                suffix-icon="el-icon-search"
                size="medium"
                class="input"
              >
              </el-input>
            </div>
          </div>
        </div>
        <div class="nav">
          <!-- 创建时间 -->
          <div class="creationtime">
            <el-row :gutter="24">
              <el-col :span="21">
                <div class="grid-content bg-purple">
                  创建时间 : 2017-08-11 18:30:33
                  <span class="single">期中考试</span>
                  <span class="simple">考生同卷</span>
                  <span class="pd-20">满分: 100</span>
                  <span>使用次数:18次</span>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple">
                  <i class="el-icon-receiving ml-10"></i>
                  <i class="el-icon-delete ml-10"></i>
                  <i class="el-icon-document ml-10"></i></div
              ></el-col>
            </el-row>
          </div>
          <!-- 题目 -->
          <div class="text">1.Java程序设计期中考试试题</div>
        </div>
        <div class="nav">
          <!-- 创建时间 -->
          <div class="creationtime">
            <el-row :gutter="24">
              <el-col :span="21">
                <div class="grid-content bg-purple">
                  创建时间 : 2017-08-11 18:30:33
                  <span class="single">期末考试</span>
                  <span class="simple">随机顺序</span>
                  <span class="pd-20">满分: 100</span>
                  <span>使用次数:18次</span>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple">
                  <i class="el-icon-receiving ml-10"></i>
                  <i class="el-icon-delete ml-10"></i>
                  <i class="el-icon-document ml-10"></i></div
              ></el-col>
            </el-row>
          </div>
          <!-- 题目 -->
          <div class="text">2.Java程序设计期中考试试题</div>
        </div>
        <div class="nav">
          <!-- 创建时间 -->
          <div class="creationtime">
            <el-row :gutter="24">
              <el-col :span="21">
                <div class="grid-content bg-purple">
                  创建时间 : 2017-08-11 18:30:33
                  <span class="single">其他考试</span>
                  <span class="simple">考生同卷</span>
                  <span>满分: 100</span>
                  <span>使用次数:18次</span>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple">
                  <i class="el-icon-receiving ml-10"></i>
                  <i class="el-icon-delete ml-10"></i>
                  <i class="el-icon-document ml-10"></i></div
              ></el-col>
            </el-row>
          </div>
          <!-- 题目 -->
          <div class="text">3.Java程序设计期中考试试题</div>
        </div>
        <div class="nav">
          <!-- 创建时间 -->
          <div class="creationtime">
            <el-row :gutter="24">
              <el-col :span="21">
                <div class="grid-content bg-purple">
                  创建时间 : 2017-08-11 18:30:33
                  <span class="single">其他考试</span>
                  <span class="simple">考生异卷</span>
                  <span class="pd-20">满分: 100</span>
                  <span>使用次数:18次</span>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple">
                  <i class="el-icon-receiving ml-10"></i>
                  <i class="el-icon-delete ml-10"></i>
                  <i class="el-icon-document ml-10"></i></div
              ></el-col>
            </el-row>
          </div>
          <!-- 题目 -->
          <div class="text">4.Java程序设计期中考试试题</div>
        </div>
        <div class="nav">
          <!-- 创建时间 -->
          <div class="creationtime">
            <el-row :gutter="24">
              <el-col :span="21">
                <div class="grid-content bg-purple">
                  创建时间 : 2017-08-11 18:30:33
                  <span class="single">其他考试</span>
                  <span class="simple">考生异卷</span>
                  <span class="pd-20">满分: 100</span>
                  <span>使用次数:18次</span>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple">
                  <i class="el-icon-receiving ml-10"></i>
                  <i class="el-icon-delete ml-10"></i>
                  <i class="el-icon-document ml-10"></i></div
              ></el-col>
            </el-row>
          </div>
          <!-- 题目 -->
          <div class="text">5.Java程序设计期中考试试题</div>
        </div>
        <div class="nav">
          <!-- 创建时间 -->
          <div class="creationtime">
            <el-row :gutter="24">
              <el-col :span="21">
                <div class="grid-content bg-purple">
                  创建时间 : 2017-08-11 18:30:33
                  <span class="single">期末考试</span>
                  <span class="simple">随机顺序</span>
                  <span class="pd-20">满分: 100</span>
                  <span>使用次数:18次</span>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple">
                  <i class="el-icon-receiving ml-10"></i>
                  <i class="el-icon-delete ml-10"></i>
                  <i class="el-icon-document ml-10"></i></div
              ></el-col>
            </el-row>
          </div>
          <!-- 题目 -->
          <div class="text">6.Java程序设计期中考试试题</div>
        </div>
      </el-main>

      <el-footer class="footer">
        <el-pagination
          background="white"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[15, 30, 45, 60]"
          :page-size="15"
          layout="total, sizes, prev, pager, next, jumper"
          :total="1869"
        >
        </el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "2",
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  min-width: 1040px;
  background-color: #f9f9f9;
  & .input {
    width: 260px;
  }
}
.nav {
  min-width: 1000px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px 20px;
  margin-top: 20px;
  & .creationtime {
    color: #ccc;
    font-size: 12px;
    padding-bottom: 10px;
    & .single {
      padding: 2px 3px;
      background-color: #f45743;
      color: white;
      border-radius: 2px;
      margin-left: 30px;
    }
    & .simple {
      padding: 2px 3px;
      background-color: #72d9c5;
      color: white;
      border-radius: 2px;
      margin-left: 5px;
      margin-right: 25px;
    }
  }
  & .text {
    padding: 10px 0;
  }
}
.footer {
  padding: 30px 0;
  text-align: right;
}
</style>
