<template>
    <div class="container">
        <div class="liBox">
            <div class="name">求职状态<span class="red">*</span></div>
            <normalSel class="sel itemVal" :selId="selId" :options="options" @change="onTypeChange" :key="index"></normalSel>
        </div>
        <div class="liBox">
            <div class="name">工作年限<span class="red">*</span></div>
            <div class="val"><input class="lf" type="number" v-model="workYear"></div>
            <span class="rt">年</span>
        </div>
        <div class="liBox">
            <div class="name">期望工作地<span class="red">*</span></div>
            <provinceSel class="sel" :options="provinces" @change="onProChange" :key="index" :selProvinceId="proId"></provinceSel>
            <citySel class="sel" :options="citiesArr" @change="onCityChange" :key="index" :cityId="cityId" :selCityIndex="selCityIndex"></citySel>
        </div>
        <div class="liBox">
            <div class="name">身 份<span class="red">*</span></div>
            <div class="val">工人</div>
        </div>
        <div class="liBox">
            <div class="name">工 种<span class="red">*</span></div>
            <div class="val"><span @click="openPop">{{workText}}</span></div>
        </div>
        <div class="liBox">
            <div class="name">自我介绍<span class="red">*</span></div>
            <textarea class="val" type="text" v-model="description"></textarea>
        </div>
        <div class="btnBox">
            <a class="button text-space" :class="isActive?'active':''" @click="saveInfo">确认</a>
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
    import normalSel from "@/components/normal-sel"

    export default {
        name: "staffBaseInfo",
        components: {provinceSel,citySel,popCheckbox,normalSel},
        data(){
            return {
                id: '',//修改Id
                formErr: false,

                options: [{
                    id: "0", // 工种id
                    name: "请选择", // 工种名称
                }, {
                    id: "1", // 工种id
                    name: "找工作中", // 工种名称
                },{
                    id: "2", // 工种id
                    name: "观察中", // 工种名称
                }],
                selId: '',

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

                workType: [],//工种
                workText: '请选择工种',//工种显示文字
                description: '',//自我介绍
                position: 1,   //身份:0未知,1工人
                workYear: '',//工作年限
                applyStatus: this.selId,

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
            //表单变化监听(select)
            onTypeChange (e) {
                this.selId = e.id;
            },
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
            //提交---修改
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
                let isSelApplyStatus = true;
                if (this.applyStatus == -1) {
                    isSelApplyStatus = false;
                }
                let mustObj = {
                    applyStatus: isSelApplyStatus,
                    selCity: isSelCity,
                    typeId: isSelType,
                    workYear: utils.textForm(this.workYear),
                    description: utils.textForm(this.description),
                    position: utils.textForm(this.position)
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
                    if (!utils.isNumber(this.population)) {
                        wx.showToast({
                            title: '班组人数请填写数字！',
                            icon: 'none',
                            duration: 2000
                        });
                    }else if (!utils.isNumber(this.workYear)) {
                        wx.showToast({
                            title: '工作年限请填写数字！',
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
                    applyStatus: this.applyStatus,
                    provinceId: this.proId,
                    provinceName: this.proName,
                    cityId: this.cityId,
                    cityName: this.cityName,
                    workYear: this.workYear,
                    position: this.position,
                    description: this.description,
                    workType: workCheckedType
                };

                api.postStaffInfoEdit(data).then(res => {
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
                api.getWorkerInfo({id: this.id}).then(res => {
                    if (res.messageId == 1000) {
                        resOptions = res.body;
                    }
                });
                //待注释-------------------------------------
                let body = {
                    customerId: "1sdsewweweew", // 客户id，32位字符串
                    applyStatus: 1, // 求职状态:0未知,1找工作中,2观察中
                    workYear: 12, // 工作年限
                    position: 1, // 身份:0未知,1班组长/承包人
                    provinceId: 450000,  // 期望工作地省id
                    provinceName: "云南省",   // 期望工作地省名称
                    cityId: 450100,  // 期望工作地市id
                    cityName: "昆明市",  // 期望工作地市名称
                    workTypeList: [ // 工种列表
                        {
                            workTypeId: 1,   // 工种id
                            workTypeName: "架子工"},   // 工种名称
                        {
                            workTypeId: 1,
                            workTypeName: "木工"
                        }
                    ],
                    description: "从业20多年，专业承包各类工程", // 自我介绍
                    isImg: 1, // 是否有图:0否,1是
                };
                this.selId = body.applyStatus;
                this.workYear = body.workYear;
                this.position = body.position;
                this.population = body.population;
                this.description = body.description;

                let obj = {
                    id: body.provinceId,
                    name: body.provinceName,
                    level: 2
                };
                this.onProChange(obj);
                this.cityId = body.cityId;
                this.cityName = body.cityName;

                this.checkedArr = [];
                for (let k = 0; k < body.workTypeList.length; k++){
                    let obj = {
                        value: '',
                        name: '',
                        checked: true
                    };
                    obj.value = body.workTypeList[k].workTypeId;
                    obj.name = body.workTypeList[k].workTypeName;
                    this.checkedArr.push(obj);
                }
                this.workText = '';
                for (let j = 0; j < body.workTypeList.length; j++){
                    let item = body.workTypeList[j];
                    if (j == body.workTypeList.length-1) {
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
            this.getWorkType();
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
                padding-right: 5px;
                box-sizing: border-box;
            }
            .rt{
                flex: 0;
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