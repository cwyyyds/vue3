<template>
  <div class="">
    <div @click="exit()">
      <i class="iconfont icon-tuichu"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const exit = () => {
      console.log('退出')
    }

    return {
      exit,
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
