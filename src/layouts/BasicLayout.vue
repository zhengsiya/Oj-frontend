<template>
  <div id="BasicLayout">
    <a-layout style="height: 400px">
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
<script setup>
import GlobalHeader from '@/components/GlobalHeader.vue'
</script>

<style lang="less" scoped>
#BasicLayout {
  .header {
    background-color: #001529;
    color: white;
    margin-top: 16px;
  }
  .content {
    background-color: gray;
    padding: 20px;
    margin-bottom: 0;
  }
  .footer {
    text-align: center;
    color: white;
    background-color: #001529;
    line-height: 60px;
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;
  }
}
</style>
