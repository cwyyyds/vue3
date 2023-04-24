<template>
  <div class="hearder">
    <div class="left">
      <TabBar></TabBar>
    </div>
    <div class="right">
      <Function></Function>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TabBar from './TabBar/index.vue'
import Function from './Function/index.vue'

export default defineComponent({
  components: {
    TabBar,
    Function,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.hearder {
  height: 50px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
}
.right {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
</style>
