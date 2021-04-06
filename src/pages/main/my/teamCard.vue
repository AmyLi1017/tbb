<template>
    <div class="container">
        <div class="topBox">
            <div class="base">
                <teamCardInfo1 :info="info1" :hideShare="true"></teamCardInfo1>
            </div>
        </div>
        <div class="baseMore" @click="goToTeamBaseInfo">
            <teamCardInfo2 :info="info2"></teamCardInfo2>
        </div>
        <div class="middleBox">
            <teamCardBaseInfo1 :info="baseInfo1"></teamCardBaseInfo1>
        </div>
        <div class="bottomBox">
            <teamCardBaseInfo2 :projectList="baseInfo2"></teamCardBaseInfo2>
        </div>
        <loadMore :status="loadStatus" v-if="isLoadMore"></loadMore>
    </div>
</template>

<script>
    import api from '@/net/api'
    import store from '@/store'
    import loadMore from '@/components/uni-load-more'
    import teamCardInfo1 from '@/components/teamHeader/team-card-info1'
    import teamCardInfo2 from '@/components/teamHeader/team-card-info2'
    import teamCardBaseInfo1 from '@/components/teamHeader/team-card-baseInfo1'
    import teamCardBaseInfo2 from '@/components/teamHeader/team-card-baseInfo2'

    export default {
        name: "teamCard",
        components: {loadMore,teamCardInfo1,teamCardInfo2,teamCardBaseInfo1,teamCardBaseInfo2},
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
                    customerId: "1sdsewweweew", // 客户id，32位字符串
                    applyStatus: 1, // 求职状态:0未知,1找工作中,2观察中
                    workYear: 12, // 工作年限
                    position: 1, // 身份:0未知,1班组长/承包人
                    workTypeList: "抹灰工、钢筋工",
                    population: 23, // 队伍人数
                    description: "从业20多年，专业承包各类工程", // 自我介绍
                    provinceName: '重庆市',
                    cityName: '江北区'
                },
                baseInfo1: {
                    customerId: "1sdsewweweew", // 客户id，32位字符串
                    commitment: "本人及团队以诚信为本，以质量求生存，安全质量进度同时抓", // 信用承诺
                    financial_status: 1, // 财务状况:0未知,1良好,2一般
                    files: [
                        '../../static/imgs/starUser2.jpg',
                        '../../static/imgs/starUser2.jpg'
                    ] // 材料证明:图片链接数组字符串
                },
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
            goToTeamBaseInfo(){
                uni.navigateTo({
                    url: '/pages/main/my/teamBaseInfo'
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

                //获取班组基本信息
                api.postTeamCustomerInfo(data).then(res => {
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

                //获取班组承包信息
                api.postTeamCustomerAbility(data).then(res => {
                    if (res.messageId == 1000) {
                        _this.baseInfo1 = res.body;
                    }
                });
            },
            loadData(isLoadMore){
                //获取班组项目经验
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
                api.postTeamCustomerProject(dataProject).then(res => {
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
    @import "../../../assets/base";
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