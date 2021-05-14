<template>
    <div class="container">
        <div class="formBox text-space">
            <div class="formItem">
                <span class="itemName">企业名称<span class="red">*</span></span>
                <input class="itemVal" type="text" v-model="enterpriseName">
            </div>
            <div class="formItem">
                <span class="itemName">企业类型</span>
                <normalSel class="sel itemVal" :selId="selId" :options="typeItems" @change="onTypeChange" :key="index"></normalSel>
            </div>
            <div class="formItem">
                <span class="itemName">企业介绍</span>
                <textarea class="itemVal description" maxlength="500" type="text" v-model="description"
                          placeholder="最多输入500个字符" placeholderClass="phcolor"></textarea>
            </div>
            <div class="formItem">
                <span class="itemName">营业执照</span>
                <div class="itemVal" v-if="!isHadImg"><span class="up" @click="upLoadImg">上传图片</span></div>
                <div class="itemVal img" v-if="isHadImg">
                    <img :src="imgSrc" alt="" mode="aspectFit" @click="upLoadImg">
                </div>
            </div>
        </div>
        <div class="btnBox">
            <a class="button text-space" :class="isActive?'active':''" @click="saveInfo">确认</a>
        </div>
    </div>
</template>

<script>
    import normalSel from '@/components/normal-sel'
    import api from '../../../net/api'
    import utils from "@/utils/index"

    export default {
        name: "companyInfo",
        components: {normalSel},
        data(){
            return {
                enterpriseName: '',
                enterpriseType: this.selId,
                description: '',
                business: this.imgUrl,

                typeItems: [{
                    id: 0,
                    name: "请选择", // 公司类型名称
                },{
                    id: 1,
                    name: "建筑公司", // 公司类型名称
                },{
                    id: 2,
                    name: "劳务公司", // 公司类型名称
                }],
                selId: '',
                isHadImg: false,
                imgSrc: '',
                imgUrl: '',
                formErr: false
            }
        },
        methods: {
            // 点击上传图片
            upLoadImg () {
                let _this = this;
                wx.showActionSheet({
                    itemList: ['从相册中选择', '拍照'],
                    itemColor: "#f7982a",
                    success: function (res) {
                        if (!res.cancel) {
                            if (res.tapIndex == 0) {
                                _this.chooseImg('album')
                            } else if (res.tapIndex == 1) {
                                _this.chooseImg('camera')
                            }
                        }
                    }
                })
            },
            //选中图片-显示图片
            chooseImg(type){
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
                            _this.upload_file(url, tempFilePaths[index])
                        }
                    }
                })
            },
            //上传图片
            upload_file(url, filePath) {
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
                        console.log(res,'res');
                        let resBody = JSON.parse(res.data);
                        if(resBody.messageId == 1000){
                            _this.imgSrc = filePath;//预览路径绑定
                            _this.imgUrl = resBody.url;//保存地址
                            _this.isHadImg = true;//显示预览
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
            //回显
            loadData(){
                let _this = this;
                api.getCenterCompanyInfo().then(res => {
                    if (res.messageId == 1000) {
                        _this.enterpriseName = res.body.enterpriseName;
                        _this.selId = res.body.enterpriseType;
                        _this.description = res.body.description;
                        _this.imgUrl = res.body.business;
                        _this.imgSrc = res.body.business;
                        if (res.body.business&&res.body.business.length > 0) {
                            _this.isHadImg = true;
                        }
                    }else {
                        wx.showToast({
                            title: '网络错误，请重试！',
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
            },
            //提交
            saveInfo(){
                this.formErr = true;
                //校验--必填项
                if (!utils.textForm(this.enterpriseName)) {
                    this.formErr = false;
                }
                if (this.formErr === false){
                    wx.showToast({
                        title: '请填写必填项',
                        icon: 'none',
                        duration: 2000
                    });
                }else {
                    this.save()
                }
            },
            save(){
                let data = {
                    id: '',
                    customerId: '',
                    enterpriseName: this.enterpriseName,
                    enterpriseType: this.enterpriseType,
                    description: this.description,
                    business: this.business
                };
                api.postCompanyInfoEdit(data).then(res => {
                    if (res.messageId == 1000) {
                        wx.showToast({
                            title: '保存成功！',
                            icon: 'none',
                            duration: 2000
                        });
                        uni.navigateBack({
                            delta: 1
                        })
                    }else {
                        wx.showToast({
                            title: '网络错误，请重试！',
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
        onLoad(){
            this.loadData();//回显
        }
    }
</script>

<style scoped lang="less">
    @import "../../../assets/base";
    .container{
        padding: 0;
        width: 100%;
        padding-bottom: 60px;
        background: white;
        .phcolor{
            color: #c8c8c8;
            font-size: 11px;
        }
        .formBox{
            width: 100%;
            box-sizing: border-box;
            padding: 0 15px;
            .formItem{
                font-size: 13px;
                color: rgba(55,55,71,0.7);
                padding: 0 10px;
                box-sizing: border-box;
                display: flex;
                flex-flow: row;
                align-items: center;
                border-bottom: 1px solid @borderColor;
                margin-top: 20px;
                .itemName{
                    flex: 1;
                    box-sizing: border-box;
                }
                .itemVal{
                    flex: 3;
                    font-size: 15px;
                    padding-left: 10px;
                    text-align: right;
                    box-sizing: border-box;
                    .up{
                        background: @bbgColor;
                        display: inline-block;
                        padding: 2px 10px;
                        font-size: 12px;
                        margin-bottom: 4px;
                    }
                    img{
                        display: inline-block;
                        max-width: 120px;
                        max-height: 120px;
                    }
                }
                .description{
                    text-align: left;
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
        .sel{
            height: 40px;
            text-align: right;
            position: relative;
            right: -20px;
        }
    }
</style>
