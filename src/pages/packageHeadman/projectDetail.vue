<template>
    <div class="container">
        <div class="headBox">
            <div class="head">{{projectData.projectName}}</div>
            <div class="p">
                <div class="lf">发布时间：{{projectData.createTime}}</div>
                <div class="rt">浏览次数：{{times.times}}次</div>
            </div>
        </div>
        <div class="content">
            <div class="title">项目概况</div>
            <div class="p">
                <div class="lf name">项目名称</div>
                <div class="rt val">{{projectData.projectName}}</div>
            </div>
            <div class="p">
                <div class="lf name">项目地区</div>
                <div class="rt val">{{projectData.provinceName}}-{{projectData.cityName}}</div>
            </div>
            <div class="p">
                <div class="lf name">详细地址</div>
                <div class="rt val">{{projectData.detailAddr}}</div>
            </div>
            <div class="p">
                <div class="lf name">工程类型</div>
                <div class="rt val">{{projectData.typeName}}</div>
            </div>
            <div class="p">
                <div class="lf name">项目描述</div>
                <div class="rt val">{{projectData.description}}</div>
            </div>
            <div class="p">
                <div class="lf name">截止时间</div>
                <div class="rt val">{{projectData.endTime}}</div>
            </div>
            <div class="p">
                <div class="lf name">报名名额</div>
                <div class="rt val">{{projectData.places}}</div>
            </div>
            <div class="p">
                <div class="lf name">附件信息</div>
                <a class="rt val" :src="projectData.files" :class="projectData.files?'link':'noClick'">详见附件</a>
            </div>
        </div>
        <div class="bottom">
            <div class="p">
                <div class="lf">发布人</div>
                <div class="mid">{{author.name}}</div>
                <div class="rt">{{author.enterpriseName}}</div>
            </div>
        </div>
        <div class="btnBox">
            <div class="left"><a class="button text-space" :class="isActive?'active':''" @click="getTeamPhone">获取联系方式</a></div>
            <div class="right" v-if="projectData.recommendStatus == 0 && projectData.issueStatus == 0"><a class="button text-space" :class="isActive?'active':''" @click="signUp">立即报名</a></div>
            <div class="right del" v-if="projectData.recommendStatus == 0 && projectData.issueStatus == 1"><a class="button text-space" :class="isActive?'active':''">名额已满</a></div>
            <div class="right del" v-if="projectData.recommendStatus != 0"><a class="button text-space" :class="isActive?'active':''">已结束</a></div>
        </div>
    </div>
</template>

<script>
    import api from '../../net/api'
    import store from '@/store/index'
    import util from '../../utils/index'

    export default {
        name: "projectDetail",
        data(){
            return {
                isAuthentication: '',
                isImg: '',
                projectId: '',
                projectData: '',
                times: '',
                author: '',
                phone: '15645896235'
            }
        },
        methods: {
            //获取项目发布人联系方式
            getTeamPhone(){
                //判断用户是否实名--------------判断获取次数，待定
                let _this = this;
                if (this.isAuthentication == 1) {
                    wx.showModal({
                        title: '',
                        content: '确认获取该项目的联系方式？',
                        cancelColor: '#AC9BA8',
                        success (res) {
                            if (res.confirm) {
                                let data = {id: _this.projectId};
                                api.postProjectContact(data).then(res => {
                                    if (res.messageId == 1000) {
                                        _this.phone = res.body.phone;
                                        wx.makePhoneCall({
                                            phoneNumber: res.body.phone //仅为示例，并非真实的电话号码
                                        })
                                    }else {
                                        uni.showToast({
                                            title: "网络错误，请重试！",
                                            icon: "none",
                                            duration: 2000
                                        });
                                    }
                                }).catch(res => {
                                    uni.showToast({
                                        title: "网络错误，请重试！",
                                        icon: "none",
                                        duration: 2000
                                    });
                                });
                                wx.makePhoneCall({
                                    phoneNumber: _this.phone //仅为示例，并非真实的电话号码
                                })
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    });

                }else {
                    wx.showModal({
                        title: '',
                        content: '请先实名，实名后可查看班组联系方式！',
                        cancelColor: '#AC9BA8',
                        success (res) {
                            if (res.confirm) {

                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    });
                }
            },
            //立即报名
            signUp(){
                let _this = this;
                //判断实名
                if (this.isAuthentication == 0) {
                    wx.showModal({
                        title: '',
                        content: '您还没有进行实名验证，请先完成实名验证！',
                        cancelColor: '#AC9BA8',
                        confirmText: "立即验证",
                        success (res) {
                            if (res.confirm) {
                                uni.navigateTo({
                                    url: "/pages/packageHeadman/projectDetail?id=" + this.projectId //待修改，引导去实名认证----------------
                                })
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    })
                }else {
                    //判断资料是否齐全--有图是否
                    if (this.isImg == 0){
                        wx.showModal({
                            title: '',
                            content: '检测到您当前资料完善度一般，为提升您的报名后成功承包的概率，建议您进一步完善信息！',
                            cancelColor: '#AC9BA8',
                            cancelText: '仍旧报名',
                            confirmText: "完善资料",
                            success (res) {
                                if (res.confirm) {
                                    uni.navigateTo({
                                        url: "/pages/packageHeadman/projectDetail?id=" + this.projectId //待修改，引导去资料完善，上传图----------------
                                    })
                                } else if (res.cancel) {
                                    _this.sign()
                                }
                            }
                        })
                    }else {
                        wx.showModal({
                            title: '',
                            content: '确认立即报名？',
                            cancelColor: '#AC9BA8',
                            success (res) {
                                if (res.confirm) {
                                    _this.sign()
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                }
                            }
                        })
                    }
                }
            },
            //报名
            sign(){
                let data = {projectRequirementId: this.projectId};
                api.postProjectTeamSignUp(data).then(res => {
                    if (res.messageId == 1000) {
                        wx.showToast({
                            title: '报名成功！',
                            icon: 'success',
                            duration: 2000
                        })
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
                });
            },
            // 获取项目详情
            loadProjectData(){
                let data = {
                    id: this.projectId
                };
                wx.showLoading();
                api.postProjectRequirement(data).then((res) => {
                    wx.hideLoading();
                    if (res.messageId == 1000){
                        this.projectData = res.body;
                        this.projectData.endTime = util.formatTime(this.projectData.endTime);
                        this.projectData.createTime = util.formatTime(this.projectData.createTime);
                    }else {
                        wx.showToast({
                            icon: "none",
                            title: "加载失败，请重试！"
                        });
                    }
                }).catch(error => {
                    wx.hideLoading();
                    wx.showToast({
                        icon: "none",
                        title: "加载失败，请重试！"
                    });
                });
            },
            loadPublishTimes(){
                let data = {id: this.projectId};
                api.postProjectPublishTimes(data).then((res) => {
                    if (res.messageId == 1000){
                        this.times = res.body;
                    }else {
                        wx.showToast({
                            icon: "none",
                            title: "加载失败，请重试！"
                        });
                    }
                }).catch(error => {
                    wx.showToast({
                        icon: "none",
                        title: "加载失败，请重试！"
                    });
                });
            },
            loadAuthor(){
                let data = {id: this.projectId};
                api.postProjectAuthor(data).then((res) => {
                    if (res.messageId == 1000){
                        this.author = res.body;
                    }else {
                        wx.showToast({
                            icon: "none",
                            title: "加载失败，请重试！"
                        });
                    }
                }).catch(error => {
                    wx.showToast({
                        icon: "none",
                        title: "加载失败，请重试！"
                    });
                });
            }
        },
        onLoad(){
            this.isAuthentication = store.state.user.isAuthentication;
            this.isImg = store.state.user.isImg;
            this.projectId = this.$root.$mp.query.id;
            this.loadProjectData();//获取项目信息
            this.loadPublishTimes();//获取浏览次数
            this.loadAuthor();//获取发布人
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/base";
    .headBox{
        padding: 15px;
        box-sizing: border-box;
        letter-spacing: 1px;
        .head{
            font-size: 16px;
            color: @appBtnColor;
            font-weight: bold;
        }
        .p{
            display: flex;
            flex-flow: row;
            align-items: center;
            font-size: 11px;
            color: @delColor;
            .lf{
                flex: 2;
            }
            .rt{
                flex: 1;
                line-height: 2;
            }
        }
    }
    .content{
        padding: 0 20px 20px 20px;
        font-size: 12px;
        .title{
            font-size: 13px;
            color: @appBtnColor;
            border-bottom: 1px solid @bgColor;
        }
        .p:first-child{
            border-top: 1px dashed @bgColor;
        }
        .p{
            display: flex;
            flex-flow: row;
            align-items: center;
            border-bottom: 1px dashed @bgColor;
            color: @appBtnColor;
            letter-spacing: 1px;
            line-height: 1.8;
            padding: 8px 0;
            .lf{
                flex: 1;
            }
            .rt{
                flex: 3;
            }
            .link{
                color: @otherColorB;
            }
            .onClick{
                color: @delColor;
            }
        }
    }
    .bottom{
        padding: 0 10px;
        box-sizing: border-box;
        font-size: 12px;
        .p{
            display: flex;
            flex-flow: row;
            align-items: center;
            color: @appBtnColor;
            text-align: center;
            div{
                flex: 1;
            }
            .rt{
                flex: 2;
            }
        }
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
        .del{
            background: @delColor;
        }
    }
</style>
