<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
html,
body {
  font-size: 14px;
  background: #f4f7fa;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

#app {
  height: 100%;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC,
    Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
}
* {
  margin: 0;
  padding: 0;
}
</style>
<script>
export default {
  created(){
      // this.$i18n.locale = localStorage.getItem("i18") || 'en';
  }
}
</script>