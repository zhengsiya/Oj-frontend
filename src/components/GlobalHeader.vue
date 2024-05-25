<script setup lang="ts">
import { routes } from '../router/routes'
import { useRouter, useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { useUserStore } from '@/store/index'
import checkAccess from '@/access/checkAccess'
import { storeToRefs } from 'pinia'

const router = useRouter()
const route = useRoute()

// 点击导航栏跳转
const clickMenu = (key: string) => {
  router.push(key)
}

// 路由跳转时，更新导航栏高亮状态
const selectKey = ref([route.path])
router.beforeEach((to) => {
  selectKey.value = [to.path]
})

const userStore = useUserStore()
// const { setUser } = userStore
const { user } = storeToRefs(userStore)

// 过滤不显示的路由
const filterRoutes = computed(() => {
  return routes.filter(
    // 检查是否具有权限
    (item) =>
      checkAccess(user.value, item.meta?.access as string) &&
      item.meta?.hideInMenu !== true
  )
})
</script>

<template>
  <div id="header">
    <a-row>
      <a-col :span="18">
        <a-menu
          mode="horizontal"
          :selected-keys="selectKey"
          :default-selected-keys="['/']"
          @menu-item-click="clickMenu"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
          >
            <div class="titleBar">
              <img src="@/assets/avater.jpg" alt="logo" />
              <span>嘻嘻OJ</span>
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in filterRoutes" :key="item.path">{{
            item.name
          }}</a-menu-item>
        </a-menu>
      </a-col>
      <a-col :span="3" :offset="3">
        <div class="status">
          <span>{{ user.userName !== '' ? user.userName : '未登录' }}</span>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<style>
.titleBar {
  display: flex;
  align-items: center;
}
.titleBar img {
  width: 50px;
  height: 50px;
  /* display: flex;
  align-items: center; */
}
.titleBar span {
  font-size: 16px;
  color: #2a629a;
  margin-left: 10px;
}
/* status垂直居中在 a-col */
.status {
  background-color: #eef7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  color: #2a629a;
  font-size: 16px;
  margin-right: 20px;
  border-radius: 5px;
  border: dashed 1px #2a629a;
}
</style>
