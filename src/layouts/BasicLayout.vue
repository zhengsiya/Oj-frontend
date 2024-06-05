<script setup>
import GlobalHeader from '@/components/GlobalHeader.vue'
</script>

<template>
  <div id="BasicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <span>编程导航 by 嘻嘻哩哩</span>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style lang="less" scoped>
#BasicLayout {
  .header {
    background-color: #fff;
    color: white;
    margin-top: 16px;
  }
  .content {
    background-color: white;
    padding: 20px;
    margin-bottom: 0;
    overflow: auto;
  }
  .footer {
    text-align: center;
    color: #f6f5f5;
    background-color: #1b3c73;
    line-height: 60px;
    position: sticky;
    bottom: 0px;
    left: 0;
    right: 0;
  }
}
</style>
