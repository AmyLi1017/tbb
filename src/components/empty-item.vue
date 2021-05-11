<template>
  <div class="container">
    <div class="iconfont iconmeiyoushuju"></div>
    <div class="title">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: "empty-item",
  props: {
    title: ''
  }
}
</script>

<style scoped lang="less">
@import "../assets/base";
.container{
  color: @delColor;
  text-align: center;
  margin-top: 10px;
  .iconfont{
    font-size: 50px;
  }
}
</style>
