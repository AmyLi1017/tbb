<template>
    <div class="container">
        <div class="liBox">
            <div class="name">头 像</div>
            <div class="val" @click="upShopIcon"><img :src="icon" mode="widthFix" alt=""></div>
        </div>
        <div class="liBox">
            <div class="name">姓 名<span class="red">*</span></div>
            <div class="val" v-if="isAuthentication==0"><input class="itemVal" type="text" v-model="name"></div>
            <div class="val" v-if="isAuthentication==1"><input class="itemVal del" type="text" v-model="name" disabled="disabled"></div>
        </div>
        <div class="liBox">
            <div class="name">性 别<span class="red">*</span></div>
            <div class="val" v-if="isAuthentication==1">
                <input class="itemVal del" type="text" v-model="sexName" disabled="disabled">
            </div>
            <div class="val" v-if="isAuthentication==0">
                <view class="page-section">
                    <view class="weui-cells weui-cells_after-title">
                        <radio-group @change="radioChange">
                            <label class="weui-cell weui-check__label" v-for="(item,index) in items" :key="item.value">
                                <view class="weui-cell__hd inline-item">
                                    <radio :value="item.value" :checked="item.checked?item.checked:''" class="radio"/>
                                </view>
                                <view class="weui-cell__bd uni-inline-item">{{item.name}}</view>
                            </label>
                        </radio-group>
                    </view>
                </view>
            </div>
        </div>
        <div class="liBox">
            <div class="name">身份证号</div>
            <div class="val" v-if="isAuthentication==0"><input class="itemVal" type="text" v-model="idCard"></div>
            <div class="val" v-if="isAuthentication==1"><input class="itemVal del" type="text" v-model="idCard" disabled="disabled"></div>
        </div>
        <div class="liBox">
            <div class="name">民 族</div>
            <div class="val" v-if="isAuthentication==0">
                <normalSel class="sel itemVal" :selId="nationId" :options="getNationType" @change="onTypeChange" :key="index"></normalSel>
            </div>
            <div class="val" v-if="isAuthentication==1"><input class="itemVal del" type="text" v-model="nationName" disabled="disabled"></div>
        </div>
        <div class="liBox">
            <div class="name">手机号</div>
            <div class="val del"><input class="itemVal" type="text" v-model="phone" disabled="disabled"></div>
        </div>
        <div class="btnBox">
            <a class="button text-space" :class="isActive?'active':''" @click="goBack">确认</a>
        </div>

    </div>
</template>

<script>
    import store from '@/store'
    import utils from "@/utils/index"
    import api from '../../../net/api'
    import normalSel from "@/components/normal-sel"

    export default {
        name: "baseInfo",
        components: {normalSel},
        data(){
            return {
                isAuthentication: '',//是否实名
                formErr: false,

                name: '小飞',
                icon: '../../../static/imgs/starUser2.jpg',
                imageURL: '',
                items: [
                    {value: '1', name: '男'},
                    {value: '0', name: '女', checked: 'true'}
                    ],
                selSex: '',
                sexName: '男',
                phone: '12320230023',
                nationId: 2,
                nationName: "汉族",
                idCard: '511023198906010553',
                info: {
                    id: "1sdsewweweew", // 客户id，32位字符串
                    icon: "../../../static/imgs/starUser2.jpg", // 头像
                    name: "小飞", // 姓名,
                    phone: "12320230023", // 手机号
                    sex: '0', // 性别:0女,1男,2未知
                    age: 23, // 年龄,
                    nationName: "汉族", // 民族名称
                    idCard: '511023198906010553',
                },
                isActive: ''
            }
        },
        computed: {
            getNationType(){
                let options = [];
                api.getNationalList().then(res => {
                    if (res.messageId == 1000) {
                        options = res.body;
                    }
                });
                //测试数据-----------------------------待注释
                options = [{
                    "id": "-1", // 工种id
                    "name": "请选择", // 工种名称
                }, {
                    "id": 2, // 工种id
                    "name": "汉族", // 工种名称
                },{
                    "id": 3, // 工种id
                    "name": "白族", // 工种名称
                }, {
                    "id": 4, // 工种id
                    "name": "维吾尔族", // 工种名称
                }, {
                    "id": 5, // 工种id
                    "name": "朝鲜族", // 工种名称
                }
                ];

                return options;
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
                        console.log(_this.imageName,'_this.imageName');
                        //上传图片
                        let url = 'http://116.62.14.183:9000/images/upload';
                        for (var index in res.tempFilePaths) {
                            _this.upload_file(url, res.tempFilePaths[index])
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
                            _this.imageURL = res.body.url;
                            _this.icon = filePath;
                            _this.formChange = true;
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
            //表单变化监听(select)
            onTypeChange (e) {
                this.nationId = e.id;
                this.nationName = e.name;
            },
            //表单变化监听(radio)
            radioChange(e) {
                console.log('radio发生change事件，携带value值为：', e.detail.value);
                for (let i = 0, len = this.items.length; i < len; ++i) {
                    if (this.items[i].value === e.detail.value) {
                        this.items[i].checked = true;
                        this.selSex = e.detail.value;
                    }else {
                        this.items[i].checked = false;
                    }
                }

            },
            goBack(){
                //表单校验
                if (this.isAuthentication == 1) {// 是否身份认证:0否,1是
                    this.saveInfo();
                }else {
                    this.save();
                }
            },
            saveInfo(){
                this.formErr = true;
                //校验--必填项
                let isSelSex = true;
                if (this.isSelSex != this.info.sex){
                    isSelSex = false;
                }
                let mustObj = {
                    name: utils.textForm(this.name),
                    sex: isSelSex
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
                    //校验身份证号码
                   if (utils.textForm(this.idCard) && !utils.IdCodeValid(this.idCard)) {
                        wx.showToast({
                            title: '请填写正确的身份证号！',
                            icon: 'none',
                            duration: 2000
                        });
                    }else {
                        this.save()
                    }
                }
            },
            save(){
                let data = {};
                data.name = this.name;
                data.icon = this.imageURL;
                data.sex = this.selSex;
                data.idCard = this.idCard;
                data.nationId = this.nationId;
                data.nationName = this.nationName;
                api.postEditBaseInfo(data).then(res => {
                    if (res.messageId == 1000) {
                        wx.showToast({
                            title: '提交成功！',
                            icon: 'none',
                            duration: 2000
                        });
                        wx.navigateBack({
                            delta: 1
                        });
                    }else {
                        wx.showToast({
                            title: '发布失败，请重试！',
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

            loadData(){
                let _this = this;
                api.postTeamCustomerBase().then(res => {
                    if (res.messageId == 1000) {
                        _this.info = res.body;
                        _this.icon = res.body.icon;
                        _this.name = res.body.name;
                        _this.phone = res.body.phone;
                        _this.nationName = res.body.nationName;
                        _this.idCard = res.body.idCard;
                        if (res.body.sex == 0) {
                            _this.items = [
                                {value: '1', name: '男'},
                                {value: '0', name: '女', checked: 'true'}
                            ]
                            _this.sexName = '女'
                        }else {
                            _this.items = [
                                {value: '1', name: '男', checked: 'true'},
                                {value: '0', name: '女'}
                            ]
                            _this.sexName = '男'
                        }
                    }else {
                        uni.showToast({
                            title: '网络错误，请重试！',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                }).catch(res => {
                    uni.showToast({
                        title: '网络错误，请重试！',
                        icon: 'none',
                        duration: 2000
                    })
                });
            }
        },
        onLoad() {
            this.isAuthentication = store.state.user.customer.isAuthentication;
            // 调用应用实例的方法获取全局数据
            this.loadData()
        }
    }



</script>

<style scoped lang="less">
    @import "../../../assets/base";
    .container{
        font-size: 13px;
        color: @appBtnColor;
        letter-spacing: 1px;
        margin: 15px;
        padding: 0 15px;
        box-sizing: border-box;
        box-shadow: 2px 2px 10px @bgColor;
        .liBox:first-child{
            padding: 8px 0;
        }
        .liBox{
            display: flex;
            flex-flow: row;
            align-items: center;
            padding: 15px 0;
            border-bottom: 1px dashed @bgColor;
            .name{
                flex: 1;
            }
            .val{
                flex: 2;
                text-align: right;
                img{
                    display: inline-block;
                    width: 30px;
                    border-radius: 2px;
                }
            }
            .del{
                color: @delColor;
            }
            .radio{
                width: 60px;
            }
            .weui-cell{
                display: inline-block;
                .weui-cell__bd{
                    display: inline-block;
                }
            }
            .inline-item{
                display: inline-block;
            }
        }
        .liBox:last-child{
            border-bottom: none;
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