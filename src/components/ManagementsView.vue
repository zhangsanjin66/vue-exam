<template>
  <div>
    <div class="flex-between title">
      <div class="desc">设置角色对应的功能操作、应用管理、后台权限管理</div>
      <div><el-checkbox>全选</el-checkbox></div>
    </div>
    <div class="content">
      <div
        class="item"
        v-for="city in menuall"
        :label="city.lable"
        :key="city.id"
      >
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          >{{ city.lable }}</el-checkbox
        >
        <div style="margin: 15px 0"></div>
        <template v-if="city.children">
          <el-checkbox-group
            v-model="checkedCities"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="item in city.children"
              :key="item.id"
              :label="item.lable"
            >
              {{ item.lable }}
            </el-checkbox>
          </el-checkbox-group>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import menu from "@/config/menu.config";
export default {
  data() {
    return {
      checkAll: false,
      checkedCities: [],
      isIndeterminate: true,
      menuall: [],
    };
  },
  created() {
    this.menuall = menu.map((item) => {
      return item;
    });
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? menu : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.menuall[0].children.length;
      console.log(this.checkAll);
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.menuall[0].children.length;
    },
  },
};
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