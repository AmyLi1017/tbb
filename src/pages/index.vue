<template>
  <div class="container">
    <div class="head">
      <swiper-bar :imgList="swiperList"  :isPoint="true"></swiper-bar>
    </div>
    <div class="showTips">
      <div class="left"><span class="iconfont iconaward"></span>实名保障</div>
      <div class="right"><span class="iconfont iconflow-others"></span>快速高效</div>
    </div>
    <div class="goTo">
      <div class="tipTitle">快捷操作</div>
      <indexBtn :roleType="roleType"></indexBtn>
    </div>
    <div class="foot">
      <!--<div class="tipTitle">淘班班解决的问题</div>-->
      <img src="../static/imgs/head_4.png" alt="" mode="widthFix">

      <div class="text">
        <div class="titleP">建筑集团公司、劳务公司</div>
        <div class="content">快速对接、直观了解承包人的实力，引进最可靠的承包人</div>
        <div class="titleP">承包人、班组长</div>
        <div class="content">找优质项目方，同时招到合适的工长、建筑工人</div>
        <div class="titleP">建筑工人</div>
        <div class="content">本土头部企业工程项目直招，快速找到满意的活干</div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '@/store'
  import swiperBar from "@/components/lps-swiper.vue"
  import indexBtn from "@/components/indexContentType.vue"

  export default {
      components:{
          swiperBar,
          indexBtn
      },
    data() {
      return {
          roleType: '',//角色：0.企业 1.班组 2.工人
          swiperList:[
              {
                  "id": 3,
                  "name": "招商A",
                  "type": 0,
                  "href": "/static/imgs/head@1X.png",
                  "sort": 0,
                  "status": 1,
                  "created_at": "2020-04-07 15:05:35",
                  "updated_at": "2020-04-10 14:31:24",
                  "type_name": "首页广告"
              }
          ]
      }
    },
    methods: {

    },

    onShow(){
          //待注释------------------>>
        // let userInfo = {
        //     customer: {
        //         icon: "http://www.baidu.com", // 头像
        //         account: "2133223", // 账号
        //         phone: "15068749417", // 手机号
        //         name: "小飞", // 姓名
        //         isAuthentication: 1, // 是否身份认证:0否,1是
        //         isImg: 1,//是否有图:0否,1是（只班组）
        //     },
        //     token: "qqwqeweq1232322sas", // token，32为字符
        //     effectiveTime: 31000 // token有效时间：单位秒
        // };
        // store.commit("saveUser", {user: userInfo});
        //待注释------------------<<

      let token = uni.getStorageSync("token");
      let expire = uni.getStorageSync("expire");
      let now = new Date().getTime();
      if ((expire > now) && token) {
        let userInfo = store.state.user;
        if (userInfo) {
          this.userInfo = userInfo;
        }
          this.roleType = store.state.role
      } else {
          //登录跳转
          uni.navigateTo({
              url: '/pages/main/login/login'
          });
      }
    },

    onLoad(){

    },
    onReachBottom(){
    }
  }
</script>

<style lang="less">
  @import "../assets/base";
  .container{
    padding: 0;
    position: relative;
    color: @fontColor;
    font-size: 13px;
    .head{
      margin-top: 5px;
    }
    .showTips{
      display: flex;
      align-items: center;
      flex-flow: row;
      padding: 0 30px;
      color: @textLightColor;
      vertical-align: middle;
      .left{
        flex: 1;
        .iconaward{
          color: @appBtnColor;
        }
      }

      .right{
        flex: 1;
        text-align: right;
        .iconclock{
          color: @appBtnColor;
        }
      }
      .iconfont{
        font-size: 18px;
        font-weight: bold;
        display: inline-block;
        margin-right: 4px;
      }
    }
    .goTo{
      margin-top: 25px;
      padding: 0 20px;
      .tipTitle{
        font-size: 15px;
        font-weight: bold;
        color: @appBtnColor;
        letter-spacing: 1px;
        font-family:"Microsoft YaHei";
      }
    }
    .foot{
      width: 100%;
      margin-top: 25px;
      padding: 0 15px;
      padding-bottom: 40px;
      box-sizing: border-box;
      img{
        display: inline-block;
        width: 100%;
        border-radius: 4px;
      }
      .tipTitle{
        font-size: 15px;
        font-weight: bold;
        color: @appBtnColor;
        font-family:"Microsoft YaHei";
        letter-spacing: 1px;
        margin-left: 10px;
        margin-top: 10px;
      }
      .text{
        margin-top: 10px;
        letter-spacing: 1px;
        padding: 0 10px;
        line-height: 2;
        .titleP{
          font-size: 13px;
          color: @appBtnColor;
          margin: 4px 0;
          font-weight: bold;
          padding-top: 10px;
        }
        .content{
          color: @delColor;
        }
      }

    }
  }
</style>
