<template>
    <div class="container">
        <div class="topBox">
            <div class="base">
                <teamCardInfo1 :info="info1" :applyStatus="applyStatus"></teamCardInfo1>
            </div>
            <div class="baseMore">
                <teamCardInfo2 :info="info2"></teamCardInfo2>
            </div>
        </div>
        <div class="middleBox">
            <teamCardBaseInfo1 :info="baseInfo1"></teamCardBaseInfo1>
        </div>
        <div class="bottomBox">
            <teamCardBaseInfo2 :projectList="baseInfo2"></teamCardBaseInfo2>
        </div>
        <loadMore :status="loadStatus"></loadMore>

        <div class="btnBox">
            <div class="left"><a class="button text-space" :class="isActive?'active':''" @click="getTeamPhone">获取联系方式</a></div>
            <div class="right"><a class="button text-space" :class="isActive?'active':''" @click="addTeam">邀请报名</a></div>
        </div>

        <popList v-if="showPopList" :showPopList="showPopList" :customerId="customerId" @click="closePop"></popList>
    </div>
</template>

<script>
    import api from '@/net/api'
    import store from '@/store/index'
    import loadMore from '@/components/uni-load-more'
    import teamCardInfo1 from '@/components/employer/team-card-info1'
    import teamCardInfo2 from '@/components/employer/team-card-info2'
    import teamCardBaseInfo1 from '@/components/employer/team-card-baseInfo1'
    import teamCardBaseInfo2 from '@/components/employer/team-card-baseInfo2'
    import popList from '@/components/popList'

    export default {
        name: "teamCard",
        components: {loadMore,teamCardInfo1,teamCardInfo2,teamCardBaseInfo1,teamCardBaseInfo2,popList},
        data(){
            return {
                isAuthentication: '',//是否实名
                phone: '13028315576',

                customerId: '',
                pageIndex: '',
                pageSize: '',
                isHasMoreData: false,
                tipsText: '到底了，不要再拉了',
                loadStatus:'loading',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
                isLoadMore:false,  //是否加载中

                info1: {
                    id: "1sdsewweweew", // 客户id，32位字符串
                    icon: "../../pages/packageEmployer/static/img/starUser1.jpg", // 头像
                    name: "小飞", // 姓名
                    isAuthentication: 1, // 是否实名:0否,1是
                    sex: 1, // 性别:0女,1男,2未知
                    age: 23, // 年龄
                    nationName: '汉族',
                    applyStatus: 1, // 求职状态:0未知,1找工作中,2观察中
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
                        '../../pages/packageEmployer/static/img/starUser2.jpg',
                        '../../pages/packageEmployer/static/img/starUser2.jpg'
                    ] // 材料证明:图片链接数组字符串
                },
                baseInfo2: [{
                    id: "1sdsewwewqqwasweew", // 项目id
                    customerId: "1sdsewweweew", // 客户id，32位字符串
                    projectName: "项目名项目名项目名项目名1", // 项目名称
                    mainEnterprise: "重庆建工第三建筑工程有限公司", // 总包单位
                    contractAmount: 10000000, // 承包金额:单位分
                    workContent: "地坪、抹灰、砌砖", // 工作内容
                    files: [
                        '../../pages/packageEmployer/static/img/starUser2.jpg',
                        '../../pages/packageEmployer/static/img/starUser2.jpg'
                    ]// 材料证明:图片链接数组字符串
                },{
                    id: "1sdsewwewqqwasweew2", // 项目id
                    customerId: "1sdsewweweew2", // 客户id，32位字符串
                    projectName: "项目名项目名项目名项目名2", // 项目名称
                    mainEnterprise: "重庆建工第三建筑工程有限公司2", // 总包单位
                    contractAmount: 20000000, // 承包金额:单位分
                    workContent: "地坪、抹灰、砌砖", // 工作内容
                    files: [
                        '../../pages/packageEmployer/static/img/starUser2.jpg',
                        '../../pages/packageEmployer/static/img/starUser2.jpg'
                    ] // 材料证明:图片链接数组字符串
                }],
                applyStatus: 1,

                isActive: false,
                showPopList: false
            }
        },
        methods: {
            //关闭弹窗
            closePop(e){
                this.showPopList = e;
            },
            //获取班组联系方式
            getTeamPhone(){
                //判断用户是否实名--------------判断获取次数，待定
                if (this.isAuthentication == 1) {
                    let data = {id: this.customerId};
                    api.postCustomerPhone(data).then(res => {
                        if (res.messageId == 1000) {
                            _this.phone = res.body.phone;
                            wx.makePhoneCall({
                                phoneNumber: res.body.phone //仅为示例，并非真实的电话号码
                            })
                        }else {
                            uni.showToast({
                                title: res.zhError,
                                icon: "none",
                            });
                        }
                    });
                    wx.makePhoneCall({
                        phoneNumber: this.phone //仅为示例，并非真实的电话号码
                    })
                }else {
                    uni.showToast({
                        title: '请先实名，实名后可查看班组联系方式！',
                        icon: "none",
                        duration: 2000
                    });
                }
            },
            addTeam(){
                if (this.inviteListTotal == 0){
                    uni.showModal({
                        title: '',
                        content: '您还没有发布班组引进需求，请先去发布再邀请班组',
                        confirmText: '立即发布',
                        success: function (res) {
                            if (res.confirm) {
                                uni.navigateTo({
                                    url: "/pages/packageEmployer/projectForm"
                                });
                            } else if (res.cancel) {
                            }
                        }
                    });
                }else {
                    this.showPopList = true
                }
            },
            loadInfo(){
                let data = {customerId: this.customerId};
                //获取班组基本信息
                api.postTeamCustomerBase(data).then(res => {
                    if (res.messageId == 1000) {
                        _this.info1 = res.body;
                    }
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
                        _this.applyStatus = _this.info2.applyStatus;
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
                api.postTeamCustomerProject(dataProject).then(res => {
                    wx.hideLoading();
                    if (res.messageId == 1000) {
                        if (res.body.pageTotal == this.pageIndex) {
                            this.isHasMoreData = false;
                            this.isLoadMore = true;
                            this.loadStatus = 'nomore'
                        } else {
                            this.isHasMoreData = true;
                            this.isLoadMore = false
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
                });
            },
        },
        onLoad() {
            this.isAuthentication = store.state.user.customer.isAuthentication;
            this.customerId = this.$root.$mp.query.id;
            this.loadData(false);//获取项目经验信息
            this.loadInfo();//获取基本信息
        },
        onReachBottom(){  //上拉触底函数
            if(!this.isLoadMore){  //此处判断，上锁，防止重复请求
                this.isLoadMore = true;
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
        line-height: 1.8;
        padding-bottom: 50px;
        .topBox{
            width: 96%;
            margin: 10px 2%;
            box-sizing: border-box;
            border-radius: 4px;
            box-shadow: 2px 2px 10px @blueBgColor;
            .baseMore{
                margin: 0 10px;
                border-top: 1px dashed @blueBgColor;
            }
        }
        .middleBox{
            padding: 0 25px;
            margin: 20px 0;
        }
        .bottomBox{
            padding: 0 25px;
        }
        .btnBox{
            position: fixed;
            bottom: 0;
            width: 100%;
            z-index: 10;
            display: flex;
            flex-flow: row;
            align-items: center;
            text-align: center;
            font-size: 14px;
            color: white;
            height: 40px;
            line-height: 40px;
            .left{
                flex: 2;
                background: @appBtnColor;
            }
            .right{
                flex: 1;
                background: @otherColorY;
            }
        }
    }
</style>