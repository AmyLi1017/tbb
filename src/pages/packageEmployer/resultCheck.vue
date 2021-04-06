<template>
    <div class="container">
        <resultTeamsCheck :teamsList="teamsList" :checkList="checkList" @click="saveResults"></resultTeamsCheck>
        <loadMore :status="loadStatus"></loadMore>
    </div>
</template>

<script>
    import resultTeamsCheck from '@/components/employer/result-teams-check'
    import loadMore from '@/components/uni-load-more'
    import api from '@/net/api'
    export default {
        name: "resultCheck",
        components: {resultTeamsCheck,loadMore},
        data(){
            return {
                projectId: '',
                teamsList: '',
                checkList: '',

                isHasMoreData: false,
                tipsText: '到底了，不要再拉了',
                loadStatus:'loading',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
                isLoadMore:false,  //是否加载中
                pageIndex: 1,
                pageSize: ''
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
                //测试数据，带注释 -------------------------------------------------
                this.teamsList = [{
                    customerId: "1sdsewweweew", // 客户id，32位字符串
                    icon: "../../pages/packageEmployer/static/img/starUser2.jpg", // 头像
                    name: "小飞", // 姓名
                    isAuthentication: 1, // 是否实名:0否,1是
                    provinceName: "重庆市", // 省名称
                    cityName: "江北区", // 市名称
                    population: 22, // 队伍人数
                    applyStatus: 1, // 求职状态:0未知,1找工作中,2观察中
                    projectName: "万科西城项目一期土石方", // 最近工程
                    mainEnterprise: "重庆建工第三建筑有限公司", // 总包单位
                    workContent: "地坪、抹灰、砌砖", // 工作内容
                    isSuit: 1,// 是否合适:0待定,1合适,2不合适
                    teamSearchWorkTypeResponseList: [ // 工种列表
                        {
                            workTypeId: 1,   // 工种id
                            workTypeName: "架子工"},   // 工种名称
                        {
                            workTypeId: 1,
                            workTypeName: "木工"
                        }
                    ]
                },{
                    customerId: "1sweweew", // 客户id，32位字符串
                    icon: "../../pages/packageEmployer/static/img/starUser2.jpg", // 头像
                    name: "小飞", // 姓名
                    isAuthentication: 1, // 是否实名:0否,1是
                    provinceName: "重庆市", // 省名称
                    cityName: "江北区", // 市名称
                    population: 22, // 队伍人数
                    applyStatus: 1, // 求职状态:0未知,1找工作中,2观察中
                    projectName: "万科西城项目一期土石方", // 最近工程
                    mainEnterprise: "重庆建工第三建筑有限公司", // 总包单位
                    workContent: "地坪、抹灰、砌砖", // 工作内容
                    isSuit: 2,// 是否合适:0待定,1合适,2不合适
                    teamSearchWorkTypeResponseList: [ // 工种列表
                        {
                            workTypeId: 1,   // 工种id
                            workTypeName: "架子工"},   // 工种名称
                        {
                            workTypeId: 1,
                            workTypeName: "木工"
                        }
                    ]
                }];
                this.checkList = [
                    {
                        name: '小飞',
                        value: '1',
                        checked: ''
                    },{
                        name: '张三',
                        value: '2',
                        checked: ''
                    }
                ];

                let data = {
                    projectRequirementId: this.projectId,
                    isSuit: '',
                    pageSize: '',
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
                wx.showLoading();
                api.postTeamSuitList(data).then((res) => {
                    wx.hideLoading();
                    if (res.messageId == 1000){
                        if (res.body.pageTotal == this.pageIndex) {
                            this.isHasMoreData = false;
                            this.isLoadMore = false;
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