<template>
  <div style="width: 80vw">
    <el-table
      :data="tableData.length > 0 ? tableData : []"
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
