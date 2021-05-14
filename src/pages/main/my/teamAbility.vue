<template>
    <div class="container">
        <div class="container">
            <div class="formBox text-space">
                <div class="formItem">
                    <span class="itemName">信用承诺<span class="red">*</span></span>
                    <textarea class="itemVal textarea" type="text" v-model="commitment"></textarea>
                </div>
                <div class="formItem selFormItem">
                    <span class="itemName">财务状况<span class="red">*</span></span>
                    <normalSel class="itemVal sel" :selId="financialStatus" :options="statusArr" @change="onTypeChange" :key="index"></normalSel>
                </div>

                <div>
                    <div class="item">材料证明</div>
                    <div class="showImg" v-if="imgSrcArr.length > 0">
                        <div class="box" v-for="(item,index) in imgSrcArr">
                            <span class="showImgBox" :style="{backgroundImage: 'url(' + item + ')'}"></span>
                            <span class="iconfont iconfalse" @click="deleteImg(index)"></span>
                        </div>
                    </div>
                    <div class="imgBox" v-if="imgCount < 10">
                        <div class="img"><div class="line" @click="upShopIcon"><span class="iconfont iconfalse"></span></div></div>
                        <div class="text-center">上传图片</div>
                        <div class="del">建议上传签订合同或现场图片，最多上传9张</div>
                        <div class="tip">建议上传个人资产、征信等情况相关材料，提升可信度</div>
                    </div>
                </div>
            </div>
            <div class="btnBox">
                <a class="button text-space" :class="isActive?'active':''" @click="saveInfo">保存</a>
            </div>
        </div>
    </div>
</template>

<script>
    import utils from "@/utils/index"
    import api from "@/net/api"
    import normalSel from "@/components/normal-sel"

    export default {
        name: "teamAbility",
        components: {normalSel},
        data(){
            return {
                //表单字段
                commitment: '',
                financialStatus: '',
                files: [],
                imgSrcArr: [],
                imgCount: this.imgSrcArr ? this.imgSrcArr.length : 0,

                statusArr: [{
                    "id": "0", // 工种id
                    "name": "请选择", // 工种名称
                }, {
                    "id": 1, // 工种id
                    "name": "良好", // 工种名称
                },{
                    "id": 2, // 工种id
                    "name": "一般", // 工种名称
                }]
            }
        },
        methods: {
            // 点击上传图片
            upShopIcon () {
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
                        if(res.messageId == 1000){
                            wx.showToast({
                                title: "图片上传成功",
                                icon: 'success',
                                duration: 700
                            });
                            _this.files.push(res.body.url);
                            _this.imgSrcArr.push(filePath);
                        }else {
                            wx.showToast({
                                title: "图片上传失败，请重试！",
                                icon: 'none',
                                duration: 700
                            })
                        }
                    },
                    fail: function (res) {
                        wx.showToast({
                            title: "图片上传失败，请重试！",
                            icon: 'none',
                            duration: 700
                        })
                    }
                })
            },
            //图片操作
            deleteImg(index){
                this.imgSrcArr.splice(index,1);
                this.files.splice(index,1);
            },

            //表单变化监听(select)
            onTypeChange (e) {
                this.financialStatus = e.id;
            },

            //发布---修改和新增
            saveInfo(){
                this.formErr = true;

                let isSelStatus = true;
                if (this.financialStatus == 0) {
                    isSelStatus = false;
                }
                //校验--必填项
                let mustObj = {
                    commitment: utils.textForm(this.commitment),
                    financialStatus: isSelStatus
                };
                for (let key in mustObj){
                    if (!mustObj[key]){
                        this.formErr = false;
                    }
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
                    id: this.id ? this.id : '',
                    commitment: this.commitment,
                    financialStatus: this.financialStatus,
                    fileList: this.files
                };
                api.postTeamAbilityEdit(data).then(res => {
                    if (res.messageId == 1000) {
                        wx.showToast({
                            title: '保存成功！',
                            icon: 'none',
                            duration: 2000
                        });
                        this.isActive = true;
                        setTimeout(function () {
                          wx.navigateBack({
                            delta: 1,
                            success: function () {
                              getCurrentPages()[1].onLoad(); // 执行前一个页面的onLoad方法
                            }
                          });
                        }, 2000)
                    }else {
                        wx.showToast({
                            title: '保存失败，请重试！',
                            icon: 'none',
                            duration: 2000
                        });
                    }
                }).catch(res => {
                    wx.showToast({
                        title: '保存失败，请重试！',
                        icon: 'none',
                        duration: 2000
                    });
                });

            },

            //获取数据
            loadData(){
                let _this = this;
                api.postTeamAbilityGet({id: this.id}).then(res => {
                    if (res.messageId == 1000) {
                        let resBody = res.body;
                        _this.commitment = resBody.commitment;
                        _this.mainEnterprise = resBody.mainEnterprise;
                        _this.financialStatus = resBody.financialStatus;
                        _this.files = utils.urlStringToArray(resBody.files)
                        _this.imgSrcArr = utils.urlStringToArray(resBody.files)
                    }
                });
            },
        },
        onLoad(){
            this.loadData();
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
        .formBox{
            width: 100%;
            box-sizing: border-box;
            padding: 0 15px;
            .textarea{
                border: 1px solid @bgColor;
                border-radius: 4px;
                padding: 10px 0;
                margin-bottom: 10px;
            }
            .item{
                font-size: 13px;
                color: rgba(55,55,71,0.7);
                padding: 0 10px;
                box-sizing: border-box;
                margin-top: 20px;
            }
            .imgBox{
                font-size: 13px;
                color: rgba(55,55,71,0.7);
                padding: 0 10px;
                box-sizing: border-box;
                div{
                    margin-top: 10px;
                }
                .img{
                    text-align: center;
                    .line{
                        display: inline-block;
                        border: 1px solid @blueBgColor;
                        padding: 0 15px;
                        border-radius: 4px;
                        .iconfalse{
                            font-size: 40px;
                            transform: rotate(45deg);
                            font-weight: bold;
                            color: @blueBgColor;
                            display: inline-block;
                        }
                    }
                }
                .del{
                    color: @delColor;
                    opacity: 0.8;
                    font-size: 12px;
                    text-align: center;
                }
                .tip{
                    margin: 10px 10%;
                }
            }
            .showImg{
                display: flex;
                flex-flow: wrap;
                border-bottom: 1px dashed @bgColor;
                .box{
                    display: inline-block;
                    width: 33.3%;
                    position: relative;
                    .showImgBox{
                      display: inline-block;
                      width: 86%;
                      height: 80px;
                      border-radius: 8px;
                      background-size: cover;
                      background-repeat: no-repeat;
                      background-position: center 0;
                      margin: 10px;
                    }
                    //img{
                    //    display: inline-block;
                    //    width: 100%;
                    //    padding: 10px;
                    //    box-sizing: border-box;
                    //    border-radius: 4px;
                    //}
                    .iconfalse{
                        position: absolute;
                        right: 1px;
                        top: 1px;
                        z-index: 100;
                        font-size: 11px;
                        font-weight: bold;
                        color: white;
                        background: @delColor;
                        border-radius: 50%;
                        padding: 0 2px 0 3px;
                    }
                }
            }
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
                    flex: 2;
                    box-sizing: border-box;
                }
                .itemVal{
                    flex: 5;
                    padding-left: 10px;
                    box-sizing: border-box;
                }
                .sel{
                    padding-top: 6px;
                }
            }
            .selFormItem{
                margin-top: 0!important;
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

    }
</style>
