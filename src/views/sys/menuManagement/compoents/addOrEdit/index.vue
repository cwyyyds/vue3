<template>
  <div>
    <el-dialog
      v-model="openClose"
      title="编辑"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="form">
        <el-form-item label="上级菜单">
          <el-tree-select
            v-model="value"
            :data="data"
            check-strictly
            accordion
            :render-after-expand="false"
          />
        </el-form-item>

        <el-form-item label="菜单名称">
          <el-input v-model="form.menuName" />
        </el-form-item>

        <el-form-item label="菜单路由">
          <el-input v-model="form.url" />
        </el-form-item>

        <el-form-item label="菜单图标">
          <el-input v-model="form.styleCode" />
        </el-form-item>

        <el-form-item label="排序编号">
          <el-input-number
            v-model="form.sortNum"
            class="mx-4"
            :min="1"
            controls-position="right"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from 'vue'

// 由父组件控制子组件对话框开关
const props = defineProps({
  // 带有默认值的数字
  open: {
    type: Boolean,
    default: false,
  },
  formData: {
    type: Object,
    default: () => ({}),
  },
  selectData: {
    type: Array,
    default: () => ref([]),
  },
})
const emit = defineEmits(['closeDialog'])

// 对话框的开关
const openClose = ref(false)
// 表单数据
const form: any = ref({})

// 下拉v-model对应数据
const value = ref()

// 树形结构数据
let data: any = ref([])

// 监听对话框开关
watch(
  () => props.open,
  (newVal, oldVal) => {
    openClose.value = newVal
  },
)

// 监听表格行数据
watch(
  () => props.formData,
  (newVal, oldVal) => {
    form.value = newVal
    value.value = newVal.parentid
  },
)

// 监听下拉数据
watch(
  () => props.selectData,
  (newVal, oldVal) => {
    data.value = newVal
    console.log(data.value)
  },
  {
    //如果加了这个参数，值为true的话，就消除了惰性，watch会在创建后立即执行一次
    //那么首次执行，val为默认值,preVal为undefined
    immediate: true,
    //这个参数代表监听对象时，可以监听深度嵌套的对象属性
    //比如message是一个对象的话，可以监听到message.a.b.c，也就是message下的所有属性
    deep: true,
  },
)

// 关闭对话框
const handleClose = () => {
  emit('closeDialog')
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
