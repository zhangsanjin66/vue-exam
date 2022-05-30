<template>
  <div class="personinfo">
    <div class="main">
      <div class="essentialinfo">
        <div class="header">基本信息</div>
        <div class="infonav">
          <div class="item">
            <label class="">账号昵称</label>
            <el-input
              class="name"
              type="text"
              placeholder="请输入内容"
              v-model="form.avatarName"
              maxlength="8"
              show-word-limit
            >
            </el-input>
          </div>
          <div class="item">
            <label>真实姓名</label>
            <el-input v-model="form.name" placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <label>性别</label>
            <div>
              <el-radio v-model="form.sex" :label="1">男</el-radio>
              <el-radio v-model="form.sex" :label="2">女</el-radio>
            </div>
          </div>
          <div class="item">
            <label>所在地</label>
            <div>
              <el-select
                v-model="form.provinceNo"
                placeholder="请选择"
                class="mr-50"
              >
                <el-option
                  v-for="item in province"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="form.cityNo"
                placeholder="请选择"
                class="mr-50"
              >
                <el-option
                  v-for="item in district"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                >
                </el-option>
              </el-select>
              <el-select v-model="form.areaNo" placeholder="请选择" v-if="isOK">
                <el-option
                  v-for="item in county"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="item">
            <label>简介</label>
            <el-input
              type="textarea"
              rows="8"
              placeholder="请输入内容"
              v-model="form.desc"
              maxlength="30"
              show-word-limit
            >
            </el-input>
          </div>
          <div class="item">
            <label></label>
            <div class="mb-60">
              <el-button
                class="preservation btn"
                size="small"
                type="primary"
                round
                @click="preservation"
                >保存</el-button
              >
              <el-button class="btn" size="small" round>取消</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cityData from "@/citydata.json";
import { getUserInfoApi, updateUserInfoApi } from "@/api/api.js";
export default {
  data() {
    return {
      isOK: true,
      form: {
        sex: "",
        avatarName: "",
        name: "",
        provinceNo: "",
        cityNo: "",
        areaNo: "",
        desc: "",
      },
      province: cityData, //省
      district: [], //市区
      county: [], //县
    };
  },
  watch: {
    "form.provinceNo": function (newval) {
      let res = this.province.find((item) => item.code == newval);
      this.district = res && res.children ? res.children : [];
      if (this.form.cityNo) {
        let district = this.district.find(
          (item) => item.code == this.form.cityNo
        );
        this.form.cityNo = district && district.code ? district.code : "";
      }
    },
    "form.cityNo": function (newval) {
      let res = this.district.find((item) => item.code == newval);
      this.county = res && res.children ? res.children : [];
      if (this.form.areaNo) {
        let county = this.county.find((item) => item.code == this.form.areaNo);
        this.form.areaNo = county && county.code ? county.code : "";
      }
    },
  },
  async created() {
    let res = await getUserInfoApi();
    this.form = res.data.data[0];
    // this.province(res.data.data[0].provinceNo, res.data.data[0].cityNo);
    // this.city(res.data.data[0].cityNo);
  },
  methods: {
    updateinfo() {
      var res = {};
      res.avatarName = this.form.avatarName;
      res.sex = this.form.sex;
      res.name = this.form.name;
      res.provinceNo = this.form.provinceNo;
      res.cityNo = this.form.cityNo;
      res.areaNo = this.form.areaNo;
      res.desc = this.form.desc;
      return res;
    },
    async preservation() {
      var params = this.updateinfo();
      let res = await updateUserInfoApi(params);
      if (res.data.status == 1) {
        this.$message({
          type: "success",
          message: "修改成功!",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.personinfo {
  background-color: #f7f7f7;
  padding: 20px 100px;
  & .essentialinfo {
    min-width: 980px;
    padding: 0 50px;
    margin: 30px 0;
    background-color: #ffffff;
    & .header {
      padding: 20px;
      font-weight: bold;
    }
    & .infonav {
      display: flex;
      flex-direction: column;
      gap: 30px 0;
      padding: 0 50px;
      & .item {
        display: grid;
        grid-template-columns: 70px auto 100px;
        gap: 0 30px;
        align-items: center;
        & label {
          text-align: right;
        }
      }
    }
  }
}
</style>