import store from "@/store/index"
import wx from "@/utils/wx"
import api from '@/net/api'


function formatNumber(n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
}

function isNumber(obj) {
    let num = Number(obj);
    return typeof num === 'number' && !isNaN(num)
}

function isMobile(phone) {
    let reg = /^1[3|4|5|7|8][0-9]\d{8,11}$/
    return reg.test(phone)
}

function delHtmlTag(str){
    return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
}

function replaceFont(str){
    return str.replace(/font/g,"label");//去掉所有的html标记
}

function formatTime(time) {
    let date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;
}

function formatMoney(money) {
   let float_money = parseFloat(money)
    // if (float_money > 10000){
    //     let limit = (float_money % 10000).toFixed(2)
    //    return parseInt(float_money / 10000) + "亿" + limit + "万"
    // }
    return float_money.toFixed(2) + "万"
}

function IdCodeValid(code){
    //身份证号合法性验证
    //支持15位和18位身份证号
    //支持地址编码、出生日期、校验位验证
    var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
    var row = true;

    if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(code)){
        row = false;
        // msg = "身份证号格式错误";
    }else if(!city[code.substr(0,2)]){
        row = false;
        // msg = "身份证号地址编码错误";
    }else{
        //18位身份证需要验证最后一位校验位
        if(code.length == 18){
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++)
            {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            if(parity[sum % 11] != code[17].toUpperCase()){
                row=false;
                // msg = "身份证号校验位错误";
            }
        }
    }
    return row
}

/**
 * 监测是否登录
 *
 * @returns {Promise<any>}
 */
function checkLogin() {
  return new Promise((resolve,reject) => {
    let token = wx.getStorageSync("token");
    let expire = wx.getStorageSync("expire");
    let now = new Date().getTime();
    if ((expire > now) && token) {
      resolve('token 还未过期')
      return true;
    } else {
      store.dispatch("clearSession");

      console.log(111111)
      const url = '/packageA/login'
      this.$router.push(url)
      reject('token 过期')
      return false;
    }
  })
}

/**
 * 登录请求
 *
 * @param detail
 * @param resolve
 * @param reject
 */
function loginAction(detail,resolve,reject) {
    wx.showLoading({
        title:"正在加载",
        mask:true
    })
    wx.login({
        success: async (res) => {
            //console.log('登录凭证：' + res.code)
            //console.log(await api.getSession(res.code),'codeData');
            wx.hideLoading()
            try {
                let data = await api.getSession(res.code)
                let openid = data.openid
                let session = data.session
                let userInfo = await api.login(session, detail.encryptedData, detail.iv);
                store.commit("saveUser", {user: userInfo.userInfo})
                store.commit("saveToken", {token: userInfo.token})
                let now = new Date().getTime() + parseInt(userInfo.expire) * 1000
                wx.setStorageSync("expire", now)
                wx.setStorageSync("openid", openid)
                console.log(userInfo);
                resolve('success')
            } catch (error) {
                console.error(error)
                reject('error:' + error)
            }

        },
        fail: (error) => {
            reject('error:' + error)
            console.error(error)
        }
    })
}


function isDef(value) {
    return value !== undefined && value !== null;
}

//校验表单--文本填写--是否为空，是否有空字符串
function textForm(value) {
  if (value.length == 0) {
    return false;
  }else if ((value.toString()).replace(/(^s*)|(s*$)/g, "").length ==0) {
    return false;
  }else if ((value.toString()).indexOf(" ") >= 0 && (value.toString()).replace(/(^s*)|(s*$)/g, "").length != 0){
    return (value.toString()).replace(/\s/g, "");
  }else {
    return value;
  }
}

function checkEmail(email){
  /*校验邮箱*/
  if(!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(email)){
    return false;
  }else {
    return true;
  }
}

function dataCode (res) {
  let messageId = res.messageId;
  let data = false;
  if (messageId == 1000) {
    data = res;
  } 
  if (messageId == 1001) {
    wx.showToast({
      title:'账号不存在',
      icon:"none"
    })
  }
  if (messageId == 1002) {
    wx.showToast({
      title:'手机号错误',
      icon:"none"
    })
  }
  if (messageId == 1003) {
    wx.showToast({
      title:'账号或密码错误',
      icon:"none"
    })
  }
  if (messageId == 1004) {
    wx.showToast({
      title:'登录过期，请重新登录！',
      icon:"none"
    })
  }
  if (messageId == 1005) {
    wx.showToast({
      title:'验证码错误！',
      icon:"none"
    })
  }
  if (messageId == 1006) {
    wx.showToast({
      title:'手机校验码错误！',
      icon:"none"
    })
  }
  if (messageId == 1007) {
    wx.showToast({
      title:'收藏企业达到最大，请取消部分再收藏！',
      icon:"none"
    })
  }
  if (messageId == 1008) {
    wx.showToast({
      title:'页码超过100！',
      icon:"none"
    })
  }
  if (messageId == 1009) {
    wx.showToast({
      title:'每页数量超过30！',
      icon:"none"
    })
  }
  if (messageId == 1010) {
    wx.showToast({
      title:'请求的参数不完整',
      icon:"none"
    })
  }
  if (messageId == 1011) {
    wx.showToast({
      title:'错误的大小数点',
      icon:"none"
    })
  }
  if (messageId == 1012) {
    wx.showToast({
      title:'用户不存在',
      icon:"none"
    })
  }
  if (messageId == 1013) {
    wx.showToast({
      title:'code 发送失败',
      icon:"none"
    })
  }
  if (messageId == 2000) {
    data = res;
  }
  if (messageId == 2001) {
    data = res;
  }
  if (messageId == 3000 || messageId == 3001 || messageId == 3002 || messageId == 3003 || messageId == 3010 || messageId == 3011 || messageId == 3012 || messageId == 3013) {
    data = res;
  }
  if (messageId == 4001) {
    wx.showToast({
      title:'不符合参与活动条件，请联系管理员！',
      icon:"none"
    })
  }
  if (messageId == 4002) {
    wx.showToast({
      title:'您已经参与过此次活动,不能重复参与哦！',
      icon:"none"
    })
  }
  if (messageId == 4003) {
    wx.showToast({
      title:'活动未开始，不能参与',
      icon:"none"
    })
  }
  if (messageId == 4004) {
    wx.showToast({
      title:'活动结束，不能参与',
      icon:"none"
    })
  }
  if (messageId == 9999) {
    wx.showToast({
      title:'系统错误',
      icon:"none"
    })
  }
  return data;
}

function rightLimitControl (vipLevel,type) {
  switch (type) {
    case 1: //资质查询
      if (vipLevel > 0) {
        return true;
      } else {
        return false
      }
    case 2: //人员详情
      if (vipLevel > 1) {
        return true;
      } else {
        return false
      }
    case 3: //资质详情
      if (vipLevel > 0) {
        return true;
      } else {
        return false
      }
    case 4: //业绩详情
      if (vipLevel > 1) {
        return true;
      } else {
        return false
      }
    case 5: //备案详情
      if (vipLevel > 0) {
        return true;
      } else {
        return false
      }
  }
}

export default {
    formatNumber,
    formatTime,
    checkLogin,
    isMobile,
    isNumber,
    IdCodeValid,
    isDef,
    delHtmlTag,
    replaceFont,
    formatMoney,
    loginAction,
    textForm,
    checkEmail,
    dataCode,
    rightLimitControl
}


