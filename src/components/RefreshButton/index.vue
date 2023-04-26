<template>
  <el-button color="#40485b" @click="refRoad">
    <i class="icon iconfont icon-shuaxin"></i>
  </el-button>
</template>

<script lang="ts" setup name="RefreshButton">
import { inject } from 'vue'
const reload: any = inject('reload') //注入刷新事件,这里括号中的参数要对应上前面provide中的第一个参数

function refRoad() {
  reload()
}
</script>

<style lang="scss" scoped></style>
