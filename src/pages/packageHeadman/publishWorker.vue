<template>
    <div class="container">
        <div class="formBox text-space">
            <div class="formItem">
                <span class="itemName overflowE">标  &nbsp;&nbsp;题<span class="red">*</span>：</span>
                <input class="itemVal text-right" type="text" v-model="requirementName">
            </div>
            <div class="formItem">
                <span class="itemName">招聘地区<span class="red">*</span>：</span>
                <span class="itemVal uni-flex">
                    <span class="uni-flex-item"><provinceSel class="sel" :options="provinces" @change="onProChange" :key="index" :selProvinceId="proId"></provinceSel></span>
                    <span class="uni-flex-item"><citySel class="sel" :options="citiesArr" @change="onCityChange" :key="index" :cityId="cityId"></citySel></span>
                </span>
            </div>
            <div class="formItem">
                <span class="itemName">最低薪资：</span>
                <input class="itemVal text-right" type="number" v-model="salaryMin">
                <span>元/日</span>
            </div>
            <div class="formItem">
                <span class="itemName">最高薪资：</span>
                <input class="itemVal text-right" type="number" v-model="salaryMax">
                <span>元/日</span>
            </div>
            <div class="formItem">
                <span class="itemName">联&nbsp;系&nbsp;人<span class="red">*</span>：</span>
                <input class="itemVal text-right" type="text" v-model="contactPerson">
            </div>
            <div class="formItem">
                <span class="itemName">联系电话<span class="red">*</span>：</span>
                <input class="itemVal text-right" type="number" v-model="contactPhone">
            </div>
            <div class="formItem">
                <span class="itemName">招聘工种<span class="red">*</span>：</span>
                <span class="itemVal text-right" @click="openPop">{{workText}}</span>
            </div>
            <div class="formItem">
                <span class="itemName">招聘人数<span class="red">*</span>：</span>
                <input class="itemVal text-right" type="number" v-model="personNumber">
            </div>
            <div class="formItem">
                <span class="itemName">招聘描述<span class="red">*</span>：</span>
                <textarea class="itemVal" type="text" v-model="description"></textarea>
            </div>
        </div>
        <div class="btnBox">
            <a class="button text-space" :class="isActive?'active':''" @click="saveInfo">发布</a>
        </div>

        <popCheckbox v-if="isOpenPop" :checkItems="workType" :checkedArr="checkedArr" @click="closePop" @change="saveCheck"></popCheckbox>
    </div>
</template>

<script>
    import utils from "@/utils/index"
    import api from "@/net/api"
    import provinceSel from "@/components/provinceSel"
    import citySel from "@/components/citySel"
    import popCheckbox from "@/components/popCheckbox"
    export default {
        name: "publishWorker",
        components: {provinceSel,citySel,popCheckbox},
        data(){
            return {
                id: '',//修改Id
                formErr: false,
                saveType: 0,//0：新增，1：修改

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

                requirementName: '',//标题
                salaryMin: '',//最低薪资
                salaryMax: '',//最高薪资
                contactPerson: '',//联系人
                contactPhone: '',//联系电话
                workType: [],//招聘工种
                workText: '请选择工种',//招聘工种显示文字
                personNumber: '',//招聘人数
                description: '',//招聘介绍

                isOpenPop: false,
                checkedArr: []//已选择工种
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
            //交互
            onProChange(e, isBack){
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
                        if (!isBack) {
                            _this.cityId = '-1';
                            _this.cityName = "请选择区县";
                            _this.cityLevel = '';
                        }
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
            openPop(){
                this.isOpenPop = true;
            },
            closePop(e){
                this.isOpenPop = e;
            },
            saveCheck(list){
                this.workType = list;
                this.checkedArr = [];
                this.workType.forEach((item,index) => {
                    if (item.checked){
                        this.checkedArr.push(item);
                    }
                });
                this.workText = '';
                if (this.checkedArr.length > 0) {
                    this.checkedArr.forEach((item,index) => {
                        if (index == this.checkedArr.length - 1) {
                            this.workText += item.name
                        }else {
                            this.workText += item.name + '、'
                        }
                    })
                }else {
                    this.workText = '请选择工种';
                }

            },

            //发布---修改和新增
            saveInfo(){
                this.formErr = true;
                //校验--必填项
                let isSelCity = true;
                if (this.cityId == -1) {
                    isSelCity = false;
                }
                let isSelType = true;
                if (this.checkedArr.length === 0){
                    isSelType = false;
                }
                let mustObj = {
                    requirementName: utils.textForm(this.requirementName),
                    selCity: isSelCity,
                    typeId: isSelType,
                    contactPerson: utils.textForm(this.contactPerson),
                    contactPhone: utils.textForm(this.contactPhone),
                    personNumber: utils.textForm(this.personNumber),
                    description: utils.textForm(this.description)
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
                    //校验数字和电话号码
                    if (!utils.isMobile(this.contactPhone)) {
                        wx.showToast({
                            title: '请填写正确的手机号！',
                            icon: 'none',
                            duration: 2000
                        });
                    }else if (!utils.isNumber(this.salaryMin) || !utils.isNumber(this.salaryMax)) {
                        wx.showToast({
                            title: '薪资请填写数字！',
                            icon: 'none',
                            duration: 2000
                        });
                    }else if (!utils.isNumber(this.personNumber)) {
                        wx.showToast({
                            title: '人数请填写数字！',
                            icon: 'none',
                            duration: 2000
                        });
                    }else {
                        this.save()
                    }
                }
            },
            save(){
                let workCheckedType = [];
                this.checkedArr.forEach((item,index) => {
                    let obj = {workTypeId: '', workTypeName: ''};
                    obj.workTypeId = item.value;
                    obj.workTypeName = item.name;
                    workCheckedType.push(obj);
                });

                let data = {
                    requirementName: this.requirementName,
                    provinceId: this.proId,
                    provinceName: this.proName,
                    cityId: this.cityId,
                    cityName: this.cityName,
                    salaryMin: this.salaryMin,
                    salaryMax: this.salaryMax,
                    contactPerson: this.contactPerson,
                    description: this.description,
                    contactPhone: this.contactPhone,
                    personNumber: this.personNumber,
                    workType: workCheckedType
                };

                wx.showModal({
                    title: '提示',
                    content: '确认提交发布？',
                    cancelColor: '#9EB4C8',
                    success (res) {
                        if (res.confirm) {
                            if (this.saveType === 0){//新增
                                api.postWorkerRequirementAdd(data).then(res => {
                                    if (res.messageId == 1000) {
                                        wx.showToast({
                                            title: '发布成功！',
                                            icon: 'none',
                                            duration: 2000
                                        });
                                        this.isActive = true;
                                        setTimeout(function () {
                                            wx.navigateBack({
                                                delta: 1,
                                                success: function () {
                                                    getCurrentPages()[0].onLoad(); // 执行前一个页面的onLoad方法
                                                }
                                            });
                                        }, 2000);
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
                                data.id = this.id;
                                api.postWorkerRequirementEdit(data).then(res => {
                                    if (res.messageId == 1000) {
                                        wx.showToast({
                                            title: '发布成功！',
                                            icon: 'none',
                                            duration: 2000
                                        });
                                        this.isActive = true;
                                        setTimeout(function () {
                                            wx.navigateBack({
                                                delta: 1,
                                                success: function () {
                                                    getCurrentPages()[0].onLoad(); // 执行前一个页面的onLoad方法
                                                }
                                            });
                                        }, 2000);
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
                            }
                        } else if (res.cancel) {
                        }
                    }
                });
            },

            //获取数据
            loadData(){
                //获取表单回显
                let _this = this;
                api.postWorkerRequirementGet({id: this.id}).then(res => {
                    let body = '';
                    if (res.messageId == 1000) {
                        body = res.body;
                    }
                    _this.requirementName = body.requirementName;
                    _this.salaryMin = body.salaryMin;
                    _this.salaryMax = body.salaryMax;
                    _this.contactPerson = body.contactPerson;
                    _this.contactPhone = body.contactPhone;
                    _this.personNumber = body.personNumber;
                    _this.description = body.description;
                    _this.proId = body.provinceId;
                    let obj = {
                        id: body.provinceId,
                        name: body.provinceName,
                        level: 2
                    };
                    _this.onProChange(obj,true);
                    _this.cityId = body.cityId;
                    _this.cityName = body.cityName;

                    _this.checkedArr = [];
                    for (let k = 0; k < body.workType.length; k++){
                        let obj = {
                            value: '',
                            name: '',
                            checked: true
                        };
                        obj.value = body.workType[k].workTypeId;
                        obj.name = body.workType[k].workTypeName;
                        _this.checkedArr.push(obj);
                    }
                    _this.workText = '';
                    for (let j = 0; j < body.workType.length; j++){
                        let item = body.workType[j];
                        if (j == body.workType.length-1) {
                            _this.workText += item.workTypeName;
                        }else {
                            _this.workText += item.workTypeName + '、';
                        }
                    }
                });
            },
            getWorkType(){
                let options = [];
                let _this = this;
                api.getWorkerType().then(res => {
                    if (res.messageId == 1000) {
                        options = res.body;
                    }
                    _this.workType = [];
                    for (let k = 0; k < options.length; k++){
                        let obj = {
                            value: '',
                            name: '',
                            checked: false
                        };
                        obj.value = options[k].id;
                        obj.name = options[k].name;
                        _this.workType.push(obj)
                    }
                });
            }
        },
        onLoad(){
            this.id = this.$root.$mp.query.id;
            console.log(this.id,'thisId');
            this.getWorkType();
            if (!this.id){
                this.saveType = 0;//新增
            } else {
                this.saveType = 1;//修改
                this.loadData()
            }
        }
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
            text-align: center;
            .button{
                height: 45px;
                line-height: 45px;
                display: inline-block;
                width: 83%;
                text-align: center;
                font-size: 18px;
                background: @appBtnColor;
                color: white;
                border: none;
                margin-top: 35px;
                box-shadow: 3px 3px 3px @borderColor;
                border-radius: 24px;
            }
            .active{
                background: @appBtnColor;
                color: white;
            }
        }
        .sel{
            height: 40px;
            text-align: right;
        }
    }
</style>