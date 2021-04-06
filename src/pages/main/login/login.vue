<template>
  <div class="container">
    <div class="user-head">
      <img src="../../../static/imgs/taobanban_logo@2x.png" class="header-bg"/>
    </div>
    <div class="btnBox">
      <p class="text-space loginTitle">登录或注册</p>
      <button v-if="canIUse" class="btn-authorize btn1" id="button" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"><img src="../../../static/imgs/wechat_tb@2x.png" class="btn-icon btn-icon1"/>微信账号快速登录</button>
      <button class="btn-authorize btn2" @click="goPhoneLoginRegister"><img src="../../../static/imgs/phone_tb@2x.png" class="btn-icon btn-icon2"/>手机号注册/登录</button>
    </div>
    <!--<div class="text">淘优选班组，赶紧来看看吧！</div>-->
  </div>
</template>

<script>
  import store from '@/store'
  import api from "@/net/api"

  export default {
    data() {
      return {
        canIUse: wx.canIUse('button.open-type.getPhoneNumber')
      }
    },
    methods: {
      getPhoneNumber(e) {
        console.log(e)
        let detail = e.mp.detail
        this.login(detail)
      },
      login(detail) {
        wx.showLoading({
          title:"正在加载"
        })
        wx.login({
          success: async (res) => {
            wx.hideLoading();
            if (detail.errMsg === 'getPhoneNumber:ok'){//授权手机号登录
              try {
                let code = res.code;
                let encryptedData = detail.encryptedData;
                let iv = detail.iv;
                let cloudID = detail.cloudID;
                let response = await api.login(code, encryptedData, iv,cloudID);
                if (response.bg_code == 1000) {
                  // store.commit('saveUserStatus', {userStatus: true});//登录状态
                  let userInfo = response.data.customerinfo;
                  store.commit("saveUser", {user: userInfo});
                  let token = response.token;
                  store.commit("saveToken", {token: token});
                  let effective_time = response.effective_time;
                  let now = new Date().getTime() + parseInt(effective_time) * 1000;
                  wx.setStorageSync("expire", now);
                  if (userInfo.is_register != 1) {
                    wx.showModal({
                      title: '手机号未注册',
                      content: '是否使用' + response.phone + '注册',
                      showCancel: false,
                      confirmText: '注册',
                      success: function (res) {
                        if (res.confirm) {
                          api.token_register().then(res => {
                            userInfo = res.data.customerinfo;
                            store.commit("saveUser", {user: userInfo});
                            token = res.token;
                            store.commit("saveToken", {token: token});
                            effective_time = res.effective_time;
                            let now = new Date().getTime() + parseInt(effective_time) * 1000;
                            wx.setStorageSync("expire", now);
                            wx.navigateTo({
                              url:"pages/index"
                            });
                          });
                        }
                      }
                    })
                  }else {
                    wx.navigateTo({
                      url:"pages/index"
                    });
                  }
                }else {
                  wx.showToast({
                    title: response.msg,
                    icon: 'none',
                    duration: 2000
                  });
                }

              } catch (e) {
                console.error(e);
                wx.showToast({
                  title:e,
                  icon:"none"
                })
              }
            }else if (detail.errMsg === "getUserInfo:fail auth deny" || detail.errMsg === "getUserInfo:auth deny"){
              wx.showToast({
                title: '您拒绝了授权',
                icon: 'none',
                duration: 2000
              });
            }else {
              wx.showToast({
                title: '操作失败，请重试！',
                icon: 'none',
              })
            }
          },
          fail: (error) => {
            wx.showToast({
              title:error,
              icon:"none"
            });
            console.error(error)
          }
        })
      },

      goPhoneLoginRegister() {
        uni.navigateTo({
          url:"/pages/main/login/phoneLogin"
        });
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../assets/base";


  .container{
    padding: 0;
    height: 100%;
    text-align: center;
  }
  .user-head {
    width: 100%;
    padding-top: 66px;
    align-items: center;
    display: flex;
    flex-direction: column;
    .header-bg {
      width: 80px;
      height: 80px;
      display: block;
    }
  }

  .btnBox{
    width: 100%;
    text-align: center;
    border-radius:22px;
    padding-top: 66px;
    margin: 0;
    /*box-shadow: #B4C5E5 2px 2px 10px;*/
    .loginTitle{
      color: @fontColor;
      font-size: 14px;
    }
    .btn-authorize {
      background: @appBtnColor;
      border-radius: 28PX;
      letter-spacing: 2px;
      display: inline-block;
      box-shadow: #B4C5E5 2px 2px 10px;
      :after {
        border: none;
      }
      font-size: 14px;
      margin: 12px;
      color: white;
      width: 250px;
      height: 45px;
      text-align: center;
      line-height: 45px;
      &:active {
        background: darken(@fontColor, 5%);
        color: white;
      }
      .btn-icon{
        width: auto;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 15px;
      }
      .btn-icon1{
        width: 25px;
      }
      .btn-icon2{
        width: 12px;
      }
    }
    .btn2{
      background: none;
      color: @fontColor;
    }
  }
  .text{
    width: 250px;
    margin: 0;
    display: inline-block;
    text-align: center;
    color: @appBtnColor;
    font-size: 12px;
    letter-spacing: 1px;
    padding-left: 20px;

  }
</style>
