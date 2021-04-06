<template>
    <div class="container">
        <div class="headBox">
            <div class="top">
                <div class="left">
                    <div class="title">{{workData.requirementName}}</div>
                    <div>{{workData.salaryMin}}-{{workData.salaryMax}}/日</div>
                    <div>招聘人数：{{workData.personNumber}}人</div>
                </div>
                <div class="right">
                    <span class="iconfont iconshare"></span>
                    <span>分享</span>
                </div>
            </div>
            <div class="p">
                <div class="lf">发布时间：2020-12-30</div>
                <div class="rt">浏览次数：50次</div>
            </div>
        </div>
        <div class="bottom">
            <div class="p">
                <div class="text">工作地区：</div>
                <div class="val">{{workData.provinceName}}{{workData.cityName}}</div>
            </div>
            <div class="p">
                <div class="text">发 布 人：</div>
                <div class="val">张总</div>
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
                                let data = {id: this.customerId};
                                api.postCustomerPhone(data).then(res => {
                                    if (res.messageId == 1000) {
                                        _this.phone = res.body.phone;
                                        wx.makePhoneCall({
                                            phoneNumber: res.body.phone //仅为示例，并非真实的电话号码
                                        })
                                    }else {
                                        uni.showToast({
                                            title: res.zhError,
                                            icon: "none",
                                        });
                                    }
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
                    uni.showToast({
                        title: '请先实名，实名后可查看班组联系方式！',
                        icon: "none",
                        duration: 2000
                    });
                }
            },
            loadData(){
                //测试数据，待删除-------------->>
                this.workData = {
                    id: "1sdsewwewqqwasweew", // 班组招工需求id
                    customerId: "1sdsewweweew", // 客户id，32位字符串
                    requirementName: "招聘名称", // 招聘名称
                    provinceId: 120000, // 省id
                    provinceName: "北京市", // 省名称
                    cityId: 120100, // 市id
                    cityName: "东城区", // 市名称
                    salaryMin: 1, // 最低薪资
                    salaryMax: 100, // 最高薪资
                    contactPerson: "小飞", // 联系人
                    contactPhone: "15068749417",   // 联系电话
                    personNumber:1,   // 招聘人数
                    description:1,   // 招聘描述
                    workTypeText: '钢筋工、水泥工',
                    workType: [  // 招聘工种数组
                        {
                            workTypeId:1221,
                            workTypeName:"钢筋工"
                        },
                        {
                            workTypeId:121,
                            workTypeName:"水泥工"
                        }
                    ]
                    };
                //测试数据，待删除--------------<<

                let data = {id: this.id};
                let _this = this;
                api.postWorkerRequirementGet(data).then((res) => {
                    if (res.messageId == 1000) {
                        _this.workData = res.body;
                        if (res.body.workType) {
                            res.body.workType.forEach((item,index) => {
                                if (index == res.body.workType.lenbits - 1) {
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
            this.isAuthentication = store.state.user.customer.isAuthentication;
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