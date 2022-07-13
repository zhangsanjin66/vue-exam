<template>
  <div>
    <!-- 最上面的分类 -->
    <div class="header">
      <div class="align-center">
        <label class="mr-15">所属类型:</label>
        <div class="flex types">
          <div class="type active">全部(344)</div>
          <div class="type">单选题(144)</div>
          <div class="type">多选题(144)</div>
          <div class="type">判断题(75)</div>
          <div class="type">排序题(14)</div>
          <div class="type">填空题(36)</div>
          <div class="type">简答题(45)</div>
        </div>
      </div>
      <div class="align-center">
        <label class="mr-15">难易程度:</label>
        <div class="flex types">
          <div class="type">全部</div>
          <div class="type active">简单</div>
          <div class="type">中等</div>
          <div class="type">困难</div>
        </div>
      </div>
      <div class="flex-between">
        <div>
          <el-button @click="addExercises" type="primary">添加习题</el-button>
          <el-button type="primary">批量导入</el-button>
          <el-button type="primary">加入公共习题库</el-button>
        </div>
        <div>
          <el-input
            placeholder="请输入要搜索的内容"
            suffix-icon="el-icon-search"
            size="medium"
            class="input"
            v-model="search"
          >
          </el-input>
          <el-button @click="searchinput" type="primary" round
            >主要按钮</el-button
          >
        </div>
      </div>
    </div>
    <!-- 题目 -->

    <div class="nav" v-for="(item, index) in data" :key="index">
      <!-- 创建时间 -->
      <div class="creationtime">
        <el-row :gutter="24">
          <el-col :span="22">
            <div class="grid-content bg-purple font-color">
              创建时间 : {{ formatDate(item.createdAt) }}
              <span class="single">{{ getType(item.type) }}</span>
              <span class="simple">{{ formatLevel(item.level) }}</span>
              使用次数:18次
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">
              <span @click="modify(item)" class="el-icon-document ml-10"></span>
              <span
                @click="deleteItem(item)"
                class="el-icon-delete ml-10"
              ></span></div
          ></el-col>
        </el-row>
      </div>
      <!-- 题目 -->
      <div class="main">
        <input type="checkbox" name="" id="" />{{ item.title }}
        <div class="option">
          <!-- 选项 -->
          <el-radio disabled class="pr-100" v-model="item.answer" label="A">{{
            item.questionA
          }}</el-radio>
          <el-radio disabled class="pr-100" v-model="item.answer" label="B">{{
            item.questionB
          }}</el-radio>
          <el-radio
            disabled
            v-if="item.questionC"
            class="pr-100"
            v-model="item.answer"
            label="C"
            >{{ item.questionC }}</el-radio
          >
          <el-radio
            disabled
            v-if="item.questionD"
            class="pr-100"
            v-model="item.answer"
            label="D"
            >{{ item.questionD }}</el-radio
          >
        </div>
        <!-- 答案 -->
        <div class="answer">答案：{{ item.answer }}</div>
      </div>
      <!-- 底部 -->
      <div class="analysis">
        <p>
          所属知识点: <span>知识点一 </span> <span> 知识点二 </span
          ><span> 知识点三 </span>
        </p>
        <p>解析:<span>这是解析字段 </span></p>
      </div>
    </div>

    <!-- 新增弹层 -->
    <el-dialog
      title="新增题目"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      class="dialog"
    >
      <div class="form">
        <div class="item">
          <label><span class="star">*</span><span>题目标题:</span></label>
          <el-input
            v-model="form.title"
            placeholder="请输入题目标题"
          ></el-input>
        </div>
        <div
          class="item"
          v-for="(option, index) in questionOptions"
          :key="option.id"
        >
          <label>
            <span v-if="index <= 1" class="star">*</span>
            <span>{{ option.label }}:</span>
          </label>
          <el-input
            v-model="option.value"
            :placeholder="option.placeholder"
          ></el-input>
          <div>
            <span
              v-if="index == questionOptions.length - 1 && index < 3"
              @click="addquestionOption"
              class="el-icon-circle-plus-outline pr-5"
            ></span>
            <span
              v-if="index > 1 && index == questionOptions.length - 1"
              @click="removequestionOption(index)"
              class="el-icon-remove-outline"
            ></span>
          </div>
        </div>
        <div class="item">
          <label> <span class="star">*</span><span>答案:</span></label>
          <el-select v-model="form.answer" placeholder="请选择">
            <el-option
              v-for="item in questionOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            ></el-option>
          </el-select>
        </div>
        <div class="item">
          <label> <span class="star">*</span><span>难度系数:</span></label>
          <el-select v-model="form.level" placeholder="请选择">
            <el-option
              v-for="item in levelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button v-if="isOK" type="primary" @click="determine"
          >确认</el-button
        >
        <el-button v-if="isCreat" type="primary" @click="updateQuestion"
          >修改</el-button
        >
      </span>
    </el-dialog>
    <!-- 分页 -->
    <el-footer class="footer">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 5, 10, 15]"
        :page-size="this.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.page"
      >
      </el-pagination>
    </el-footer>
  </div>
</template>

<script>
import formatDate from "@/mixins/formatDate.js";
import {
  queryQuestionBankApi,
  createQuestionBankApi,
  updateQuestionBankApi,
  deleteQuestionBankApi,
} from "@/api/api.js";
export default {
  mixins: [formatDate],
  data() {
    return {
      search: "",
      data: {},
      form: {},
      id: "",
      isOK: true, //控制确认按钮的显示
      isCreat: true, //控制修改按钮的显示
      page: null,
      dialogVisible: false,
      pageSize: 5, //每页展示多少条
      title: "",
      currentPage: 1, //分页默认第一页
      pageCount: "",
      levelOptions: [
        {
          value: 1,
          label: "简单",
        },
        {
          value: 2,
          label: "普通",
        },
        {
          value: 3,
          label: "困难",
        },
      ],
      questionOptions: [],
      questionOptionsTemp: [
        {
          id: 1,
          label: "选项A",
          value: "",
          key: "A",
          placeholder: "请输入选项A的值",
        },
        {
          id: 2,
          label: "选项B",
          value: "",
          key: "B",
          placeholder: "请输入选项B的值",
        },
        {
          id: 3,
          label: "选项C",
          value: "",
          key: "C",
          placeholder: "请输入选项C的值 非必填",
        },
        {
          id: 4,
          label: "选项D",
          value: "",
          key: "D",
          placeholder: "请输入选项D的值 非必填",
        },
      ],
    };
  },
  watch: {
    questionOptions(newValue) {
      this.answer = !newValue.includes(this.answer) ? "" : newValue;
    },
  },
  //监听答案
  created() {
    this.getQuestionList();
    this.initFormParams();
  },
  methods: {
    searchinput() {
      this.getQuestionList();
    },
    //媒体查询
    removequestionOption(index) {
      this.questionOptions.pop();
      this.questionOptionsTemp[index].value = "";
      let isExist = this.questionOptions.find(
        (item) => item.key == this.form.answer
      );
      this.form.answer = isExist ? this.form.answer : "";
    },
    //点击减号删除选项框
    addquestionOption() {
      let option = JSON.parse(JSON.stringify(this.questionOptionsTemp));
      this.questionOptions.push(option[this.questionOptions.length]);
    },
    //点击加号添加选项框
    async getQuestionList() {
      let res = await queryQuestionBankApi({
        //查询题接口
        type: 1,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        title: this.search,
      });
      if (res.data.status == 1) {
        this.data = res.data.data.rows;
        this.page = res.data.data.count;
        this.pageCount = res.data.data.pageCount;
      }
    },
    //查询接口
    formatLevel(val) {
      switch (val) {
        case 1:
          return "简单";
        case 2:
          return "普通";
        case 3:
          return "困难";
      }
    },
    //难易程度
    getType(type) {
      switch (type) {
        case 1:
          return "单";
        case 2:
          return "多";
        case 3:
          return "填";
        case 4:
          return "问";
      }
    },
    //获取类型
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getQuestionList();
    },
    //每页展示多少条
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getQuestionList();
    },
    //当前页的数据
    formatmparams() {
      let res = {};
      res.type = this.form.type;
      res.title = this.form.title;
      this.questionOptions.forEach((item) => {
        res["question" + item.key] = item.value;
      });
      res.answer = this.form.answer;
      res.level = this.form.level;
      return res;
    },
    //给form赋值
    addExercises() {
      this.dialogVisible = true;
      this.isCreat = false;
      this.isOK = true;
      this.initFormParams();
    },
    //点击添加练习题
    cancel() {
      this.dialogVisible = false;
      this.initFormParams();
    },
    //点击取消按钮
    initFormParams() {
      this.form = {
        type: 1,
        title: "",
        answer: "",
        level: "",
      };
      this.questionOptions = JSON.parse(
        JSON.stringify(this.questionOptionsTemp)
      ).slice(0, 2);
      this.answer = "";
      this.questionOptionsTemp.forEach((options) => {
        options.value = "";
      });
    },
    //初始化
    validataFormParams(params) {
      let res = true;
      let rule = {
        title: "题目标题",
        questionA: "选项A",
        questionB: "选项B",
        questionC: "选项C",
        questionD: "选项D",
        answer: "答案",
        level: "难易程度",
      };
      for (let key in params) {
        // console.log(key);
        if (!params[key]) {
          this.$message({
            type: "warning",
            message: rule[key] + "不能为空！",
          });
          res = false;
          break;
        }
      }
      return res;
    },
    //校验
    async determine() {
      const params = this.formatmparams();
      //点击确定创建题
      let validate = this.validataFormParams(params);
      if (!validate) return;
      let res = await createQuestionBankApi(params); //创建题接口
      if (res.data.status == 1) {
        this.getQuestionList();
        this.$message({
          type: "success",
          message: "创建成功!",
        });
        this.dialogVisible = false;
        this.initFormParams(); //创建成功初始化
      }
    },
    //点击确定，调用创建接口
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    //点击叉号关闭
    async updateQuestion() {
      const params = this.formatmparams();
      //点击确定创建题
      let validate = this.validataFormParams(params);
      if (!validate) return;
      params.id = this.id;
      if (!params.questionC) {
        params.questionC = "";
      } else if (!params.questionD) {
        params.questionD = "";
      }
      let res = await updateQuestionBankApi(params);
      if (res.data.status == 1) {
        this.dialogVisible = false;
        this.$message({
          type: "success",
          message: "修改成功",
        });
        this.getQuestionList();
        this.initFormParams();
      }
    },
    //点击修改按钮，调用修改接口
    modify(data) {
      this.dialogVisible = true;
      this.isOK = false;
      this.isCreat = true;
      console.log(data);
      this.form.id = data.id;
      this.id = data.id;
      this.form.type = data.type;
      this.form.title = data.title;
      this.form.level = data.level;
      this.form.answer = data.answer;
      this.questionOptionsTemp[0].value = data.questionA;
      this.questionOptionsTemp[1].value = data.questionB;
      this.questionOptionsTemp[2].value = data.questionC;
      this.questionOptionsTemp[3].value = data.questionD;
      if (!data.questionC) {
        this.questionOptions = this.questionOptionsTemp.slice(0, 2);
      } else {
        this.questionOptions = this.questionOptionsTemp.slice(0, 3);
      }
      if (data.questionD) {
        this.questionOptions = this.questionOptionsTemp.slice(0, 4);
      }
    },
    //点击修改图标获取所有值
    async deleteQuestion(data) {
      let res = await deleteQuestionBankApi({
        //删除题接口
        id: data.id,
        type: 1,
      });
      if (res.data.status == 1) {
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.getQuestionList();
      } else {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      }
    },
    //点击确定删除，调用删除接口
    deleteItem(data) {
      this.$confirm("您是否确认删除该题目", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteQuestion(data);
        })
        .catch(() => {});
    },
    //点击删除图标
  },
};
</script>

<style scoped lang="scss">
.header {
  min-width: 1040px;
  background-color: #f9f9f9;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px 0;
  & .types {
    font-size: 11px;
    gap: 0 10px;
    color: #ccc;
    & .type {
      cursor: pointer;
      padding: 4px 10px;
      border-radius: 15px;
      border: 1px solid #b7b7b7;
    }
    & .active {
      color: #f25342;
      border: 1px solid #f25342;
    }
  }

  & .input {
    width: 260px;
  }
}
.nav {
  min-width: 1000px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0 20px;
  margin-top: 20px;
  & .creationtime {
    // color: #ccc;
    font-size: 12px;
    padding: 10px 0;
    & .single {
      padding: 4px;
      background-color: #f45743;
      color: white;
      border-radius: 2px;
      margin-left: 30px;
    }
    & .simple {
      padding: 4px;
      background-color: #72d9c5;
      color: white;
      border-radius: 2px;
      margin-left: 5px;
      margin-right: 25px;
    }
    & .font-color {
      color: #ccc;
    }
  }
  & .option {
    margin: 20px 0;
    padding: 0 50px;
  }
  & .answer {
    border-bottom: 1px dashed #ccc;
    padding-left: 20px;
    padding-bottom: 10px;
  }
  & .analysis {
    color: #ccc;
    font-size: 12px;
    padding: 0 20px;
    & span {
      padding: 0 15px;
    }
  }
}
.footer {
  padding: 30px 0;
  text-align: right;
}
.dialog {
  ::v-deep .el-dialog {
    min-width: 500px;
  }
  & .form {
    display: flex;
    flex-direction: column;
    gap: 20px 0;
    padding: 0 20px;
    & .item {
      display: grid;
      grid-template-columns: 70px auto 45px;
      gap: 0 10px;
      align-items: center;
      & label {
        text-align: right;
      }
      & .btn {
        padding: 4px;
        display: inline-block;
      }
      & .star {
        color: #ff4400;
      }
    }
  }
}
</style>
