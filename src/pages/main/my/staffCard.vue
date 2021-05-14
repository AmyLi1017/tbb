<template>
    <div class="container">
        <div class="topBox">
            <div class="base">
                <staffCardInfo1 :info="info1" :hideShare="true"></staffCardInfo1>
            </div>
        </div>
        <div class="baseMore" @click="goToStaffBaseInfo">
            <staffCardInfo2 :info="info2"></staffCardInfo2>
            <empty v-if="baseInfoIsEmpty" :title="emptyTips"></empty>
        </div>
        <div class="middleBox">
            <staffCardBaseInfo1 :info="baseInfo1"></staffCardBaseInfo1>
        </div>
        <div class="bottomBox">
            <staffCardBaseInfo2 :projectList="baseInfo2"></staffCardBaseInfo2>
        </div>
        <loadMore :status="loadStatus" v-if="isLoadMore&&baseInfo2.length>0&&isHasMoreData"></loadMore>
    </div>
</template>

<script>
    import api from '@/net/api'
    import store from '@/store'
    import loadMore from '@/components/uni-load-more'
    import empty from "../../../components/empty-item";
    import staffCardInfo1 from '@/components/staff/staff-card-info1'
    import staffCardInfo2 from '@/components/staff/staff-card-info2'
    import staffCardBaseInfo1 from '@/components/staff/staff-card-baseInfo1'
    import staffCardBaseInfo2 from '@/components/staff/staff-card-baseInfo2'

    export default {
        name: "staffCard",
        components: {loadMore,staffCardInfo1,staffCardInfo2,staffCardBaseInfo1,staffCardBaseInfo2,empty},
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

                info1: {},
                info2: null,
                baseInfoIsEmpty: false,
                emptyTips: '信息为空，请先填写信息！',
                baseInfo1: null,
                baseInfo2: [],
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
                        for (let i = 0; i < res.body.workerWorkTypeList.length;i++){
                            if (i === res.body.workerWorkTypeList.length - 1) {
                                workTypeText += res.body.workerWorkTypeList[i].workTypeName
                            }else {
                                workTypeText += res.body.workerWorkTypeList[i].workTypeName + '、'
                            }
                        }
                        _this.info2.workTypeList = workTypeText;
                    }else if (res.messageId == 2001) {
                      this.baseInfoIsEmpty = true
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
                    pageSize: this.pageSize,
                    pageIndex: this.pageIndex,
                };
                // wx.showLoading();
                api.postWorkerProjectList(dataProject).then(res => {
                    wx.hideLoading();
                    if (res.messageId == 1000) {
                        if (res.body.pageTotal == this.pageIndex) {
                            this.isHasMoreData = false;
                            this.isLoadMore = true;
                            this.loadStatus = 'nomore'
                        } else {
                            this.isHasMoreData = true;
                            this.isLoadMore = false;
                        }

                        if (isLoadMore) {
                            _this.baseInfo2 = _this.baseInfo2.concat(res.body.data)
                        } else {
                            wx.pageScrollTo({
                                scrollTop:0
                            });
                            _this.baseInfo2 = res.body.data
                        }
                    }else if (res.messageId == 2001){
                        wx.hideLoading();
                        this.isLoadMore = true;
                        this.isHasMoreData = false;
                    }
                }).catch(error => {
                    wx.hideLoading();
                    wx.showToast({
                        icon: "none",
                        title: '网络错误，请重试！'
                    });
                    this.isLoadMore = true;
                    this.isHasMoreData = false;
                });
            },
        },
        onLoad(){
            this.isAuthentication = store.state.user.isAuthentication;
            this.loadInfo();
            this.loadData(false);
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
