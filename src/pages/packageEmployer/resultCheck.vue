<template>
    <div class="container">
        <resultTeamsCheck :teamsList="teamsList" :checkList="checkList" @click="saveResults"></resultTeamsCheck>
        <empty v-if="teamsList.length === 0" :title="emptyTips"></empty>
    </div>
</template>

<script>
    import resultTeamsCheck from '@/components/employer/result-teams-check'
    import loadMore from '@/components/uni-load-more'
    import empty from '@/components/empty'
    import api from '@/net/api'
    export default {
        name: "resultCheck",
        components: {resultTeamsCheck,loadMore,empty},
        data(){
            return {
                projectId: '',
                teamsList: '',
                checkList: '',

                isHasMoreData: false,
                tipsText: '到底了，不要再拉了',
                emptyTips: '列表为空！',
                loadStatus:'loading',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
                isLoadMore: false,  //是否加载中
                pageIndex: 1,
                pageSize: 10
            }
        },
        methods: {
            saveResults(arr){
                //提交班组选择结果
                if (arr.length != 0) {
                    let data = {
                        projectId: this.projectId,
                        ids: arr
                    };
                    console.log(data,'data');
                    api.postTeamResultPublish(data).then((res) => {
                        wx.hideLoading();
                        if (res.messageId == 1000){
                            wx.showToast({
                                icon: "none",
                                title: '班组提交成功！'
                            });
                        }
                    }).catch(error => {
                        wx.hideLoading();
                        wx.showToast({
                            icon: "none",
                            title: "班组提交失败，请重试！"
                        });
                    });
                    uni.navigateTo({
                        url: "/pages/packageEmployer/resultFiles?id=" + this.projectId
                    })
                }else {
                    wx.showModal({
                        title: '',
                        content: '请选择项目引进的班组',
                        cancelColor: '#AC9BA8',
                        success (res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    });
                }

            },
            loadData(isLoadMore){
                let data = {
                    projectRequirementId: this.projectId,
                    pageSize: this.pageSize,
                    pageIndex: this.pageIndex,
                };

                if (isLoadMore) {
                    if (this.isHasMoreData) {
                        this.pageIndex++;
                    } else {
                        return
                    }
                } else {
                    this.pageIndex = 1
                }

                let _this = this;
                uni.showLoading({
                  title: '加载中'
                });
                api.postTeamSuitList(data).then((res) => {
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
                        let checkList = [];
                        for (let i = 0;i < list.length; i++){
                            let item = list[i];
                            let obj = {
                                name: '',
                                value: '',
                                checked: ''
                            };
                            obj.name = item.name;
                            obj.value = item.customerId;
                            checkList.push(obj);
                        }
                        if (isLoadMore) {
                            _this.teamsList = _this.teamsList.concat(list);
                            _this.checkList = _this.checkList.concat(checkList);
                        } else {
                            wx.pageScrollTo({
                                scrollTop:0
                            });
                            _this.teamsList = list;
                            _this.checkList = checkList;
                        }
                    }else if (res.messageId == 2001) {
                      _this.teamsList = [];
                      _this.checkList = [];
                      _this.isLoadMore = true;
                      _this.isHasMoreData = false;
                    }
                }).catch(error => {
                    wx.hideLoading();
                    this.isLoadMore = false;
                    this.loadStatus = 'nomore';
                    wx.showToast({
                        icon: "none",
                        title: "加载失败，请下拉刷新！"
                    });
                });
            },
        },
        onLoad(){
            this.projectId = this.$root.$mp.query.id;
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
    .container{

    }
</style>
