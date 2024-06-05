<script setup lang="ts">
import { routes } from '../router/routes'
import { useRouter, useRoute } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/store/index'
import checkAccess from '@/access/checkAccess'
import { storeToRefs } from 'pinia'
import { User } from '@/utils/myType'

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
const { getUserInfo } = userStore
const { user } = storeToRefs(userStore)

// 过滤不显示的路由
const filterRoutes = computed(() => {
  return routes.filter(
    // 检查是否具有权限
    (item) =>
      checkAccess(user.value as User, item.meta?.access as string) &&
      item.meta?.hideInMenu !== true
  )
})

onMounted(() => {
  getUserInfo()
})

// 设置用户信息
const setInfo = () => {
  router.push('/userProfile')
}
</script>

<template>
  <div id="header">
    <a-row>
      <a-col :span="20">
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
              <img src="@/assets/avater.png" alt="logo" />
              <span>嘻嘻OJ</span>
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in filterRoutes" :key="item.path">{{
            item.name
          }}</a-menu-item>
        </a-menu>
      </a-col>
      <a-col :span="2" :offset="2">
        <div class="status">
          <div>
            <a-avatar :style="{ backgroundColor: '#3370ff' }" @click="setInfo">
              <img src="@/assets/avater.jpg" />
            </a-avatar>
          </div>

          <a-button
            :style="{ padding: '0', marginLeft: '15px', border: 'none' }"
          >
            {{
              user.id < 0
                ? '未登录'
                : !user.userName
                ? '未设置用户名'
                : user.userName
            }}
          </a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.titleBar {
  display: flex;
  align-items: center;
}

.titleBar span {
  font-size: 16px;
  color: #2a629a;
  margin-left: 10px;
}
.titleBar img {
  width: 50px;
  height: 450x;
}
/* status垂直居中在 a-col */
.status {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 50px;
  color: #2a629a;
  margin-top: 15%;
  font-size: 16px;
  cursor: pointer;
}
</style>
