<template>
  <div>
    <el-table
      ref="tableRef"
      :data="tableData"
      :border="true"
      row-key="menuId"
      header-cell-class-name="header"
      :max-height="tableHeight"
    >
      <el-table-column prop="menuName" label="菜单名称" />
      <el-table-column label="图标" width="100px" align="center">
        <template #default="scope">
          <el-icon :class="`icon iconfont ${scope.row.styleCode}`"></el-icon>
        </template>
      </el-table-column>

      <el-table-column
        prop="menuName"
        label="级别"
        width="120px"
        align="center"
      >
        <template #default="scope">
          <el-tag
            :type="scope.row.parentid == 0 ? '' : 'success'"
            effect="dark"
          >
            {{ scope.row.parentid == 0 ? '一级' : '二级' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="路由" width="260px" align="center" />

      <el-table-column fixed="right" label="操作" width="180px" align="center">
        <template #default>
          <el-button link type="primary" size="large">编辑</el-button>
          <el-button link type="danger" size="large">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { allMenuList } from '@/api'

// table元素
const tableRef: any = ref(null)
// table高度
const tableHeight = ref()

onMounted(() => {
  // 设置表格初始高度为innerHeight-offsetTop-表格底部与浏览器底部距离85
  tableHeight.value = window.innerHeight - tableRef.value.$el.offsetTop - 20
  // 监听浏览器高度变化
  window.onresize = () => {
    tableHeight.value = window.innerHeight - tableRef.value.$el.offsetTop - 20
  }
})

let tableData: any = ref([])
async function getAllMenus() {
  const { data } = await allMenuList()
  tableData.value = data
}
getAllMenus()

console.log(tableData)
</script>

<style lang="scss" scoped>
// 设置icon图标大小
::v-deep(.el-icon) {
  font-size: 22px;
}

/* 设置表头背景色 */
::v-deep(.header) {
  height: 57px !important;
  background-color: #eef5f5 !important;
}
/* 替换默认展开收起图片 */
/* prettier-ignore */
::v-deep(.el-table__expand-icon)  {
    width: 16PX;
    height: 16PX;
    background: url("../../../assets/imgs/expand.png")  no-repeat;
    background-size: 100% 100%;
    .el-icon {
      display: none;
    }
  }
::v-deep(.el-table__expand-icon--expanded) {
  transform: none;
  background: url('@/assets/imgs/retract.png') no-repeat;
  background-size: 100% 100%;
}
</style>
