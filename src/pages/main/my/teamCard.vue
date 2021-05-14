<template>
    <div class="container">
        <div class="topBox">
            <div class="base">
                <teamCardInfo1 :info="info1" :hideShare="true"></teamCardInfo1>
            </div>
        </div>
        <div class="baseMore" @click="goToTeamBaseInfo">
            <teamCardInfo2 :info="info2"></teamCardInfo2>
            <empty v-if="baseInfoIsEmpty" :title="emptyTips"></empty>
        </div>
        <div class="middleBox">
            <teamCardBaseInfo1 :info="baseInfo1"></teamCardBaseInfo1>
        </div>
        <div class="bottomBox">
            <teamCardBaseInfo2 :projectList="baseInfo2"></teamCardBaseInfo2>
            <loadMore :status="loadStatus" v-if="isLoadMore&&baseInfo2.length>0"></loadMore>
        </div>
    </div>
</template>

<script>
    import api from '@/net/api'
    import store from '@/store'
    import utils from "@/utils/index"
    import loadMore from '@/components/uni-load-more'
    import empty from "../../../components/empty-item";
    import teamCardInfo1 from '@/components/teamHeader/team-card-info1'
    import teamCardInfo2 from '@/components/teamHeader/team-card-info2'
    import teamCardBaseInfo1 from '@/components/teamHeader/team-card-baseInfo1'
    import teamCardBaseInfo2 from '@/components/teamHeader/team-card-baseInfo2'

    export default {
        name: "teamCard",
        components: {loadMore,teamCardInfo1,teamCardInfo2,teamCardBaseInfo1,teamCardBaseInfo2,empty},
        data(){
            return {
                isAuthentication: '',//是否实名
                applyStatus: '',//求职状态

                customerId: '',
                pageIndex: '',
                pageSize: 10,
                isHasMoreData: false,
                tipsText: '到底了，不要再拉了',
                loadStatus:'loading',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
                isLoadMore:false,  //是否加载中

                baseInfoIsEmpty: false,
                emptyTips: '信息为空，请先填写信息！',

                info1: {},
                info2: null,
                baseInfo1: null,
                baseInfo2: null,
            }
        },
        methods: {
            goToTeamBaseInfo(){
                uni.navigateTo({
                    url: '/pages/main/my/teamBaseInfo?id='+this.customerId
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
                api.getTeamCustomerInfo(data).then(res => {
                    if (res.messageId == 1000) {
                        _this.info2 = res.body;
                        let workTypeText = '';
                        for (let i=0;i<res.body.teamWorkTypeList.length;i++){
                            if (i < res.body.teamWorkTypeList - 1) {
                                workTypeText += res.body.teamWorkTypeList[i].workTypeName + '、';
                            }else {
                                workTypeText += res.body.teamWorkTypeList[i].workTypeName
                            }
                        }
                        _this.info2.workTypeText = workTypeText;
                    }else if (res.messageId == 2001) {
                        this.baseInfoIsEmpty = true
                    }
                });

                //获取班组承包信息
                api.postTeamCustomerAbility(data).then(res => {
                    if (res.messageId == 1000) {
                        _this.baseInfo1 = res.body;
                        _this.baseInfo1.files = utils.urlStringToArray(_this.baseInfo1.files)
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
                    pageSize: this.pageSize,
                    pageIndex: this.pageIndex,
                };
                // wx.showLoading();
                let _this = this;
                api.postTeamCustomerProject(dataProject).then(res => {
                    wx.hideLoading();
                    if (res.messageId == 1000) {
                        if (res.body.pageTotal == this.pageIndex) {
                            _this.isHasMoreData = false;
                            _this.isLoadMore = true;
                            _this.loadStatus = 'nomore'
                        } else {
                            _this.isHasMoreData = true;
                            _this.isLoadMore = false;
                        }
                        if (isLoadMore) {
                            _this.baseInfo2 = _this.baseInfo2.concat(res.body.data)
                        } else {
                            wx.pageScrollTo({
                                scrollTop:0
                            });
                            _this.baseInfo2 = res.body.data
                        }
                    }else if(res.messageId == 2001) {
                        _this.isLoadMore = true;
                        _this.isHasMoreData = false;
                    }else {
                        wx.hideLoading();
                        wx.showToast({
                            icon: "none",
                            title: '网络错误，请重试！'
                        });
                        _this.isLoadMore = true;
                        _this.isHasMoreData = false;
                    }
                }).catch(error => {
                    wx.hideLoading();
                    wx.showToast({
                        icon: "none",
                        title: '网络错误，请重试！'
                    });
                    _this.isLoadMore = true;
                    _this.isHasMoreData = false;
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
