<script setup>
import BasicLayout from '@/layouts/BasicLayout'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import '@/utils/request'

/*
 *全局入口函数
 *全局初始化函数 ,有全局单词调用的函数都可以写到这里
 */
const doInit = () => {
  console.log('全局初始化函数')
}

onMounted(() => {
  doInit()
})

const route = useRoute()
</script>

<template>
  <div id="app">
    <template
      v-if="
        route.path.startsWith('/user') ||
        route.path.startsWith('/questions/solve')
      "
    >
      <router-view />
    </template>
    <template v-else>
      <basic-layout></basic-layout>
    </template>
  </div>
</template>

<style></style>
