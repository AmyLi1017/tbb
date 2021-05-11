<template>
    <div class="container">
        <div class="tabTop">
            <div class="lf" @click="tabType(1)"><span class="stop" :class="listType == 1?'active':''">发布中</span></div>
            <div class="rt" @click="tabType(0)"><span class="stop" :class="listType == 0?'active':''">已截止</span></div>
        </div>
        <div class="listBox">
            <serviceRecordList :listData="listData" :listType="listType" @click="publishStateChange"></serviceRecordList>
            <empty v-if="isEmpty" :title="emptyTips"></empty>
        </div>
        <loadMore :status="loadStatus" v-if="!isEmpty"></loadMore>
    </div>
</template>

<script>
    import serviceRecordList from '@/components/employer/service-record-list'
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
                listType: 1,//1为发布中，0为已截止
                listData: '',

                isEmpty: false,
                emptyTips: '您还没有服务记录哦！^-^',
                pageSize: '',
                pageIndex: 1,
                isHasMoreData: false,
                tipsText: '到底了，不要再拉了',
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
            publishStateChange(type,id){
              let _this = this;
                switch (type) {
                    case 0://停止发布
                        let data = {
                            id: id,
                            issueStatus: 0
                        };
                        // 提示
                      uni.showModal({
                        title: '',
                        content: '确认是否停止发布该项目？',
                        confirmText: '确认',
                        cancelText: '取消',
                        cancelColor: '#aaa',
                        success: function (res) {
                          if (res.confirm) {
                            api.postServiceRecordStatus(data).then((res) => {
                              wx.hideLoading();
                              if (res.messageId == 1000){
                                _this.loadData()
                                wx.showToast({
                                  icon: "none",
                                  title: '修改成功！',
                                  duration: 2000
                                });
                              }else if (res.messageId == 2001){}
                            }).catch(error => {
                              wx.hideLoading();
                              wx.showToast({
                                icon: "none",
                                title: '网络错误，请重试！',
                                duration: 2000
                              });
                            });
                          } else if (res.cancel) {
                          }
                        }
                      })
                        break;
                    case 1://置顶
                        let obj = {id: id};
                      uni.showModal({
                        title: '',
                        content: '确认是否置顶该项目？',
                        confirmText: '确认',
                        cancelText: '取消',
                        cancelColor: '#aaa',
                        success: function (res) {
                          if (res.confirm) {
                            api.postServiceRecordTop(obj).then((res) => {
                              wx.hideLoading();
                              if (res.messageId == 1000){
                                wx.showToast({
                                  icon: "none",
                                  title: '修改成功！',
                                  duration: 2000
                                });
                                _this.loadData();//重新加载数据
                              }else {
                                wx.showToast({
                                  icon: "none",
                                  title: "网络错误，请重试！",
                                  duration: 2000
                                });
                              }
                            }).catch(error => {
                              wx.hideLoading();
                              wx.showToast({
                                icon: "none",
                                title: '"网络错误，请重试！"',
                                duration: 2000
                              });
                            });
                          } else if (res.cancel) {
                          }
                        }
                      })
                        break;
                    case 2:
                        api.postProjectResultPush({id: id, recommendStatus: 2}).then((res) => {
                          wx.hideLoading();
                          if (res.messageId == 1000){
                            _this.loadData()
                            wx.showToast({
                              icon: "none",
                              title: '结果上传成功！',
                              duration: 2000
                            });
                          }else if (res.messageId == 2001){}
                        }).catch(error => {
                          wx.hideLoading();
                          wx.showToast({
                            icon: "none",
                            title: '网络错误，请重试！',
                            duration: 2000
                          });
                        });
                        this.loadData();
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
                    issueStatus: this.listType,
                    pageSize: 10,
                    pageIndex: this.pageIndex,
                };
                let _this = this;
                api.postServiceRecordList(data).then((res) => {
                    wx.hideLoading();
                    if (res.messageId == 1000){
                        this.isEmpty = false;//不为空
                        if (res.body.pageTotal == this.pageIndex) {
                          _this.isHasMoreData = false;
                          _this.isLoadMore = true;
                          _this.loadStatus = 'nomore'
                        } else {
                          _this.isHasMoreData = true;
                          _this.isLoadMore = false
                        }
                        let list = res.body.data;
                        if (isLoadMore) {
                          _this.listData = _this.listData.concat(list)
                        } else {
                            wx.pageScrollTo({
                                scrollTop:0
                            });
                          _this.listData = list
                        }
                        this.$emit('change', this.isLoadMore)
                    }else if (res.messageId == 2001) {
                      this.listData = []
                      this.isEmpty = true;
                      this.isLoadMore = true;
                      this.loadStatus = '';
                      this.$emit('change', this.isLoadMore)
                    }
                }).catch(error => {
                    wx.hideLoading();
                    wx.showToast({
                        icon: "none",
                        title: "error"
                    });
                  _this.isLoadMore = true;
                  _this.loadStatus = ''
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
        padding: 0 10px 10px;
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
            .lf{
                flex: 1;
                box-sizing: border-box;
                text-align: right;
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
