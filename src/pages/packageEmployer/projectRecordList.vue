<template>
    <div class="container">
        <div class="tabs">
            <div class="tab"><span :class="tabType=='-1'? 'active':''" @click="tabChange('-1')">全部</span></div>
            <div class="tab"><span :class="tabType==0? 'active':''" @click="tabChange(0)">待定</span></div>
            <div class="tab"><span :class="tabType==1? 'active':''" @click="tabChange(1)">合适</span></div>
            <div class="tab"><span :class="tabType==2? 'active':''" @click="tabChange(2)">不合适</span></div>
            <div class="tab" v-if="projectType == 0"><span :class="tabType==3? 'active':''" @click="tabChange(3)">已确认</span></div>
        </div>
        <projectRecordList :teamsList="teamsList" :listType="tabType" :projectType="projectType" @click="clickListItem"></projectRecordList>
        <loadMore :status="loadStatus"></loadMore>
    </div>
</template>

<script>
    import api from '../../net/api'
    import loadMore from '@/components/uni-load-more'
    import projectRecordList from '@/components/employer/project-record-list'

    export default {
        name: "projectRecordList",
        components: {loadMore,projectRecordList},
        data(){
            return {
                projectId: '',
                projectType: '',
                teamsList: '',
                tabType: -1,//0：全部，1：待定，2：合适，3：不合适

                isHasMoreData: false,
                tipsText: '到底了，不要再拉了',
                loadStatus:'loading',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
                isLoadMore:false,  //是否加载中
                pageIndex: 1,
                pageSize: 10
            }
        },
        methods: {
            tabChange(tab){
                if (this.tabType != tab) {
                    this.tabType = tab;
                    this.loadData()
                }
            },
            clickListItem(type,id,status){//type,0:跳转详情，1:标记合适与否
                switch (type) {
                    case 0:
                        uni.navigateTo({
                            url: "/pages/packageEmployer/teamCardOnly?id=" + id
                        });
                        break;
                    case 1:
                        //标记班组合适和不合适，并重新刷新报名记录列表,status:0待定,1合适,2不合适
                        let statusText = '';
                        if (status == 1){
                            statusText = '合适'
                        }else if (status == 2) {
                            statusText = '不合适'
                        }
                        let _this = this;
                        let data = {
                            projectRequirementId: this.projectId,
                            customerIds: [id],
                            isSuit: status
                        };
                        wx.showModal({
                            title: '',
                            content: '确定将该班组标记为'+statusText+ '?',
                            cancelColor: '#AC9BA8',
                            success (res) {
                                if (res.confirm) {
                                    wx.showLoading();
                                    api.postTeamIsSuit(data).then((res) => {
                                        wx.hideLoading();
                                        if (res.messageId == 1000){
                                            wx.showToast({
                                                icon: "none",
                                                title: "标记成功！"
                                            });
                                            _this.loadData();
                                        }
                                    }).catch(error => {
                                        wx.hideLoading();
                                        wx.showToast({
                                            icon: "none",
                                            title: '标记成功失败，请重试！'
                                        });
                                    });
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                }
                            }
                        });
                        break;
                }
            },
            loadData(isLoadMore){
                if (isLoadMore) {
                    if (this.isHasMoreData) {
                        this.pageIndex++;
                    } else {
                        return
                    }
                } else {
                    this.pageIndex = 1
                }

                let data = {
                    projectRequirementId: this.projectId,
                    isSuit: this.tabType == -1 ? '' : this.tabType,
                    pageSize: this.pageSize,
                    pageIndex: this.pageIndex,
                };

                api.postProjectTeamsGet(data).then((res) => {
                    wx.hideLoading();
                    if (res.messageId == 1000){
                        if (res.body.pageTotal == this.pageIndex) {
                            this.isHasMoreData = false;
                            this.isLoadMore = true;
                            this.loadStatus = 'nomore'
                        } else {
                            this.isHasMoreData = true;
                            this.isLoadMore = false
                        }

                        let list = res.body.data;

                        if (isLoadMore) {
                            this.teamsList = this.teamsList.concat(list)
                        } else {
                            wx.pageScrollTo({
                                scrollTop:0
                            });
                            this.teamsList = list
                        }
                    }else if (res.messageId == 2001) {
                      this.teamsList = []
                    }

                }).catch(error => {
                    wx.hideLoading();
                    wx.showToast({
                        icon: "none",
                        title: error
                    });
                    this.isLoadMore = false;
                    this.loadStatus = ''
                    this.teamsList = []
                });
            }
        },
        onLoad(){
            this.projectId = this.$root.$mp.query.id;
            this.projectType = this.$root.$mp.query.type;
            this.loadData();//获取报名记录列表
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
        letter-spacing: 1px;
        .tabs{
            display: flex;
            flex-flow: row;
            align-items: center;
            font-size: 15px;
            padding-top: 5px;
            box-sizing: border-box;
            border-bottom: 1px dashed @bgColor;
            padding-bottom: 8px;
            .tab{
                flex: 1;
                color: @delColor;
                text-align: center;
                padding-top: 10px;
                span{
                    border-bottom: 2px solid white;
                    display: inline-block;
                    padding: 0 5px 0 5px;
                    box-sizing: border-box;
                }
                .active{
                    border-bottom: 2px solid @otherColorR;
                    color: @otherColorR;
                }
            }
        }
    }
</style>
