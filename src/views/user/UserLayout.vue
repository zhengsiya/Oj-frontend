<template>
  <div id="UserLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <div class="titleBar">
          <img src="@/assets/avater.png" alt="logo" />
          <span>嘻嘻OJ</span>
        </div>
      </a-layout-header>
      <a-layout-content class="content">
        <div class="backregion">
          <img src="" alt="loginbg" />
        </div>
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <span>编程导航 by 嘻嘻哩哩</span>
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script setup></script>

<style lang="less" scoped>
#UserLayout {
  .header {
    // height: 100px;
    background-color: #fff;
    margin: 10px 0;
    color: black;
    text-align: center;
    font-size: 20px;
    .titleBar {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .titleBar img {
      width: 70px;
      height: 70px;
      /* display: flex;
  align-items: center; */
    }
    .titleBar span {
      font-size: 16px;
      color: #2a629a;
      margin-left: 10px;
    }
  }
  .content {
    display: flex;
    background: url('@/assets/loginbg.jpeg') no-repeat center center;
    background-size: cover;
    padding: 24px;
    min-height: 280px;
    .backregion,
    .backregion > img {
      background-color: black;
      width: 100vh;
      height: 70vh;
    }
  }
  .footer {
    position: sticky;
    bottom: 0;
    text-align: center;
    margin: 10px 0;
  }
}
</style>
