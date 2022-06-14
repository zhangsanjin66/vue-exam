<template>
  <div>
    <div class="flex-between title">
      <div class="desc">设置角色对应的功能操作、应用管理、后台权限管理</div>
      <div><el-checkbox>全选</el-checkbox></div>
    </div>
    <div class="content">
      <div
        class="item"
        v-for="group in menus"
        :label="group.lable"
        :key="group.id"
      >
        <el-checkbox
          :indeterminate="group.isIndeterminate"
          v-model="group.checked"
          @change="handleCheckAllChange($event, group)"
          >{{ group.lable }}</el-checkbox
        >
        <div style="margin: 15px 0"></div>
        <template v-if="group.children">
          <el-checkbox-group
            v-model="group.arr"
            @change="handleCheckedCitiesChange($event, group)"
          >
            <el-checkbox
              v-for="item in group.children"
              :key="item.id"
              :label="item"
            >
              {{ item }}
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
      checkedCities: [],
      isIndeterminate: false,
      menus: [],
    };
  },
  created() {
    this.menus = menu.map((data) => {
      let item = JSON.parse(JSON.stringify(data));
      item.isIndeterminate = false;
      item.children = item.children
        ? item.children.map((i) => {
            return i.lable;
          })
        : [];
      item.arr = [];
      return item;
    });
  },
  methods: {
    handleCheckAllChange(val, group) {
      group.isIndeterminate = false;
      group.arr = val ? group.children : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value, item) {
      let checkedCount = value.length;
      item.checked = checkedCount === item.children.length;
      item.isIndeterminate =
        checkedCount > 0 && checkedCount < item.children.length;
      console.log(item.isIndeterminate);
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