<template>
  <div class="container">
    <div class="topBox"></div>
    <div class="middle">
      <div class="imgBox" :style="{backgroundImage: 'url(' + info.customer.icon + ')'}" v-if="info.customer.icon"></div>
      <div class="name">{{info.customer.name}}</div>
      <div class="phone">{{info.customer.phone}}</div>
    </div>
    <div class="bottom">
      <div class="liBox" @click="goToDetail">
        <span class="iconfont iconedit"></span>
        <div class="title">基本资料</div>
        <span class="iconfont iconright"></span>
      </div>
      <div class="liBox" @click="goToAuthentication">
        <span class="iconfont iconcertificate"></span>
        <div class="title">
          <div class="lf">实名认证</div>
          <div class="rt" v-if="info.customer.isAuthentication == 1">已认证</div>
          <div class="rt" v-if="info.customer.isAuthentication == 0">未认证</div>
        </div>
        <span class="iconfont iconright"></span>
      </div>
      <div class="liBox" v-if="roleType==0" @click="goToComInfo">
        <span class="iconfont icontubiaozhizuomoban-111"></span>
        <div class="title">企业认证</div>
        <span class="iconfont iconright"></span>
      </div>
      <div class="liBox" v-if="roleType==1" @click="goToTeamCard">
        <span class="iconfont icontubiaozhizuomoban-111"></span>
        <div class="title">班组名片</div>
        <span class="iconfont iconright"></span>
      </div>
      <div class="liBox" v-if="roleType==2" @click="goToStaffCard">
        <span class="iconfont icontubiaozhizuomoban-111"></span>
        <div class="title">找活名片</div>
        <span class="iconfont iconright"></span>
      </div>
      <div class="liBox">
        <span class="iconfont iconshare1"></span>
        <div class="title">分享给好友</div>
        <span class="iconfont iconright"></span>
      </div>
      <div class="liBox">
        <span class="iconfont iconpoweroff"></span>
        <div class="title">注销登录</div>
        <span class="iconfont iconright"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '@/store'
  import api from '../../../net/api'

  export default {
    data() {
      return {
          roleType: '',
          info: {}
      }
    },
    methods: {
        loadData(){
            let _this = this;
            api.getCustomerToken().then(res => {
                if (res.messageId == 1000) {
                    _this.info = res.body;
                }else {
                    uni.showToast({
                        title: '网络错误，请重试！',
                        icon: 'none',
                        duration: 2000
                    })
                }
            }).catch(res => {
                uni.showToast({
                    title: '网络错误，请重试！',
                    icon: 'none',
                    duration: 2000
                })
            });
        },
        goToDetail(){
            uni.navigateTo({
                url: '/pages/main/my/baseInfo'
            })
        },
        goToAuthentication(){
            uni.navigateTo({
                url: '/pages/main/my/authentication'
            })
        },
        goToComInfo(){
            uni.navigateTo({
                url: '/pages/main/my/companyInfo'
            })
        },
        goToTeamCard(){
            uni.navigateTo({
                url: '/pages/main/my/teamCard'
            })
        },
        goToStaffCard(){
            uni.navigateTo({
                url: '/pages/main/my/staffCard'
            })
        },
    },

    onShow(){
        this.roleType = store.state.role;
    },

    onLoad() {
      // 调用应用实例的方法获取全局数据
      this.loadData()
    }
  }
</script>

<style lang="less">
  @import "../../../assets/base";
  .container{
    color: @appBtnColor;
    letter-spacing: 1px;
    .topBox{
      background: @appBtnColor;
      height: 150px;
      width: 120%;
      border-radius: 0 0 50% 50%;
      margin-left: -10%;
    }
    .middle{
      position: relative;
      top: -80px;
      margin: 0 15px;
      background: white;
      box-shadow: 2px 2px 10px @blueBgColor;
      border-radius: 6px;
      padding: 15px;
      box-sizing: border-box;
      text-align: center;
      padding-top: 40px;
      border-bottom: 2px solid @appBtnColor;
      .imgBox{
        display: inline-block;
        width: 66px;
        height: 66px;
        border-radius: 50%;
        position: absolute;
        left: calc(50% - 33px);
        top: -33px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center 0;
      }
      .name{
        font-size: 16px;
        font-weight: bold;
      }
      .phone{
        font-size: 11px;
        color: @delColor;
      }
    }
    .bottom{
      position: relative;
      top: -60px;
      margin: 0 15px;
      background: white;
      box-shadow: 2px 2px 10px @blueBgColor;
      border-radius: 6px;
      padding: 0 15px;
      box-sizing: border-box;
      .liBox{
        display: flex;
        flex-flow: row;
        align-items: center;
        padding: 7px 0;
        border-bottom: 1px dashed @bgColor;
        .iconfont{
          flex: 1;
          font-size: 24px;
        }
        .iconright{
          font-size: 18px;
          text-align: right;
        }
        .title{
          flex: 8;
          display: flex;
          flex-flow: row;
          align-items: center;
          .lf{
            flex: 1;
          }
          .rt{
            flex: 1;
            text-align: right;
          }
        }
      }
      .liBox:last-child{
        border-bottom: none;
      }
    }
  }
</style>
