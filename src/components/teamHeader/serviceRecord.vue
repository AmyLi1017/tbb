<template>
    <div class="container">
        <div class="tabTop">
            <div class="lf" @click="tabType(-1)"><span class="stop" :class="listType == -1?'active':''">全部</span></div>
            <div class="rt" @click="tabType(1)"><span class="stop" :class="listType == 1?'active':''">主动报名</span></div>
            <div class="rt" @click="tabType(2)"><span class="stop" :class="listType == 2?'active':''">邀请报名</span></div>
        </div>
        <div class="listBox">
            <serviceRecordList :listData="listData" :listType="listType" @click="stateChange"></serviceRecordList>
            <empty v-if="listData.length === 0" :title="emptyTips"></empty>
        </div>
        <loadMore :status="loadStatus" v-if="isLoadMore&&(listData.length>0)"></loadMore>
    </div>
</template>

<script>
    import serviceRecordList from '@/components/teamHeader/team-service-record'
    import loadMore from '@/components/uni-load-more'
    import empty from "../empty";
    import api from '@/net/api'

    export default {
        name: "serviceRecord",
        components: {serviceRecordList,loadMore,empty},
        props: {
          isReachBottom: ''
        },
        data(){
            return {
                listType: -1,//1为主动，2为邀请，0为全部
                listData: [],
                pageSize: 10,
                pageIndex: 1,
                isHasMoreData: false,
                tipsText: '到底了，不要再拉了',
                emptyTips: '列表为空！',
                loadStatus:'loading',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
                isLoadMore: this.isReachBottom,  //是否加载中
            }
        },
        watch: {
          isReachBottom: {
            immediate: true,
            handler(val){
              this.isLoadMore = val;
              if (this.isLoadMore) {
                this.loadData(true);
              }
            },
            deep: true
          }
        },
        methods: {
            tabType(type){
                if (this.listType != type) {
                    this.listType = type;
                    this.loadData();
                }
            },
            stateChange(type,id){
                let _this = this;
                switch (type) {
                    case 0://删除
                        wx.showModal({
                            title: '',
                            content: '确认删掉该条记录吗？',
                            success (res) {
                                if (res.confirm) {
                                    let data = {id: id,};
                                    api.postTeamServiceDelete(data).then((res) => {
                                        wx.hideLoading();
                                        if (res.messageId == 1000){
                                            _this.loadData();//重新加载数据
                                        }else {
                                            wx.showToast({
                                                icon: "none",
                                                title: "网络错误，请重试！"
                                            });
                                        }
                                    }).catch(error => {
                                        wx.hideLoading();
                                        wx.showToast({
                                            icon: "none",
                                            title: "网络错误，请重试！"
                                        });
                                    });
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                }
                            }
                        });
                        break;
                    case 1://查看结果
                        uni.navigateTo({
                            url: "/pages/main/serverList/projectLastResult?id=" + id
                        });
                        break;
                    case 2://立即报名
                        wx.showModal({
                            title: '',
                            content: '确认立即报名吗？',
                            cancelColor: '#AC9BA8',
                            success (res) {
                                if (res.confirm) {
                                    let data1 = {projectRequirementId: id};
                                    api.postTeamServiceSign(data1).then((res) => {
                                        wx.hideLoading();
                                        if (res.messageId == 1000){
                                            _this.loadData();//重新加载数据
                                        }else {
                                            wx.showToast({
                                                icon: "none",
                                                title: "网络错误，请重试！"
                                            });
                                        }
                                    }).catch(error => {
                                        wx.hideLoading();
                                        wx.showToast({
                                            icon: "none",
                                            title: "网络错误，请重试！"
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

            loadData(isLoadMore) {
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
                    signWay: this.listType === -1 ? '':this.listType,
                    pageSize: this.pageSize,
                    pageIndex: this.pageIndex,
                };
                api.postTeamServiceList(data).then((res) => {
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

                        const list = res.body.data
                        if (isLoadMore) {
                            this.listData = this.listData.concat(list)
                        } else {
                            wx.pageScrollTo({
                                scrollTop:0
                            });
                            this.listData = list
                        }
                        this.$emit('change', this.isLoadMore)
                    }else {
                        this.isLoadMore = true;
                        this.listData = []
                        this.$emit('change', this.isLoadMore)
                    }
                }).catch(error => {
                    wx.hideLoading();
                    wx.showToast({
                        icon: "none",
                        title: error
                    });
                    this.isLoadMore = false;
                    this.loadStatus = ''
                });

            },
        },
        mounted(){
            this.loadData();//获取用户发布列表
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/base";
    .container{
        padding: 0 15px 15px;
        color: @appBtnColor;
        letter-spacing: 1px;
        .tabTop{
            display: flex;
            flex-flow: row;
            align-items: center;
            font-size: 14px;
            color: @delColor;
            margin: 0 0 20px 0;
            border-bottom: 1px dashed @bgColor;
            text-align: center;
            .lf{
                flex: 1;
                box-sizing: border-box;
                padding: 10px;
                span{
                    display: inline-block;
                }
                .active{
                    color: @otherColorR;
                    border-bottom: 2px solid @otherColorR;
                }
            }
            .rt{
                flex: 1;
                box-sizing: border-box;
                padding: 10px;
                span{
                    display: inline-block;
                }
                .active{
                    color: @otherColorR;
                    border-bottom: 2px solid @otherColorR;
                }
            }
        }
    }
</style>
