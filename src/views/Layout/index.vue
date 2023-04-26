<template>
  <div class="layout">
    <Sidebar></Sidebar>
    <div class="layoutRight">
      <Hearder></Hearder>
      <main class="mainContent">
        <MainConetnt></MainConetnt>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import Sidebar from './components/Sidebar/index.vue'
import Hearder from './components/Hearder/index.vue'
import MainConetnt from './components/MainConetnt/index.vue'

export default defineComponent({
  components: {
    Sidebar,
    Hearder,
    MainConetnt,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.layout {
  width: 100vw;
  height: 100%;
  display: flex;
}
.layoutRight {
  flex: 1 1 auto;
  overflow: hidden;
  background-color: #f5f5f5;
}
.mainContent {
  padding: 20px;
}
</style>
