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
              :disabled="item.disabled"
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
import { getRolepermissionListApi, getPermissionListApi } from "@/api/api";
export default {
  props: ["data-id"],
  data() {
    return {
      checkedCities: [],
      isIndeterminate: false,
      menus: [],
      rows: [],
      RoleData: [],
    };
  },
  watch: {
    dataId() {
      getPermissionListApi({ pagination: false }).then((item) => {
        this.rows = item.data.data.rows;
        console.log(this.rows);
      });
      getRolepermissionListApi({}).then((res) => {
        this.RoleData = res.data.data.rows;
        console.log(this.RoleData);
        this.RoleData.forEach((role) => {
          if ((role.roleId = this.dataId)) {
            this.rows.filter((i) => {
            role.title == i.title;
            }).disabled = true;
          }
        });
      });
    },
  },
  created() {
    this.menus = menu.map((data) => {
      let item = JSON.parse(JSON.stringify(data));
      console.log(item);
      item.isIndeterminate = false;
      item.children = item.children
        ? item.children.map((i) => {
            return i.lable;
          })
        : [];
      item.children.disabled = false;
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
      this.$emit("add", this.menus);
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
    & .desc {
      color: #aaaaaa;
      font-size: 14px;
    }
  }
}
</style>