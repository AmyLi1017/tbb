<template>
  <div class="popBox">
    <div class="popContent">
      <div class="pop_icon" v-if="icon"><img :src="icon" mode="widthFix"></div>
      <div class="pop_content text-space">{{content}}</div>
      <div class="pop_close text-space" @click="closePop">知道了</div>
    </div>
    <div class="mask" v-if="mask"></div>
  </div>
</template>

<script>
  export default {
    name: 'tips',
    props: {
      icon: {
        default: ""
      },
      content: {
        default: ""
      },
      mask: {
        default: ""
      }
    },
    methods: {
      closePop(){
        this.$emit('change',false)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../assets/base";
  .popContent{
    position: fixed;
    top: calc(40% - 50px);
    left: 21%;
    width: 58%;
    z-index: 10000;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    background: white;
    color: @appTextColor;
    line-height: 1.5;
    text-space: 1px;
    text-align: center;
    font-size: 14px;
    padding: 20px;
    box-sizing: border-box;
    .pop_icon{
      line-height: 1;
      margin: 0 0 8px 0;
      img{
        width: 20%;
        display: inline-block;
      }
    }
    .pop_close{
      color: #45C2C0;
      margin-top: 10px;
    }
  }
  .mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(56,56,56,0.4);
    z-index: 9999;
  }
</style>
