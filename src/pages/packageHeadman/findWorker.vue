<template>
    <div class="container">
        <empty v-if="isEmpty" :title="emptyTips"></empty>
        <needList v-else :needList="needList" @click="clickStatus"></needList>
        <div class="btnBox">
            <a class="button text-space" :class="isActive?'active':''" @click="goToPublish">去发布</a>
        </div>
        <loadMore :status="loadStatus" v-if="!isEmpty"></loadMore>
    </div>
</template>

<script>
    import needList from '@/components/teamHeader/workerNeedList'
    import loadMore from '@/components/uni-load-more'
    import empty from '@/components/empty'
    import api from '@/net/api'

    export default {
        name: "findWorker",
        components: {needList,empty,loadMore},
        data(){
            return {
                emptyTips: "列表为空，先去发布哦！",
                isEmpty: false,

                needList: '',
                isHasMoreData: false,
                tipsText: '到底了，不要再拉了',
                loadStatus:'loading',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
                isLoadMore:false,  //是否加载中
            }
        },
        methods: {
            //修改状态
            clickStatus(type,id,status){
                if (type == 0){//修改-已发布招聘
                    uni.navigateTo({
                        url: "/pages/packageHeadman/publishWorker?id=" + id
                    });
                } else {//停止-已发布招聘;刷新-已发布招聘
                    let statusText = '';
                    let needChangeStatus = 0;
                    if (type == 1){
                        if (status == 0){//暂停中的招聘
                            statusText = '重新招聘';
                            needChangeStatus = 1;
                        } else {//招聘中
                            statusText = '停止招聘';
                            needChangeStatus = 0;
                        }
                    }else if (type == 2) {
                        statusText = '刷新'
                    }
                    let _this = this;
                    wx.showModal({
                        title: '',
                        content: '确定将该招聘'+statusText+ '?',
                        cancelColor: '#AC9BA8',
                        success (res) {
                            if (res.confirm) {
                                _this.changeStatus(type,id,needChangeStatus);
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    });
                }
            },
            //去发布
            goToPublish(){
                uni.navigateTo({
                    url: "/pages/packageHeadman/publishWorker"
                });
            },
            //更新发布状态
            changeStatus(type,id,status){
                let _this = this;
                if (type == 1){//招聘状态修改
                    let data = {
                        id: id,
                        requirementStatus: status
                    };
                    wx.showLoading();
                    api.postWorkerRequirementStatus(data).then((res) => {
                        wx.hideLoading();
                        if (res.messageId == 1000){
                            wx.showToast({
                                icon: "none",
                                title: "招聘状态修改成功！"
                            });
                            _this.loadData();
                        }else {
                            wx.showToast({
                                icon: "none",
                                title: '招聘状态修改失败，请重试！'
                            });
                        }
                    }).catch(error => {
                        wx.hideLoading();
                        wx.showToast({
                            icon: "none",
                            title: '招聘状态修改失败，请重试！'
                        });
                    });

                } else if (type == 2) {//招聘刷新
                    let data = {id: id,};
                    wx.showLoading();
                    api.postWorkerRequirementRefresh(data).then((res) => {
                        wx.hideLoading();
                        if (res.messageId == 1000){
                            wx.showToast({
                                icon: "none",
                                title: "刷新成功！"
                            });
                            _this.loadData();
                        }else {
                            wx.showToast({
                                icon: "none",
                                title: '刷新失败，请重试！'
                            });
                        }
                    }).catch(error => {
                        wx.hideLoading();
                        wx.showToast({
                            icon: "none",
                            title: '刷新失败，请重试！'
                        });
                    });
                }
            },
            //加载列表数据
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
                    issueStatus: '',
                    pageSize: '',
                    pageIndex: this.pageIndex,
                };
                wx.showLoading();
                api.postPublishList(data).then((res) => {
                    wx.hideLoading();
                    if (res.messageId == 1000){
                        this.isEmpty = false;//不为空
                        if (res.body.pageTotal == this.pageIndex) {
                            this.isHasMoreData = false;
                            this.isLoadMore = true;
                            this.loadStatus = 'nomore'
                        } else {
                            this.isHasMoreData = true;
                            this.isLoadMore = false
                        }
                        let list = res.body.data;
                        for (let i = 0; i < list.length; i++){
                            let item = list[i];
                            let salarText = '';
                            let workText = '';
                            if (item.salaryMin.length == 0 && item.salaryMax == 0) {
                                salarText = '面议'
                            }else if (item.salaryMin.length != 0 && item.salaryMax == 0){
                                salarText = item.salaryMin
                            } else if (item.salaryMin.length == 0 && item.salaryMax != 0){
                                salarText = item.salaryMax
                            }else {
                                salarText = item.salaryMin + '-' + item.salaryMax
                            }
                            if (item.workType) {
                                for (let k = 0; k < item.workType.length; k++){
                                    if (k == item.workType.length - 1) {
                                        workText += item.workType[k].workTypeName
                                    }else {
                                        workText += item.workType[k].workTypeName + '、'
                                    }
                                }
                            }
                            list[i].salarText = salarText;
                            list[i].workText = workText;
                        }
                        if (isLoadMore) {
                            this.needList = this.needList.concat(list)
                        } else {
                            wx.pageScrollTo({
                                scrollTop:0
                            });
                            this.needList = list
                        }
                    }else if(res.messageId == 2001){
                      this.isEmpty = true;
                      this.isLoadMore = false;
                      this.loadStatus = '';
                    }else {
                        wx.hideLoading();
                        wx.showToast({
                            icon: "none",
                            title: "加载失败，请上拉重试！"
                        });
                        this.isEmpty = true;
                        this.isLoadMore = false;
                        this.loadStatus = '';
                    }

                }).catch(error => {
                    wx.hideLoading();
                    wx.showToast({
                        icon: "none",
                        title: "加载失败，请上拉重试！"
                    });
                    this.isEmpty = true;
                    this.isLoadMore = false;
                    this.loadStatus = '';
                });
            }
        },
        onShow(){
            this.loadData();//获取招工列表
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
        background: @bbgColor;
        padding: 15px 15px 0 15px;
        min-height: 100%;
        box-sizing: border-box;
        .btnBox{
            text-align: center;
            position: fixed;
            bottom: 0;
            left: 0;
            font-size: 15px;
            width: 100%;
            .button{
                height: 45px;
                line-height: 45px;
                display: inline-block;
                width: 100%;
                text-align: center;
                background: @appBtnColor;
                color: white;
                border: none;
            }
            .active{
                background: @appBtnColor;
                color: white;
            }
        }
    }

</style>
