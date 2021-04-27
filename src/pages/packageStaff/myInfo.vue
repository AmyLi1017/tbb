<template>
  <div class="container">
    <div class="topBox">
      <div class="base">
        <staffCardInfo1 :info="info1" :hideShare="true"></staffCardInfo1>
      </div>
    </div>
    <div class="baseMore" @click="goToStaffBaseInfo">
      <staffCardInfo2 :info="info2"></staffCardInfo2>
    </div>
    <div class="middleBox">
      <staffCardBaseInfo1 :info="baseInfo1"></staffCardBaseInfo1>
    </div>
    <div class="bottomBox">
      <staffCardBaseInfo2 :projectList="baseInfo2"></staffCardBaseInfo2>
    </div>
    <loadMore :status="loadStatus" v-if="isLoadMore"></loadMore>
  </div>
</template>

<script>
import api from '@/net/api'
import store from '@/store'
import loadMore from '@/components/uni-load-more'
import staffCardInfo1 from '@/components/staff/staff-card-info1'
import staffCardInfo2 from '@/components/staff/staff-card-info2'
import staffCardBaseInfo1 from '@/components/staff/staff-card-baseInfo1'
import staffCardBaseInfo2 from '@/components/staff/staff-card-baseInfo2'

export default {
  name: "myInfo",
  components: {loadMore,staffCardInfo1,staffCardInfo2,staffCardBaseInfo1,staffCardBaseInfo2},
  data(){
    return {
      isAuthentication: '',//是否实名
      applyStatus: '',//求职状态

      customerId: '',
      pageIndex: '',
      pageSize: '',
      isHasMoreData: false,
      tipsText: '到底了，不要再拉了',
      loadStatus:'loading',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
      isLoadMore:false,  //是否加载中

      info1: {
        id: "1sdsewweweew", // 客户id，32位字符串
        icon: "../../static/imgs/starUser2.jpg", // 头像
        name: "小飞", // 姓名
        sex: 1, // 性别:0女,1男,2未知
        age: 23, // 年龄
        phone: "12320230023", // 手机号
        nationId: 1,   // 民族id
        nationName: "汉族", // 民族名称
        idCard: "1223232", //身份证号码
        isAuthentication: 1
      },
      info2: {
        id: "123232332323232", // 工人
        customerId: "134dsdsdsdsfgfd", // 客户id
        applyStatus: 1, // 求职状态:0未知,1找工作中,2观察中
        workYear: 1, // 工作年限
        provinceId: 120000, // 省id
        provinceName: "北京市", // 省名称
        cityId: 130100, // 市id
        cityName: "东城区", // 市名称
        position: 1, // 身份:0未知,1工人
        workTypeId: 12,  // 工种id
        workTypeName: "小工", // 工种名称
        description: "自我介绍", // 自我介绍
        workTypeList: "抹灰工、钢筋工",
      },
      baseInfo1: [{
        id: "123232332323232", // 工人职业技能回显id
        customerId: "134dsdsdsdsfgfd", // 客户id
        certificateName: "证书名称1", // 证书
        files: ['../../static/imgs/starUser2.jpg','../../static/imgs/starUser2.jpg']  // 附件地址,数组链接
      },{
        id: "123232332323232", // 工人职业技能回显id
        customerId: "134dsdsdsdsfgfd", // 客户id
        certificateName: "证书名称2", // 证书
        files: ['../../static/imgs/starUser2.jpg','../../static/imgs/starUser2.jpg']  // 附件地址,数组链接
      }],
      baseInfo2: [{
        id: "1sdsewwewqqwasweew", // 项目id
        customerId: "1sdsewweweew", // 客户id，32位字符串
        projectName: "项目名项目名项目名项目名1", // 项目名称
        mainEnterprise: "重庆建工第三建筑工程有限公司", // 总包单位
        contractAmount: 10000000, // 承包金额:单位分
        workContent: "地坪、抹灰、砌砖", // 工作内容
        provinceName: '江苏省',
        cityName:'南京市',
        files: [
          '../../static/imgs/starUser2.jpg',
          '../../static/imgs/starUser2.jpg'
        ]// 材料证明:图片链接数组字符串
      },{
        id: "1sdsewwewqqwasweew2", // 项目id
        customerId: "1sdsewweweew2", // 客户id，32位字符串
        projectName: "项目名项目名项目名项目名2项目名项目名项目名项目名2", // 项目名称
        mainEnterprise: "重庆建工第三建筑工程有限公司2", // 总包单位
        contractAmount: 20000000, // 承包金额:单位分
        workContent: "地坪、抹灰、砌砖", // 工作内容
        provinceName: '黑龙江省',
        cityName:'哈尔滨市',
        files: [
          '../../static/imgs/starUser2.jpg',
          '../../static/imgs/starUser2.jpg'
        ] // 材料证明:图片链接数组字符串
      }],
    }
  },
  methods: {
    goToStaffBaseInfo(){
      uni.navigateTo({
        url: '/pages/main/my/staffBaseInfo'
      })
    },
    loadInfo(){
      let data = {customerId: this.customerId};
      //获取用户基本资料
      let _this = this;
      api.postTeamCustomerBase().then(res => {
        if (res.messageId == 1000) {
          _this.info1 = res.body;
          _this.info1.isAuthentication = _this.isAuthentication;
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

      //获取工人基本信息
      api.getWorkerInfo(data).then(res => {
        if (res.messageId == 1000) {
          _this.info2 = res.body;

          let workTypeText = '';
          for (let i;i<res.body.workTypeList.length;i++){
            if (i < res.body.workTypeList - 1) {
              workTypeText += res.body.workTypeList[i] + '、';
            }else {
              workTypeText += res.body.workTypeList[i]
            }
          }
          _this.info2.workTypeList = workTypeText;
        }
      });

      //获取工人技能信息
      api.postWorkerAbilityInfo(data).then(res => {
        if (res.messageId == 1000) {
          _this.baseInfo1 = res.body;
        }
      });
    },
    loadData(isLoadMore){
      //获取个人项目经验
      if (isLoadMore) {
        if (this.isHasMoreData) {
          this.pageIndex++;
        } else {
          return
        }
      } else {
        this.pageIndex = 1
      }

      let dataProject = {
        customerId: this.customerId,
        pageSize: '',
        pageIndex: 1,
      };
      // wx.showLoading();
      api.postWorkerProjectList(dataProject).then(res => {
        wx.hideLoading();
        if (res.messageId == 1000) {
          if (res.body.pageTotal == this.pageIndex) {
            this.isHasMoreData = false;
            this.isLoadMore = false;
            this.loadStatus = 'nomore'
          } else {
            this.isHasMoreData = true;
            this.isLoadMore = false;
          }

          if (isLoadMore) {
            _this.baseInfo2 = this.baseInfo2.concat(res.body.data)
          } else {
            wx.pageScrollTo({
              scrollTop:0
            });
            this.baseInfo2 = res.body.data
          }
        }else {
          wx.hideLoading();
          wx.showToast({
            icon: "none",
            title: error
          });
          this.isLoadMore = false;
        }
      }).catch(error => {
        wx.hideLoading();
        wx.showToast({
          icon: "none",
          title: error
        });
        this.isLoadMore = false;
        console.log(111111111)
      });
    },
  },
  onLoad(){
    this.isAuthentication = store.state.user.customer.isAuthentication;
    console.log(this.isAuthentication,'isAuthentication');
    this.loadInfo();
    this.loadData(false);
  },
  onReachBottom(){  //上拉触底函数
    if(!this.isLoadMore){  //此处判断，上锁，防止重复请求
      this.isLoadMore = true;
      console.log(2222222);
      this.loadData(true);
    }
  },
}
</script>

<style scoped lang="less">
@import "../../assets/base";
.container{
  color: @appBtnColor;
  font-size: 12px;
  letter-spacing: 1px;
  line-height: 2;
  padding-bottom: 50px;
  .topBox{
    width: 96%;
    margin: 10px 2%;
    box-sizing: border-box;
  }
  .baseMore{
    margin: 0 10px;
    border-top: 1px dashed @blueBgColor;
  }
  .middleBox{
    padding: 0 25px;
    margin: 20px 0;
  }
  .bottomBox{
    padding: 0 25px;
  }
}
</style>
