<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade-transform" mode="out-in">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
  computed: {},
})
</script>

<style lang="scss" scoped></style>
