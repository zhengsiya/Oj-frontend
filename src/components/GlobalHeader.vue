<script setup lang="ts">
import { routes } from '../router/routes'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const route = useRoute()

const selectKey = ref([route.path])
// 点击导航栏跳转
const clickMenu = (key: string) => {
  router.push(key)
}

// 路由跳转时，更新导航栏高亮状态
router.beforeEach((to) => {
  selectKey.value = [to.path]
})
</script>

<template>
  <a-menu
    mode="horizontal"
    :selected-keys="selectKey"
    :default-selected-keys="['/']"
    @menu-item-click="clickMenu"
  >
    <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
      <div class="titleBar">
        <img src="" alt="logo" />
        <div>编程导航</div>
      </div>
    </a-menu-item>
    <a-menu-item v-for="item in routes" :key="item.path">{{
      item.name
    }}</a-menu-item>
  </a-menu>
</template>

<style></style>
