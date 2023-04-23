<template>
  <div class="SidebarBox">
    <div class="logo">
      <i>图标</i>
      <el-button
        id="zoomButton"
        :class="[isZoomButton ? 'zoomButton1' : 'zoomButton2', 'zoomButton']"
        :style="{ '--angle': angle, '--oldAngle': oldAngle }"
        @click="zoomButtonFn()"
        ><i class="iconfont icon-zhankai-"></i
      ></el-button>
    </div>

    <el-menu
      :default-active="showMenu"
      class="el-menu-demo Sidebar"
      mode="vertical"
      :collapse="isCollapse"
      :router="true"
    >
      <!-- 首页 -->
      <el-menu-item
        index="/homePage"
        @click="tabBarFn('homePage', '首页', '/')"
      >
        <i class="iconfont icon-shouye"></i>
        <span class="menuTitle">首页</span>
      </el-menu-item>

      <!-- 动态路由，索引从1开始 -->
      <el-sub-menu
        v-for="(value, index) in sideberRouter"
        :key="index"
        :index="`${value['url']}`"
      >
        <!-- 父标题名称 -->
        <template #title>
          <i :class="['iconfont', value['styleCode']]"></i>
          <span class="menuTitle">{{ value['menuName'] }}</span>
        </template>

        <!-- 子列表 -->
        <el-menu-item
          v-for="(item, number) in value['children']"
          :key="`${index + 1}-${number}`"
          :index="`${value['url']}${item['url']}`"
          @click="tabBarFn(item['url'], item['menuName'], value['url'])"
        >
          <i :class="['iconfont', item['styleCode']]"></i>
          <span class="menuTitle"> {{ item['menuName'] }}</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// 保持其响应式
import { storeToRefs } from 'pinia'
// 导入 pinia 实例
import store from '@/store'
//第一种获取target值的方式，通过vue中的响应式对象可使用toRaw()方法获取原始对象
import { toRaw } from 'vue'

export default defineComponent({
  setup() {
    let angle = ref('180deg')
    let oldAngle = ref('180deg')
    let isCollapse = ref(false)
    let isZoomButton = ref(false)
    // 实例化容器
    const { logOnStore, tabBarStore } = store()
    const { showMenu } = storeToRefs(tabBarStore)

    // 展开关闭以及logo动画样式
    const zoomButtonFn = () => {
      isZoomButton.value = !isZoomButton.value
      if (angle.value == '0deg') {
        angle.value = '180deg'
        oldAngle.value = '0deg'
      } else {
        angle.value = '0deg'
        oldAngle.value = '180deg'
      }
      // menu展开关闭
      isCollapse.value = !isCollapse.value
    }

    // 拿到后端返回的路由信息
    const sideberRouter = toRaw(logOnStore.asyncRouter)

    //点击到展开的子菜单会触发
    const tabBarFn = (path: string, name: string, fatherPath: string) => {
      tabBarStore.setTabBar(`${fatherPath}${path}`, name)
    }

    return {
      angle,
      showMenu,
      oldAngle,
      isCollapse,
      sideberRouter,
      isZoomButton,
      zoomButtonFn,
      tabBarFn,
    }
  },
})
</script>

<style lang="scss" scoped>
.SidebarBox {
  background-color: #fff;
}
@keyframes revolve {
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(0deg);
  }
}

@keyframes revolve2 {
  from {
    transform: rotate(var(--oldAngle));
  }
  to {
    transform: rotate(180deg);
  }
}
.logo {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  //缩放按钮
  .zoomButton {
    border: 0;
    background-color: #fff;
    margin-right: 6px;
    padding: 0;
    transform: rotate(var(--angle));
  }

  .zoomButton1 {
    animation: revolve 0.5s;
  }

  .zoomButton2 {
    animation: revolve2 0.5s;
  }
}

.Sidebar {
  // height: 100%;
  background-color: #fff;
  border: 0;
}
a {
  color: #303133;
  text-decoration: none;
  :hover {
    color: skyblue;
  }
}
i {
  font-style: normal;
}
// 菜单标题
.menuTitle {
  margin-left: 10px;
  font-size: 16px;
}
.iconfont {
  font-size: 20px;
}
</style>
