<template>
  <div class="shadow">
    <div class="headerFn">
      <el-button size="small" type="primary" @click="addFn">
        <IconEpPlus /> 增加
      </el-button>
    </div>
    <el-table
      ref="tableRef"
      :data="tableData"
      :border="true"
      row-key="menuId"
      header-cell-class-name="header"
      :max-height="tableHeight"
    >
      <el-table-column fixed prop="menuName" label="菜单名称" />
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

      <el-table-column prop="url" label="路由" width="260px" align="center">
        <template #default="scope">
          <el-tag
            :type="scope.row.parentid == 0 ? '' : 'success'"
            effect="light"
          >
            {{ scope.row.url }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="180px" align="center">
        <template #default="scope">
          <el-button link type="primary" size="large" @click="editFn(scope.row)"
            >编辑</el-button
          >
          <el-button link type="danger" size="large" @click="open = false"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <addOrEdit
      :type="type"
      :open="open"
      :form-data="form"
      :select-data="selectData"
      @close-dialog="closeDialog"
    ></addOrEdit>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { allMenuList } from '@/api'
import addOrEdit from './compoents/addOrEdit/index.vue'

// table元素
const tableRef: any = ref(null)
// table高度
const tableHeight = ref()

// 控制tabel距离浏览器底端的距离
onMounted(() => {
  // 设置表格初始高度为innerHeight-offsetTop-表格底部与浏览器底部距离40
  tableHeight.value = window.innerHeight - tableRef.value.$el.offsetTop - 40
  // 监听浏览器高度变化
  window.onresize = () => {
    tableHeight.value = window.innerHeight - tableRef.value.$el.offsetTop - 40
  }
})

// 表格数据
let tableData: any = ref([])
async function getAllMenus() {
  const { data } = await allMenuList()
  tableData.value = data
}
getAllMenus()

//区别新增还是编辑
let type = ref(0)

// 处理新增编辑对话框开关
let open = ref(false)

// 编辑选中行数据
let form = ref({})

// 初始化下拉数据
let selectData: any = ref([
  {
    value: 0,
    label: '顶级菜单',
    children: [],
  },
])

// 增加按钮
const addFn = () => {
  type.value = 0
  form.value = {}
  recursion(tableData.value, selectData.value[0].children)
  open.value = true
}

// 编辑按钮
const editFn = (data: object) => {
  type.value = 1
  form.value = data

  recursion(tableData.value, selectData.value[0].children)

  open.value = true
}

// 数据处理
function recursion(array: Array<any>, options: any) {
  for (let i = 0; i < array.length; i++) {
    // 有子集遍历子集
    if (array[i].children) {
      options[i] = {
        value: array[i].menuId,
        label: array[i].menuName,
        children: [],
      }
      recursion(array[i].children, options[i].children)
    } else {
      options[i] = {
        value: array[i].menuId,
        label: array[i].menuName,
      }
    }
  }
  return
}

// 关闭对话框
const closeDialog = () => {
  open.value = false
}
</script>

<style lang="scss" scoped>
.headerFn {
  padding: 10px;
}
// 底部阴影
.shadow {
  background-color: #fff;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.1);
}
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
