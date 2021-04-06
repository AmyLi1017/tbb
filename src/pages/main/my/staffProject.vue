<template>
    <div class="container">
        <div class="formBox text-space">
            <div class="formItem">
                <span class="itemName">项目名称<span class="red">*</span>：</span>
                <input class="itemVal" type="text" v-model="projectName">
            </div>
            <div class="formItem">
                <span class="itemName">总包单位<span class="red">*</span>：</span>
                <input class="itemVal" type="text" v-model="mainEnterprise">
            </div>
            <div class="formItem">
                <span class="itemName">项目地区<span class="red">*</span></span>
                <provinceSel class="sel" :options="provinces" @change="onProChange" :key="index" :selProvinceId="proId"></provinceSel>
                <citySel class="sel" :options="citiesArr" @change="onCityChange" :key="index" :cityId="cityId" :selCityIndex="selCityIndex"></citySel>
            </div>
            <div class="formItem">
                <span class="itemName">工作内容<span class="red">*</span></span>
                <textarea class="itemVal" type="text" v-model="workContent"></textarea>
            </div>
            <div>
                <div class="item">材料证明</div>
                <div class="showImg" v-if="imgSrcArr.length > 0">
                    <div class="box" v-for="(item,index) in imgSrcArr">
                        <img :src="item" mode="widthFix">
                        <span class="iconfont iconfalse" @click="deleteImg(index)"></span>
                    </div>

                </div>
                <div class="imgBox" v-if="imgCount < 10">
                    <div class="img"><div class="line" @click="upShopIcon"><span class="iconfont iconfalse"></span></div></div>
                    <div class="text-center">上传图片</div>
                    <div class="del">建议上传签订合同或现场图片，最多上传9张</div>
                    <div class="tip">建议上传项目现场、合同证明等相关材料，提升可信度</div>
                </div>
            </div>
        </div>
        <div class="btnBox">
            <a class="button text-space" :class="isActive?'active':''" @click="saveInfo">保存</a>
        </div>
    </div>
</template>

<script>
    import utils from "@/utils/index"
    import api from "@/net/api"
    import provinceSel from "@/components/provinceSel"
    import citySel from "@/components/citySel"

    export default {
        name: "staffProject",
        components: {provinceSel,citySel},
        data(){
            return {
                //0：新增，1：修改
                saveType: 0,
                id: '',//项目ID
                //表单字段
                projectName: '',
                mainEnterprise: '',
                workContent: '',
                files: [],
                imgSrcArr: [],
                imgCount: this.imgSrcArr ? this.imgSrcArr.length : 0,

                //城市选择
                proId: "-1",
                proName: '请选择省市',
                proLevel: '',
                proArr: [],
                cityId: '',
                cityName: '',
                cityLevel: '',
                citiesArr: [{
                    id: '-1',
                    name: '请选择区县'
                }],
                selCityIndex: 0,
            }
        },
        computed: {
            provinces(){
                //获取省份
                let options = [{id: '-1',name: '请选择省市'}];
                let resOptions = [];
                api.postRegion({level: '',proId: ''}).then(res => {
                    if (res.messageId == 1000) {
                        resOptions = res.body;
                    }
                });

                //测试数据-----------------------------待注释
                resOptions = [{
                    "id": 450000, //行政区id
                    "regionName": "云南省", //行政区名称
                    "provinceSimple": "滇", // 省简称
                    "level": 1 //等级:1省,2市,3区县
                }, {
                    "id": 651654, //行政区id
                    "regionName": "浙江省", //行政区名称
                    "provinceSimple": "浙", // 省简称
                    "level": 1 //等级:1省,2市,3区县
                }
                ];

                for(let i = 0,len=resOptions.length; i < len; i++) {
                    let obj = {
                        id: '',
                        name: '',
                        provinceSimple: '',
                        level: ''
                    };
                    obj.id = resOptions[i].id;
                    obj.name = resOptions[i].regionName;
                    obj.provinceSimple = resOptions[i].provinceSimple;
                    obj.level = resOptions[i].level;

                    options.push(obj)
                }
                this.proArr = options;
                return options;
            },
        },
        methods: {
            //交互
            onProChange(e){
                console.log(e);
                this.proId = e.id;
                this.proName = e.name;
                this.proLevel = e.level;

                let options = [{id: '-1',name: '请选择区县'}];
                let resOptions = [];
                if (this.proId !== -1 && this.proLevel < 3) {
                    api.postRegion({level: this.proLevel,proId: this.proId}).then(res => {
                        if (res.messageId == 1000) {
                            resOptions = res.body;
                        }
                    });

                    //测试数据-----------------------------待注释
                    if (this.proId == 450000){
                        resOptions = [{
                            "id": 450100, //行政区id
                            "regionName": "昆明市", //行政区名称
                            "provinceSimple": null, // 省简称
                            "level": 2 //等级:1省,2市,3区县
                        }, {
                            "id": 450200, //行政区id
                            "regionName": "玉溪市", //行政区名称
                            "provinceSimple": null, // 省简称
                            "level": 2 //等级:1省,2市,3区县
                        }];
                    }
                    if (this.proId == 651654) {
                        resOptions = [{
                            "id": 651100, //行政区id
                            "regionName": "杭州市", //行政区名称
                            "provinceSimple": null, // 省简称
                            "level": 2 //等级:1省,2市,3区县
                        }, {
                            "id": 651200, //行政区id
                            "regionName": "义乌市", //行政区名称
                            "provinceSimple": null, // 省简称
                            "level": 2 //等级:1省,2市,3区县
                        }];
                    }


                    for(let i = 0,len=resOptions.length; i < len; i++) {
                        let obj = {
                            id: '',
                            name: '',
                            provinceSimple: '',
                            level: ''
                        };
                        obj.id = resOptions[i].id;
                        obj.name = resOptions[i].regionName;
                        obj.provinceSimple = resOptions[i].provinceSimple;
                        obj.level = resOptions[i].level;

                        options.push(obj)
                    }
                    this.citiesArr = options;
                    this.cityId = '-1';
                    this.cityName = "请选择区县";
                    this.cityLevel = '';
                    this.selCityIndex = 0;
                }else {
                    this.citiesArr = options;
                    this.cityId = '-1';
                    this.cityName = "请选择区县";
                    this.cityLevel = '';
                    this.selCityIndex = 0;
                }
            },
            onCityChange(e){
                this.cityId = e.id;
                this.cityName = e.name;
                this.cityLevel = e.level;
            },

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

            //发布---修改和新增
            saveInfo(){
                this.formErr = true;
                //校验--必填项
                let isSelCity = true;
                if (this.cityId == -1) {
                    isSelCity = false;
                }
                let mustObj = {
                    projectName: utils.textForm(this.projectName),
                    selCity: isSelCity,
                    mainEnterprise: utils.textForm(this.mainEnterprise),
                    workContent: utils.textForm(this.workContent),
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
                    projectName: this.projectName,
                    provinceId: this.proId,
                    provinceName: this.proName,
                    cityId: this.cityId,
                    cityName: this.cityName,
                    mainEnterprise: this.mainEnterprise,
                    workContent: this.workContent,
                    files: this.files
                };

                if (this.saveType === 0){//新增
                    api.postStaffProjectAdd(data).then(res => {
                        if (res.messageId == 1000) {
                            wx.showToast({
                                title: '发布成功！',
                                icon: 'none',
                                duration: 2000
                            });
                            this.isActive = true;
                            wx.navigateBack({
                                delta: 1,
                                success: function () {
                                    getCurrentPages()[0].onLoad(); // 执行前一个页面的onLoad方法
                                }
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
                            title: '发布失败，请重试！',
                            icon: 'none',
                            duration: 2000
                        });
                    });
                } else {//修改
                    api.postStaffProjectEdit(data).then(res => {
                        if (res.messageId == 1000) {
                            wx.showToast({
                                title: '保存成功！',
                                icon: 'none',
                                duration: 2000
                            });
                            this.isActive = true;
                            wx.navigateBack({
                                delta: 1,
                                success: function () {
                                    getCurrentPages()[0].onLoad(); // 执行前一个页面的onLoad方法
                                }
                            });
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
                }

                //待注释------------------------------------------
                wx.navigateBack({
                    delta: 1,
                    success: function () {
                        getCurrentPages()[0].onLoad(); // 执行前一个页面的onLoad方法
                    }
                });
            },

            //获取数据
            loadData(){
                let _this = this;
                //获取表单回显
                api.postStaffProjectGet({id: this.id}).then(res => {
                    if (res.messageId == 1000) {
                        resOptions = res.body;
                        _this.projectName = body.projectName;
                        _this.mainEnterprise = body.mainEnterprise;
                        _this.workContent = body.workContent;
                        _this.files = body.files;
                        _this.imgSrcArr = body.files;

                        _this.proId = body.provinceId;
                        let obj = {
                            id: body.provinceId,
                            name: body.provinceName,
                            level: 2
                        };
                        _this.onProChange(obj);
                        _this.cityId = body.cityId;
                        _this.cityName = body.cityName;
                    }
                });
                //待注释<<-------------------------------------
                let body = {
                    projectName: '项目名项目名项目名项目名1',//项目名称
                    mainEnterprise: '重庆建工第三建筑工程有限公司',//总包单位
                    workContent: '地坪、抹灰、砌砖',//工作内容
                    provinceId: "450000",
                    provinceName: '云南省',
                    cityId: '450100',
                    cityName: '昆明市',
                    files: ['../../../static/imgs/starUser2.jpg','../../../static/imgs/starUser2.jpg']
                };
                this.projectName = body.projectName;
                this.mainEnterprise = body.mainEnterprise;
                this.workContent = body.workContent;
                this.files = body.files;
                this.imgSrcArr = body.files;

                this.proId = body.provinceId;
                let obj = {
                    id: body.provinceId,
                    name: body.provinceName,
                    level: 2
                };
                this.onProChange(obj);
                this.cityId = body.cityId;
                this.cityName = body.cityName;
                //待注释------------------------------------->>
            },
        },
        onLoad(){
            this.id = this.$root.$mp.query.id;
            if (!this.$root.$mp.query.id){
                this.saveType = 0;//新增
            } else {
                this.saveType = 1;//修改
                this.loadData()
            }
            console.log(this.saveType,'saveType')
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
                    img{
                        display: inline-block;
                        width: 100%;
                        padding: 10px;
                        box-sizing: border-box;
                        border-radius: 4px;
                    }
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