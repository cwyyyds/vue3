<template>
  <div class="">
    <div @click="quit()">
      <i class="iconfont icon-tuichu"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import store from '@/store'
export default defineComponent({
  setup() {
    const { logOnStore } = store()
    const quit = () => {
      console.log('退出')
      logOnStore.quitOn()
    }

    return {
      quit,
    }
  },
})
</script>

<style lang="scss" scoped>
.icon-tuichu {
  color: #8a8a8a;
  font-size: 26px;
  &:hover {
    color: #1588f5;
  }
  &:active {
    color: #8a8a8a;
  }
}
</style>
