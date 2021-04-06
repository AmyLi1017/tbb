<template>
  <div class="container">
    <div class="user-head">
      <img src="../../../static/imgs/taobanban_logo@2x.png" class="header-bg"/>
    </div>
    <div class="phone formItem">
      <!--<span class="tips">联系方式</span>-->
      <div class="inputBox">
        <span class="iconfont iconsmartphone"></span>
        <input class="inputItem text-space" type="text" @focus="clearInput" v-model="phone" placeholder="请输入手机号" @input="onChangeForm">
        <span @click="clearInput" class="delBox"><img src="../../../static/imgs/del.png"></span>
      </div>

    </div>
    <div class="phone_code formItem">
      <!--<span class="tips">验证</span>-->
      <div class="inputBox">
        <span class="iconfont iconmail"></span>
        <input type="text" placeholder="请输入验证码" class="inputItem text-space" v-model="phone_code" @input="onChangeForm">
        <a class="times text-space" @click="getPhoneCode">{{times}}</a>
      </div>
    </div>
    <!--<div :class="isFormErr?'':'formErrHide'" class="formErrMsg text-space">{{fromErrMsg}}</div>-->
    <div class="btnBox">
      <a class="button text-space" :class="formAllVal?'active':''" @click="phoneLogin">快捷登录</a>
      <p class="points text-space">快捷登录代表您已同意《淘班班用户协议》</p>
    </div>
  </div>
</template>

<script>
  import store from '@/store'
  import api from "@/net/api"
  import utils from "@/utils/index"
  import md5 from "@/common/md5"

  export default {
    name: "phoneLogin",
    data() {
      return {
        phone:'',
        phone_code: '',
        isFormErr: false,
        // fromErrMsg: '*请输入正确的手机号',
        formAllVal: false,
        isRegister: '',
        times: '获取验证码',
        canGetPhoneCode: true,
        randomValue:''
      }
    },
    methods: {
      onChangeForm(){
        let checkPhone = utils.textForm(this.phone);//电话号码格式校验
        let checkCode = utils.textForm(this.phone_code)//验证码格式校验
        if (checkCode && checkPhone) {
          this.formAllVal = true;
        } else {
          this.formAllVal = false;
        }
      },
      checkForm(){
        let phone = this.phone;
        let checkPhone = utils.isMobile(phone);//电话号码格式校验
        let checkCode = utils.textForm(this.phone_code)//验证码格式校验
        if(checkPhone && checkCode) {
          this.isFormErr = false;
        } else{
          this.isFormErr = true;
          if (!checkPhone && checkCode){
            if (this.phone == ''){
                wx.showToast({
                    title: '请输入手机号',
                    icon: 'none',
                    duration: 2000
                });
            } else {
                wx.showToast({
                    title: '请输入正确的手机号',
                    icon: 'none',
                    duration: 2000
                });
            }
          } else if (!checkCode && checkPhone) {
            if (this.phone_code == '') {
                wx.showToast({
                    title: '请输入验证码',
                    icon: 'none',
                    duration: 2000
                });
            } else {
                wx.showToast({
                    title: '请输入正确的验证码',
                    icon: 'none',
                    duration: 2000
                });
            }
          } else {
              wx.showToast({
                  title: '请输入手机号',
                  icon: 'none',
                  duration: 2000
              });
          }
        }
      },
      clearInput(){
        this.phone = '';
        this.formAllVal = false;
      },
      getPhoneCode(){
        let phone = this.phone;
        let checkPhone = utils.isMobile(phone);//电话号码格式校验
        if (!checkPhone) {
          this.isFormErr = true;
          if (this.phone == ''){
              wx.showToast({
                  title: '请输入手机号',
                  icon: 'none',
                  duration: 2000
              });
          } else {
              wx.showToast({
                  title: '请输入正确的手机号',
                  icon: 'none',
                  duration: 2000
              });
          }
        }else {
          this.isFormErr = false;
          let _this = this;
          if (this.canGetPhoneCode) {
            api.getPhoneCheckCode(this.phone,this.randomValue).then(res => {
              if (res.messageId == 1000) {
                  _this.canGetPhoneCode = false;
                  _this.countDown();//倒计时
              }else {
                wx.showToast({
                  title: '验证码获取失败，请重试！',
                  icon: 'none',
                  duration: 2000
                });
              }
            }).catch(res => {
                wx.showToast({
                    title: '验证码获取失败，请重试！',
                    icon: 'none',
                    duration: 2000
                });
            })
          }
        }
      },
      countDown(){
        let s = 120;
        let count = 120;
        let _this = this;
        let down = setInterval(function () {
          s -= 1;
          count -= 1;
          if (count === 0) {
            this.canGetPhoneCode = true;
            _this.times = '获取验证码';
            clearInterval(down);
          }else {
            _this.times = s + 's';
          }
        },1000)
      },
      phoneLogin(){
        // //跳过校验直接进入角色选择---开发用
        //   let userInfo = {
        //       customer: {
        //           icon: "http://www.baidu.com", // 头像
        //           account: "2133223", // 账号
        //           phone: "15068749417", // 手机号
        //           name: "小飞", // 姓名
        //           isAuthentication: 1, // 是否身份认证:0否,1是
        //       },
        //       token: "qqwqeweq1232322sas", // token，32为字符
        //       effectiveTime: 31000 // token有效时间：单位秒
        //   };
        //   store.commit("saveUser", {user: userInfo});
        //
        // uni.navigateTo({
        //     url:"/pages/page/login/chooseRole"
        // });

        //联调时开放
        this.checkForm();
        if (this.isFormErr == false && this.formAllVal == true) {
          //登录
          let _this = this;
          api.postPhoneLogin(this.phone, this.phone_code,this.randomValue).then(res => {
            if (res.messageId == 1000) {
              let userInfo = res.body.customer;
              store.commit("saveUser", {user: userInfo});
              let token = res.body.token;
              store.commit("saveToken", {token: token});
              let effective_time = res.body.effectiveTime;
              let now = new Date().getTime() + parseInt(effective_time) * 1000;
              wx.setStorageSync("expire", now);

              uni.navigateTo({
                url:"/pages/main/login/chooseRole"
              });
            }else if (res.messageId == 1006) {
              _this.isFormErr = true;
              _this.fromErrMsg = '*验证码错误';
              _this.phone_code = '';
              _this.formAllVal = false;
            }else {
              wx.showToast({
                title: '快捷登录失败，请重试！',
                icon: 'none',
                duration: 2000
              });
            }
          });
        } else {
          wx.showToast({
            title: '请输入正确的手机号',
            icon: 'none',
            duration: 2000
          });
        }
      }
    },
    onShow(){
      this.canGetPhoneCode = true;
      this.times = '获取验证码';
      this.randomValue = md5(Math.random());
    }
  }
</script>

<style scoped lang="less">
  @import "../../../assets/base";
  .formItem:first-child{
    margin-bottom: 30px;
  }
  .formItem{
    font-size: 14px;
    padding: 10px 20px;
    border-bottom: 1px solid @borderColor;
    position: relative;
    border-radius: 20px;
    margin: 0 10%;
    margin-bottom: 20px;
    box-shadow: #B4C5E5 2px 2px 10px;
    .inputBox{
      display: flex;
      flex-direction: row;
      align-items: center;
      .iconfont{
        flex: 1;
        color: @appBtnColor;
        font-size: 20px;
      }
      .inputItem{
        flex: 100;
      }
    }
    .inputItem{
      display: inline-block;
      width: 100%;
      padding-left: 15px;
    }
    .tips{
      color: @delColor;
      font-size: 12px;
    }
    .delBox{
      z-index: 100;
      display: inline-block;
      width: 40px;
      height: 30px;
      line-height: 30px;
      padding-top: 6px;
      text-align: center;
      flex: 1;
      img{
        width: 18px;
        height: 18px;
        display: inline-block;
      }
    }
    .times{
      text-align: center;
      display: inline-block;
      height: 35px;
      line-height: 35px;
      border-radius: 22px;
      background: @bgColor;
      color: @appBtnColor;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 66;
      font-size: 12px;
      position: relative;
      left: 10px;
    }
  }
  .formErrMsg{
    width: 80%;
    margin: 0 10%;
  }
  .formErrHide{
    visibility: hidden;
  }
  .button{
    height: 45px;
    line-height: 45px;
    display: block;
    text-align: center;
    font-size: 18px;
    background: @appBtnColor;
    color: white;
    border: none;
    margin-top: 35px;
    box-shadow: 3px 3px 3px @borderColor;
    border-radius: 24px;
  }
  .active{
    background: @appBtnColor;
    color: white;
  }
  .points{
    text-align: center;
    line-height: 2;
    font-size: 11px;
    color: @textLightColor;
    margin-top: 10px;
  }
  .btnBox{
    padding: 0 10%;
  }
  .user-head {
    width: 100%;
    padding: 66px 0;
    align-items: center;
    display: flex;
    flex-direction: column;
    .header-bg {
      width: 80px;
      height: 80px;
      display: block;
    }
  }
</style>
