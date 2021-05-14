<template>
  <div class="container">
    <div class="liBox">
      <div class="name">求职状态<span class="red">*</span></div>
      <normalSel class="sel itemVal" :selId="applyStatus" :options="options" @change="onTypeChange" :key="index"></normalSel>
    </div>
    <div class="liBox">
      <div class="name">工作年限<span class="red">*</span></div>
      <div class="val"><input class="lf" type="number" v-model="workYear"></div>
      <span class="rt">年</span>
    </div>
    <div class="liBox">
      <div class="name">期望工作地<span class="red">*</span></div>
      <provinceSel class="sel" :options="proArr" @change="onProChange" :key="index" :selProvinceId="proId"></provinceSel>
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
      applyStatus: '',

      isOpenPop: false,
      checkedArr: []//已选择工种
    }
  },
  methods: {
    provinces(){
      //获取省份
      let options = [{id: '-1',name: '请选择省市'}];
      let resOptions = [];
      api.postRegion({level: '1',proId: ''}).then(res => {
        if (res.messageId == 1000) {
          resOptions = res.body;
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
        }
      });
    },
    //表单变化监听(select)
    onTypeChange (e) {
      this.applyStatus = e.id;
    },
    //交互
    onProChange(e, isGet){
      this.proId = e.id;
      this.proName = e.name;
      this.proLevel = e.level;

      let options = [{id: '-1',name: '请选择区县'}];
      let resOptions = [];
      if (this.proId !== -1 && this.proLevel < 3) {
        let _this = this;
        api.postRegion({level: '',proId: this.proId}).then(res => {
          if (res.messageId == 1000) {
            resOptions = res.body;
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
            _this.cityLevel = '';
            if (isGet) {
              _this.cityId = isGet.cityId;
              _this.cityName = isGet.cityName;
            }else {
              _this.cityId = '-1';
              _this.cityName = "请选择区县";
            }
          }
        });
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
       if (!utils.isNumber(this.workYear)) {
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
        workerWorkTypeList: workCheckedType
      };

      console.log(data, 'data')
      api.postStaffInfoEdit(data).then(res => {
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
          }, 1500)
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
      //获取表单回显
      api.getWorkerInfo({id: this.id}).then(res => {
        if (res.messageId == 1000) {
          let body = res.body;
          this.applyStatus = body.applyStatus;
          this.workYear = body.workYear;
          this.position = body.position;
          this.description = body.description;

          let obj = {
            id: body.provinceId,
            name: body.provinceName,
            level: 2
          };
          this.onProChange(obj, {
            cityId: body.cityId,
            cityName: body.cityName
          });

          this.checkedArr = [];
          this.workText = '';
          for (let k = 0; k < body.workerWorkTypeList.length; k++){
            let obj = {
              value: '',
              name: '',
              checked: true
            };
            obj.value = body.workerWorkTypeList[k].workTypeId;
            obj.name = body.workerWorkTypeList[k].workTypeName;
            this.checkedArr.push(obj);

            let item = body.workerWorkTypeList[k];
            if (k === body.workerWorkTypeList.length - 1) {
              this.workText += item.workTypeName;
            }else {
              this.workText += item.workTypeName + '、';
            }
          }
        }
      });
    },
    getWorkType(){
      let options = [];
      api.getWorkerType().then(res => {
        if (res.messageId == 1000) {
          options = res.body;
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
      });
    }
  },
  onLoad(){
    this.getWorkType();
    this.provinces();
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
