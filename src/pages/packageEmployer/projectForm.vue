<template>
    <div class="container">
        <div class="formBox text-space">
            <div class="formItem">
                <span class="itemName">项目名称<span class="red">*</span></span>
                <input class="itemVal" type="text" v-model="projectName">
            </div>
            <div class="formItem">
                <span class="itemName">项目地区<span class="red">*</span></span>
                <provinceSel class="sel" :options="provinces" @change="onProChange" :key="index"></provinceSel>
                <citySel class="sel" :options="citiesArr" @change="onCityChange" :key="index" :cityId="cityId"></citySel>
            </div>
            <div class="formItem">
                <span class="itemName">详细地址</span>
                <input class="itemVal" type="text" v-model="detailAddr">
            </div>
            <div class="formItem">
                <span class="itemName">工程类型<span class="red">*</span></span>
                <normalSel class="sel itemVal" :options="proOptions" @change="onTypeChange" :key="index"></normalSel>
            </div>
            <div class="formItem">
                <span class="itemName">项目描述<span class="red">*</span></span>
                <textarea class="itemVal" type="text" v-model="description"></textarea>
            </div>
            <div class="formItem">
                <span class="itemName">截止时间<span class="red">*</span></span>
                <timeSel class="sel itemVal" @change="onTimeChange" :key="index"></timeSel>
            </div>
            <div class="formItem">
                <span class="itemName">报名名额</span>
                <input class="itemVal" type="text" v-model="places">
            </div>
            <div class="formItem">
                <div >上传图片</div>
            </div>
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
        <div class="btnBox">
            <a class="button text-space" :class="isActive?'active':''" @click="saveInfo">发布</a>
        </div>
    </div>
</template>

<script>
    import utils from "@/utils/index"
    // import tips from "../../components/tips"
    import api from "@/net/api"
    import timeSel from "@/components/time_sel"
    import normalSel from "@/components/normal-sel"
    import provinceSel from "@/components/provinceSel"
    import citySel from "@/components/citySel"
    import zhUpFile from "@/components/upLoadFile"

    export default {
        name: "projectForm",
        components: {timeSel,normalSel,provinceSel,citySel,zhUpFile},
        data() {
            return {
                formErr: false,
                projectName: '',
                proId: "-1",
                proName: '请选择省市',
                proLevel: '',
                proArr: [],
                proOptions: '',
                cityId: '',
                cityName: '',
                cityLevel: '',
                citiesArr: [{
                    id: '-1',
                    name: '请选择区县'
                }],
                typeId: '-1',
                typeName:'请选择',
                detailAddr: '',
                description: '',
                endTime: new Date().getTime(),
                places: '',
                files: [],
                imgSrcArr: [],
                isActive: false,
                imgCount: this.imgSrcArr ? this.imgSrcArr.length : 0,
            }
        },
        computed: {
            provinces(){
                //获取省份
                let options = [{id: '-1',name: '请选择省市'}];
                let resOptions = [];
                api.postRegion({level: '1',proId: ''}).then(res => {
                    if (res.messageId == 1000) {
                        resOptions = res.body;
                    }
                    for(let i = 0,len=res.body.length; i < len; i++) {
                        let obj = {
                            id: '',
                            regionName: '',
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
                });
                return options;
            },
        },
        methods: {
            onTimeChange(e){
                this.endTime = e;
            },
            onTypeChange (e) {
                this.typeId = e.id;
                this.typeName = e.name;
            },
            onProChange(e){
                console.log(e);
                this.proId = e.id;
                this.proName = e.name;
                this.proLevel = e.level;

                let options = [{id: '-1',name: '请选择区县'}];
                let resOptions = [];
                let _this = this;
                if (this.proId !== -1 && this.proLevel < 3) {
                    api.postRegion({level: '',proId: this.proId}).then(res => {
                        if (res.messageId == 1000) {
                            resOptions = res.body;
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
                        _this.citiesArr = options;
                        _this.cityId = '-1';
                        _this.cityName = "请选择区县";
                        _this.cityLevel = '';
                    });
                }else {
                    this.citiesArr = options;
                    this.cityId = '-1';
                    this.cityName = "请选择区县";
                    this.cityLevel = '';
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
                        console.log(res,'res');
                        let response = JSON.parse(res.data);
                        if(response.messageId == "1000"){
                            wx.showToast({
                                title: "图片上传成功",
                                icon: 'success',
                                duration: 700
                            });
                            _this.files.push(response.body.url);
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

            saveInfo(){
                this.formErr = true;
                //校验--必填项
                let isSelCity = true;
                if (this.cityId == -1) {
                    isSelCity = false;
                }
                let isSelType = true;
                if (this.typeId == -1){
                    isSelType = false;
                }
                let mustObj = {
                    projectName: utils.textForm(this.projectName),
                    selCity: isSelCity,
                    typeId: isSelType,
                    description: utils.textForm(this.description),
                    endTime: utils.textForm(this.endTime)
                };
                console.log(mustObj);
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
                    if (!utils.isNumber(this.places)) {
                        wx.showToast({
                            title: '名额请填写数字！',
                            icon: 'none',
                            duration: 2000
                        });
                    }else {
                        this.save()
                    }
                }
            },
            save(){
                let data = {
                    projectName: this.projectName,
                    provinceId: this.proId,
                    provinceName: this.proName,
                    cityId: this.cityId,
                    cityName: this.cityName,
                    detailAddr: this.detailAddr,
                    typeId: this.typeId,
                    typeName: this.typeName,
                    description: this.description,
                    endTime: this.endTime,
                    places: this.places,
                    files: JSON.stringify(this.files).replace('""','\"')
                };
                api.postProjectInfo(data).then(res => {
                    if (res.messageId == 1000) {
                        wx.showToast({
                            title: '发布成功！',
                            icon: 'none',
                            duration: 2000
                        });
                        setTimeout(function () {
                            this.isActive = true;
                            uni.switchTab({
                                url: "/pages/index"
                            })
                        }, 2000 )

                    }
                });

            },
            loadCustomersInfo(){
                api.loadCustomersInfo().then(res => {
                    if (res.messageId == 1000) {
                        let userInfo = res.body.customer;
                        store.commit("saveUser", {user: userInfo});
                        setTimeout(wx.navigateBack(),2000)
                    }
                })
            },
            getProType(){
                //获取工程
                api.getProjectType().then(res => {
                    if (res.messageId == 1000) {
                        this.proOptions = res.body;
                        this.proOptions.unshift({id: '-1',name: '请选择'});
                    }
                });
            }
        },
        onShow() {
            // this.provincesOption = this.provinces();
            this.getProType();
        },
        onLoad() {

        },
    }
</script>

<style scoped lang="less">
    @import "../../assets/base";
    .container{
        padding: 0;
        width: 100%;
        padding-bottom: 60px;
        background: white;
        .formBox{
            width: 100%;
            box-sizing: border-box;
            padding: 0 15px;
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
                    flex: 1;
                    box-sizing: border-box;
                }
                .itemVal{
                    flex: 3;
                    font-size: 15px;
                    padding-left: 10px;
                    box-sizing: border-box;
                }
            }
            .formItem:last-child{
                border: none;
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
        }
    }
</style>