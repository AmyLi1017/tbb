<template>
    <div class="container">
        <div class="formBox text-space">
            <div class="formItem">
                <span class="itemName">标  &nbsp;&nbsp;题<span class="red">*</span>：</span>
                <input class="itemVal" type="text" v-model="requirementName">
            </div>
            <div class="formItem">
                <span class="itemName">招聘地区<span class="red">*</span>：</span>
                <provinceSel class="sel" :options="provinces" @change="onProChange" :key="index" :selProvinceId="proId"></provinceSel>
                <citySel class="sel" :options="citiesArr" @change="onCityChange" :key="index" :cityId="cityId" :selCityIndex="selCityIndex"></citySel>
            </div>
            <div class="formItem">
                <span class="itemName">最低薪资：</span>
                <input class="itemVal" type="number" v-model="salaryMin">
                <span>元/日</span>
            </div>
            <div class="formItem">
                <span class="itemName">最高薪资：</span>
                <input class="itemVal" type="number" v-model="salaryMax">
                <span>元/日</span>
            </div>
            <div class="formItem">
                <span class="itemName">联&nbsp;系&nbsp;人<span class="red">*</span>：</span>
                <input class="itemVal" type="text" v-model="contactPerson">
            </div>
            <div class="formItem">
                <span class="itemName">联系电话<span class="red">*</span>：</span>
                <input class="itemVal" type="number" v-model="contactPhone">
            </div>
            <div class="formItem">
                <span class="itemName">招聘工种<span class="red">*</span>：</span>
                <span class="itemVal" @click="openPop">{{workText}}</span>
            </div>
            <div class="formItem">
                <span class="itemName">招聘人数<span class="red">*</span>：</span>
                <input class="itemVal" type="number" v-model="personNumber">
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

                if (this.saveType === 0){//新增
                    api.postWorkerRequirementAdd(data).then(res => {
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
                    api.postWorkerRequirementEdit(data).then(res => {
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
                //获取表单回显
                api.postWorkerRequirementGet({id: this.id}).then(res => {
                    if (res.messageId == 1000) {
                        resOptions = res.body;
                    }
                });
                //待注释-------------------------------------
                let body = {
                    requirementName: '招抹灰工、木工若干，待遇从优，日结！',//标题
                    salaryMin: '200',//最低薪资
                    salaryMax: '1000',//最高薪资
                    contactPerson: '张飞',//联系人
                    contactPhone: '13565429561',//联系电话
                    personNumber: '10',//招聘人数
                    description: '1.两年以上经验 2.50岁以下 3.有证书优先',//招聘介绍
                    provinceId: "450000",
                    provinceName: '云南省',
                    cityId: '450100',
                    cityName: '昆明市',
                    workType: [  // 招聘工种数组
                        {
                            workTypeId:4,
                            workTypeName:"钢筋工"
                        },
                        {
                            workTypeId:5,
                            workTypeName:"水泥工"
                        }
                    ],
                };
                this.requirementName = body.requirementName;
                this.salaryMin = body.salaryMin;
                this.salaryMax = body.salaryMax;
                this.contactPerson = body.contactPerson;
                this.contactPhone = body.contactPhone;
                this.personNumber = body.personNumber;
                this.description = body.description;
                this.proId = body.provinceId;
                let obj = {
                    id: body.provinceId,
                    name: body.provinceName,
                    level: 2
                };
                this.onProChange(obj);
                this.cityId = body.cityId;
                this.cityName = body.cityName;

                this.checkedArr = [];
                for (let k = 0; k < body.workType.length; k++){
                    let obj = {
                        value: '',
                        name: '',
                        checked: true
                    };
                    obj.value = body.workType[k].workTypeId;
                    obj.name = body.workType[k].workTypeName;
                    this.checkedArr.push(obj);
                }
                this.workText = '';
                for (let j = 0; j < body.workType.length; j++){
                    let item = body.workType[j];
                    if (j == body.workType.length-1) {
                        this.workText += item.workTypeName;
                    }else {
                        this.workText += item.workTypeName + '、';
                    }
                }

            },
            getWorkType(){
                let options = [];
                api.getWorkerType().then(res => {
                    if (res.messageId == 1000) {
                        options = res.body;
                    }
                });
                //测试数据-----------------------------待注释
                options = [{
                    id: 2, // 工种id
                    name: "架子工", // 工种名称
                },{
                    id: 3, // 工种id
                    name: "抹灰工", // 工种名称
                }, {
                    id: 4, // 工种id
                    name: "钢筋工", // 工种名称
                }, {
                    id: 5, // 工种id
                    name: "水泥工", // 工种名称
                }
                ];
                this.workType = [];
                for (let k = 0; k < options.length; k++){
                    let obj = {
                        value: '',
                        name: '',
                        checked: false
                    };
                    obj.value = options[k].id;
                    obj.name = options[k].name;
                    this.workType.push(obj)
                }
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