<template>
    <div class="container">
        <div class="boxA" v-if="isAuthentication == 0">
            <div class="title">请按照要求上传</div>
            <div class="imgBox" @click="upIdCard(0)">
                <div v-if="!chooseFront">
                    <div class="iconBox"><span class="iconfont iconshenfenzhengzhengmian"></span></div>
                    <div class="tips">上传身份证正面（照片一面）</div>
                </div>
                <div class="yulan" v-if="chooseFront">
                    <img :src="frontImgSrc" alt="" mode="aspectFit">
                </div>
                <span class="iconfont iconfalse"></span>
            </div>
            <div class="imgBox" @click="upIdCard(1)">
                <div v-if="!chooseBack">
                    <div class="iconBox"><span class="iconfont iconshenfenzhengfanmian"></span></div>
                    <div class="tips">上传身份证背面（国徽一面）</div>
                </div>
                <div class="yulan" v-if="chooseBack">
                    <img :src="backImgSrc" alt="" mode="aspectFit">
                </div>
                <span class="iconfont iconfalse"></span>
            </div>
            <div class="form">
                <div class="liBox">
                    <div class="lf">姓 名：</div>
                    <div class="rt">{{name}}</div>
                </div>
                <div class="liBox">
                    <div class="lf">性 别：</div>
                    <div class="rt">
                        <span v-if="sex == 1">男</span>
                        <span v-if="sex == 0">女</span>
                    </div>
                </div>
                <div class="liBox">
                    <div class="lf">民 族：</div>
                    <div class="rt">{{nationName}}</div>
                </div>
                <div class="liBox">
                    <div class="lf">身份证号：</div>
                    <div class="rt">{{idCard}}</div>
                </div>
            </div>
        </div>
        <div class="btnBox" v-if="isAuthentication == 0">
            <a class="button text-space" :class="isActive?'active':''" @click="saveInfo">提交实名认证</a>
        </div>
        <div class="hide" v-if="isAuthentication == 0">
            <input type="text" v-model="frontPng">
            <input type="text" v-model="backPng">
        </div>
        <div class="showTips" v-if="isAuthentication == 1">
            <empty :title="tipsTitle"></empty>
        </div>
    </div>
</template>

<script>
    import store from '@/store'
    import api from '../../../net/api'
    import empty from '@/components/empty'

    export default {
        name: "authentication",
        components: {empty},
        data(){
            return {
                isAuthentication: '',
                name: '',
                sex: '',// 性别:0女,1男,2未知
                nationName: '',
                nationId: '',
                idCard: '',
                age: '',
                frontPng: '',
                frontImgSrc: '',
                chooseFront: false,
                backPng: '',
                backImgSrc: '',
                chooseBack: false,

                checkIdCard: false,

                tipsTitle: '您已实名！'
            }
        },
        methods: {
            // 点击上传图片
            upIdCard (type) {
                let _this = this;
                wx.showActionSheet({
                    itemList: ['从相册中选择', '拍照'],
                    itemColor: "#f7982a",
                    success: function (res) {
                        if (!res.cancel) {
                            if (res.tapIndex == 0) {
                                _this.chooseImg('album',type)
                            } else if (res.tapIndex == 1) {
                                _this.chooseImg('camera',type)
                            }
                        }
                    }
                })
            },
            //选中图片-显示图片
            chooseImg(type,imgType){
                let _this = this;
                wx.chooseImage({
                    count: 1,
                    sizeType: ['original', 'compressed'],
                    sourceType: [type],
                    success (res) {
                        // tempFilePath可以作为img标签的src属性显示图片
                        const tempFilePaths = res.tempFilePaths;
                        //上传图片
                        let url = 'http://116.62.14.183:9000/images/upload';
                        for (var index in res.tempFilePaths) {
                            _this.upload_file(url, tempFilePaths[index],imgType)
                        }
                    }
                })
            },
            //上传图片
            upload_file(url, filePath,imgType) {
                let _this = this;
                wx.uploadFile({
                    url: url,
                    filePath: filePath,
                    name: 'imageName',
                    header: {
                        'content-type': 'multipart/form-data'
                    }, // 设置请求的 header
                    formData: {'imageName': 'imageName'}, // HTTP 请求中其他额外的 form data
                    success: function (res) {
                        let response = JSON.parse(res.data)
                        if(response.messageId == 1000){
                            if (imgType == 0) {//正面
                                _this.frontImgSrc = filePath;//预览路径绑定
                                _this.frontPng = response.body.url;//保存地址
                                _this.chooseFront = true;//显示预览
                            }else if (imgType == 1) {//反面
                                _this.backImgSrc = filePath;
                                _this.backPng = response.body.url;
                                _this.chooseBack = true;
                            }
                            // 图片校验、回显idCard信息
                            // _this.uploadImgChange()
                        }else {
                            wx.showToast({
                            title: "上传失败，请重试！",
                            icon: 'none',
                            duration: 700
                            })
                        }
                    },
                    fail: function (res) {
                        wx.showToast({
                            title: "上传失败，请重试！",
                            icon: 'none',
                            duration: 700
                        })
                    }
                })
            },
            //图片校验、回显idCard信息
            uploadImgChange(){
                if (this.frontPng.length > 0 && this.backPng.length > 0) {
                    let _this = this;
                    let data = {};
                    data.frontPng = this.frontPng;
                    data.backPng = this.backPng;
                    api.postIdCard(data).then(res => {
                        if (res.messageId == 1000) {
                            _this.name = res.body.name;
                            _this.sex = res.body.sex;
                            _this.nationName = res.body.nationName;
                            _this.nationId = res.body.nationId;
                            _this.idCard = res.body.idCard;
                            _this.age = res.body.age;
                            _this.checkIdCard = true;
                        }else {
                            wx.showToast({
                                title: '请按照要求上传图片！',
                                icon: 'none',
                                duration: 2000
                            });
                        }
                    }).catch(res => {
                        wx.showToast({
                            title: '网络错误，请重试！',
                            icon: 'none',
                            duration: 2000
                        });
                    });
                }
            },
            saveInfo(){
                // 待注释------------->>
                this.checkIdCard = true
                // 待注释-------------<<

                if (this.checkIdCard) {
                    //提交实名认证
                    let data = {};
                    data.name = this.name;
                    data.sex = this.sex;
                    data.nationId = this.nationId;
                    data.nationName = this.nationName;
                    data.idCard = this.idCard;
                    data.age = this.age;
                    data.frontPng = this.frontPng;
                    data.backPng = this.backPng;
                    api.postCustomerAuthenticationUpdate(data).then(res => {
                        if (res.messageId == 1000) {
                            //更新用户信息--写入本地缓存
                            let userInfo = {
                                icon: res.body.icon, // 头像
                                account: res.body.account, // 账号
                                phone: res.body.phone, // 手机号
                                name: res.body.name, // 姓名
                                isAuthentication: res.body.isAuthentication, // 是否身份认证:0否,1是
                                isImg: res.body.isImg,//是否有图:0否,1是（只班组）
                                token: store.state.user.token, // token，32为字符
                                effectiveTime: store.state.user.effectiveTime // token有效时间：单位秒
                            };
                            store.commit("saveUser", {user: userInfo});

                            //返回个人中心
                            wx.navigateBack({
                                delta: 1,
                                success: function () {
                                    getCurrentPages()[0].onLoad(); // 执行前一个页面的onLoad方法
                                }
                            });
                        }else {
                            wx.showToast({
                                title: '请按照要求上传图片！',
                                icon: 'none',
                                duration: 2000
                            });
                        }
                    }).catch(res => {
                        wx.showToast({
                            title: '网络错误，请重试！',
                            icon: 'none',
                            duration: 2000
                        });
                    });
                }else {
                    wx.showToast({
                        title: '请按照要求上传图片！',
                        icon: 'none',
                        duration: 2000
                    });
                }
            }
        },
        onLoad() {
            this.isAuthentication = store.state.user.isAuthentication;
        }
    }
</script>

<style scoped lang="less">
    @import "../../../assets/base";

    .container{
        font-size: 13px;
        color: @appBtnColor;
        letter-spacing: 1px;
        padding-bottom: 50px;
        .boxA{
            .title{
                font-size: 15px;
                font-weight: bold;
                text-align: center;
                margin: 20px 0;
            }
            .imgBox{
                width: 70%;
                margin: 20px 15% 0 15%;
                background: @bbgColor;
                border-radius: 4px;
                text-align: center;
                height: 160px;
                font-size: 14px;
                position: relative;
                .iconfont{
                    display: inline-block;
                }
                .iconBox{
                    height: 118px;
                    .iconshenfenzhengzhengmian,.iconshenfenzhengfanmian{
                        margin: 30px 0;
                        font-size: 140px;
                        background: white;
                        border-radius: 8px;
                        color: @bbgColor;
                        width: 138px;
                        height: 88px;
                    }
                    .iconshenfenzhengzhengmian:before,.iconshenfenzhengfanmian:before{
                        display: block;
                        height: 88px;
                        position: relative;
                        top: -88px;
                        left: 0;
                    }
                }
                .iconfalse{
                    display: inline-block;
                    position: absolute;
                    transform: rotate(45deg);
                    font-size: 50px;
                    color: @delColor;
                    opacity: 0.5;
                    top: 30px;
                    left: calc(50% - 25px);
                }
                .tips{
                    margin-top: 10px;
                }
                .yulan{
                    img{
                        display: inline-block;
                        max-width: 100%;
                        max-height: 160px;
                    }
                }
            }
            .form{
                width: 78%;
                margin: 30px 11%;
                box-shadow: 2px 2px 8px @bbgColor;
                border-radius: 4px;

                .liBox:last-child{
                    border-bottom: none;
                }
                .liBox{
                    display: flex;
                    flex-flow: row;
                    align-items: center;
                    line-height: 40px;
                    padding: 0 10px;
                    border-bottom: 1px dashed @bbgColor;
                    .lf{
                        flex: 1;
                    }
                    .rt{
                        flex: 2;
                    }
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
            background: @appBtnColor;
            left: 0;
            a{
                text-align: center;
                display: inline-block;
                width: 100%;
            }
        }
        .hide{
            display: none;
        }
    }
</style>
