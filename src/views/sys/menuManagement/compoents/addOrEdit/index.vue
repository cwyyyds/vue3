<template>
  <div>
    <el-dialog
      v-model="openClose"
      title="编辑"
      width="30%"
      :before-close="handleClose"
    >
      <span>内容</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <div>123</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from 'vue'
const openClose = ref(false)
// 由父组件控制子组件对话框开关
const props = defineProps({
  // 带有默认值的数字
  open: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['closeDialog'])
watch(
  () => props.open,
  (newVal, oldVal) => {
    openClose.value = newVal
    console.log('监听基本类型数据testStr')
    console.log('new', newVal)
    console.log('old', oldVal)
  },
)

const handleClose = () => {
  emit('closeDialog')
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
