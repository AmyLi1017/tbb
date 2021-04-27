<template>
    <div class="container">
        <div class="headBox">
            <div class="top">
                <div class="left">
                    <div class="title">{{workData.requirementName}}</div>
                    <div class="moneyTips">{{workData.salaryMin}}-{{workData.salaryMax}}/日</div>
                    <div>招聘人数：{{workData.personNumber}}人</div>
                </div>
                <div class="right">
                    <span class="iconfont iconshare"></span>
                    <span>分享</span>
                </div>
            </div>
            <div class="p">
                <div class="lf">发布时间：{{ workData.refreshTime?workData.refreshTime: '' }}</div>
                <div class="rt">浏览次数：{{ workData.browseNumber?workData.browseNumber : '0' }}次</div>
            </div>
        </div>
        <div class="bottom">
            <div class="p">
                <div class="text">工作地区：</div>
                <div class="val">{{workData.provinceName}}<span v-if="workData.cityName">-{{workData.cityName}}</span></div>
            </div>
            <div class="p">
                <div class="text">发 布 人：</div>
                <div class="val">{{ workData.name }}</div>
            </div>
            <div class="p">
                <div class="text">招聘工种：</div>
                <div class="val">{{workData.workTypeText}}</div>
            </div>
            <div class="p">
                <div class="text">招聘简介：</div>
                <div class="val">{{workData.description}}</div>
            </div>
        </div>
        <div class="btn">
            <a class="button text-space" :class="isActive?'active':''" @click="getTeamPhone">获取联系方式</a>
        </div>
    </div>
</template>

<script>
    import api from '@/net/api'
    import store from '@/store/index'
    import util from '../../utils/index.js'

    export default {
        name: "workDetail",
        data(){
            return {
                isAuthentication: '',
                id: '',
                workData: '',
                phone: '13056234512'
            }
        },
        methods: {
            getTeamPhone(){
                //判断用户是否实名--------------判断获取次数，待定
                if (this.isAuthentication == 1) {
                    let _this = this;
                    wx.showModal({
                        title: '',
                        content: '确认获取该招工的联系方式？',
                        cancelColor: '#AC9BA8',
                        success (res) {
                            if (res.confirm) {
                                let data = {id: _this.id};
                                api.postCustomerPhone(data).then(res => {
                                    if (res.messageId == 1000) {
                                      if (res.body.phone) {
                                        _this.phone = res.body.phone;
                                        wx.makePhoneCall({
                                          phoneNumber: res.body.phone
                                        })
                                      }
                                    }else {
                                        uni.showToast({
                                            title: res.zhError,
                                            icon: "none",
                                        });
                                    }
                                });
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    });

                }else {
                    uni.showToast({
                        title: '请先实名，实名后可查看班组联系方式！',
                        icon: "none",
                        duration: 2000
                    });
                }
            },
            loadData(){
                let data = {id: this.id};
                let _this = this;
                api.postWorkerRequirementGet(data).then((res) => {
                    if (res.messageId == 1000) {
                        _this.workData = res.body;
                        _this.workData.workTypeText = ''
                      if (res.body.refreshTime) {
                        _this.workData.refreshTime = util.formatTime(res.body.refreshTime)
                      }
                        if (res.body.workerRequirementWorkTypeList) {
                            res.body.workerRequirementWorkTypeList.forEach((item,index) => {
                                if (index == res.body.workerRequirementWorkTypeList.length - 1) {
                                    _this.workData.workTypeText += item.workTypeName
                                }else {
                                    _this.workData.workTypeText += item.workTypeName + '、'
                                }
                            })
                        }
                    }else {
                        wx.showToast({
                            title: '网络错误！',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                }).catch(res => {
                    wx.showToast({
                        title: '网络错误！',
                        icon: 'none',
                        duration: 2000
                    })
                })
            }
        },
        onLoad(){
            this.isAuthentication = store.state.user.isAuthentication;
            this.id = this.$root.$mp.query.id;
            this.loadData();//获取招工信息
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/base";
    .container{
        font-size: 13px;
        line-height: 2;
        color: @appBtnColor;
        letter-spacing: 1px;
    }
    .headBox{
        padding: 20px;
        .top{
            display: flex;
            flex-flow: row;
            align-items: normal;
            .left{
                flex: 3;
                .title{
                    font-size: 14px;
                    font-weight: bold;
                }
            }
            .right{
                flex: 1;
                font-size: 14px;
                font-weight: bold;
                color: @otherColorB;
                text-align: right;
                .iconfont{
                    font-size: 16px;
                    font-weight: bold;
                    display: inline-block;
                    margin-right: 5px;
                }
            }
        }
        .p{
            display: flex;
            flex-flow: row;
            align-items: center;
            .lf{
                flex: 2;
            }
            .rt{
                flex: 1;
                text-align: right;
            }
        }
    }
    .bottom{
        padding: 20px;
        border-top: 1px dashed @bgColor;
        .p{
            display: flex;
            flex-flow: row;
            align-items: normal;
            .text{
                flex: 1;
            }
            .val{
                flex: 3;
            }
        }
    }
    .btn{
        position: fixed;
        bottom: 0;
        width: 100%;
        background: @appBtnColor;
        color: white;
        text-align: center;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
    }
</style>
