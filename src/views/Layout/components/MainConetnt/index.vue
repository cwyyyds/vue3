<template>
  <router-view v-if="state.showRouter" v-slot="{ Component, route }">
    <transition name="fade-transform" mode="out-in">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
import { reactive, nextTick, provide } from 'vue'

const state = reactive({
  showRouter: true,
})

//刷新事件
function reload() {
  state.showRouter = false
  //nextTick：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
  nextTick(() => {
    state.showRouter = true
  })
}

// 向子组件以及子孙组件传递名为reload的函数，第一个参数自定义，第二个参数代表上面定义的reload()方法
provide('reload', reload)
</script>

<style lang="scss" scoped></style>
