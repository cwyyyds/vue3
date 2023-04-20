<template>
  <div class="tabBar">
    <div
      v-for="(item, index) in tabBarArray"
      :key="index"
      :class="showTabBar === item.name ? 'select' : ''"
      class="label"
      @click="changeShowTabBar(item)"
    >
      <i class="labelText">{{ item?.name }}</i>
      <!-- 最后一个页面不能删除 -->
      <span
        v-if="tabBarArray.length > 1"
        class="close"
        @click.stop="closeFn(item?.name)"
        >x</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import store from '@/store'
//第一种获取target值的方式，通过vue中的响应式对象可使用toRaw()方法获取原始对象
import { storeToRefs } from 'pinia'
// 在setup中使用hook函数来得到路由对象，完成编程式导航
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const router = useRouter() //拿到路由实例

    const { tabBarStore } = store() //使用pinia中tabBar中的数据
    const { showTabBar, tabBarArray } = storeToRefs(tabBarStore)
    if (tabBarArray.value.length == 0) {
      //刚进去的时候标签页为空，设置为首页
      tabBarStore.setTabBar('/homePage', '首页')
    }
    const closeFn = (name: string) => {
      const number = tabBarStore.closeFn(name)
      router.push(`${tabBarArray.value[number].path}`)
    }
    const changeShowTabBar = (obj: any) => {
      tabBarStore.showTabBar = obj.name
      console.log(obj.path)
      router.push(obj.path)
    }
    return {
      tabBarArray,
      showTabBar,
      closeFn,
      changeShowTabBar,
    }
  },
})
</script>

<style lang="scss" scoped>
.tabBar {
  height: 100%;
  display: flex;
}
.label {
  position: relative;
  padding: 16px;
  // background-color: #fff;
  line-height: 1;
  &:hover {
    background-color: #f5f5f5;
  }
}

.select {
  background-color: #f5f5f5;
}

.labelText {
  font-style: normal;
  margin-right: 10px;
}
.close {
  font-size: 16px;
  height: 16px;
  display: inline-block;
  text-align: center;
  line-height: 1;
  width: 16px;
  border-radius: 50%;
  &:hover {
    background-color: skyblue;
    color: #fff;
  }
}
</style>
