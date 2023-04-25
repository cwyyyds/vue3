<template>
  <div style="width: 80vw">
    <el-table
      :data="tableData"
      :border="true"
      default-expand-all
      row-key="menuId"
    >
      <el-table-column prop="menuName" label="菜单名称" />
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { allMenuList } from '@/api'
let tableData: any = ref([])
async function getAllMenus() {
  const { data } = await allMenuList()
  tableData.value = data
}
getAllMenus()

console.log(tableData)
</script>

<style lang="scss" scoped>
/* /deeep/样式穿透*/
/*1.取消原本展开的旋转动效*/
:v-deep .el-table__expand-icon {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
/*2.展开按钮未点击的样式是加号带边框*/
:v-deep .el-table__expand-icon .el-icon-arrow-right:before {
  content: 'Plus';
  border: 1px solid #ccc;
  padding: 1px;
}
/*2.按钮已点击展开之后的样式是减号带边框*/
:v-deep .el-table__expand-icon--expanded .el-icon-arrow-right:before {
  content: '\e6d8';
}
</style>
