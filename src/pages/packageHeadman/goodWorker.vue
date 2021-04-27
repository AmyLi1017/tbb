<template>
    <div class="container">
        <div class="search">
            <span class="iconfont iconsearch"></span>
            <input type="text" v-model="keyWord" @confirm="onSearchChange"
                   confirm-type="search" class="search-input" placeholder-class="search-placeholder"
                   placeholder="请输入班组名称"/>
            <span class="iconfont iconfalse" v-if="keyWord.length > 0" @click="clearSearch"></span>
        </div>
        <div class="selBox">
            <div class="selItem">
                <slFilter
                        :menuList1="applyStatusList" :menuList2="provinceList"
                        :menuList3="workYearList" :menuList4="workerTypeList"
                        :val1="applyStatus" :val2="provinceId"
                        :val3="workYearSel" :val4="workType" :valMulti="cityId"
                        @change="onSelChange"
                ></slFilter>
            </div>
        </div>
        <div class="contentBox">
            <div class="totalNum">符合条件的班组共计 <span>{{totalNum}}</span> 条</div>
            <workerList :workerList="workerList" @click="goDetail"></workerList>
            <empty v-if="isEmpty" :title="emptyTips"></empty>
        </div>
        <loadMore :status="loadStatus" v-if="!isEmpty"></loadMore>
    </div>
</template>

<script>
    import api from '@/net/api'
    import util from '@/utils/index'
    import store from '@/store/index'
    import loadMore from '@/components/uni-load-more'
    import empty from '@/components/empty'
    import slFilter from '@/components/teamHeader/sl-filter-good-worker'
    import workerList from '@/components/teamHeader/worker-list'

    export default {
        name: "goodWorker",
        components: {loadMore,slFilter,workerList, empty},
        data(){
            return {
                emptyTips: "列表为空，请试试其他筛选哦！",
                isEmpty: false,
                isAuthentication: '',//是否实名
                isImg: '',//班组是否有图
                //搜索参数
                keyWord: "",
                provinceId: "",  //省份Id   val2
                cityId: "",      //城市Id   valMulti
                applyStatus: '',
                workYearMin: '',
                workYearMax: '',
                workType: '',
                pageSize: '',
                pageIndex: 1,

                workerList: '',
                totalNum: '',

                isSearch: false,
                isHasMoreData: false,
                tipsText: '到底了，不要再拉了',
                loadStatus:'loading',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
                isLoadMore:false,  //是否加载中

                applyStatusList:  [//找活状态筛选项
                    {
                        text: '未知',
                        value: 0
                    },
                    {
                        text: '找工作中',
                        value: 1
                    },
                    {
                        text: '观察中',
                        value: 2
                    }
                ],//找活状态筛选项
                provinceList: [],//地区筛选项
                citiesList: [],//地区筛选项
                workerTypeList: [],//工种筛选项
                workYearList: [//工龄筛选项
                    {
                        text: '20年以上',
                        value: 0
                    },
                    {
                        text: '15-20年',
                        value: 1
                    },
                    {
                        text: '10-15年',
                        value: 2
                    },
                    {
                        text: '5-10年',
                        value: 3
                    },
                    {
                        text: '5年以下',
                        value: 4
                    }
                ],
                workYearSel: '',
            }
        },
        methods: {
            onSearchChange() {
                wx.showLoading({
                    title: '正在搜索'
                });
                this.applyStatus = '';
                this.provinceId = '';
                this.workYearMin = '';
                this.workYearMax = '';
                this.workType = '';
                this.cityId = '';

                this.loadData(false)
            },
            clearSearch() {
                this.keyWord = "";
                this.isSearch = false;
            },
            //搜索
            doSearch() {
                wx.showLoading({
                    title: '正在搜索'
                });
                this.loadData(false)
            },
            //筛选
            onSelChange(arr){
                this.applyStatus = arr[0];
                this.provinceId = arr[1];
                this.workYearSel = arr[2];
                switch (arr[2]) {
                    case 0:
                        this.workYearMin = 20;
                        this.workYearMax = '';
                        break;
                    case 1:
                        this.workYearMin = 15;
                        this.workYearMax = 20;
                        break;
                    case 2:
                        this.workYearMin = 10;
                        this.workYearMax = 15;
                        break;
                    case 3:
                        this.workYearMin = 5;
                        this.workYearMax = 10;
                        break;
                    case 4:
                        this.workYearMin = '';
                        this.workYearMax = 5;
                        break;
                }
                this.workType = arr[3];
                this.cityId = arr[4];

                //筛选搜索
                this.doSearch();
            },
            //跳转到工人名片
            goDetail(id, customerId){
                uni.navigateTo({
                    url: "/pages/packageHeadman/workerCard?id=" + id + '&&customerId=' + customerId
                })
            },
            loadProvinces(){
                //获取省份
                let options = [];
                let resOptions = [];
                api.postRegion({level: '1',proId: ''}).then(res => {
                    if (res.messageId == 1000) {
                        resOptions = res.body;
                      for(let i = 0,len=resOptions.length; i < len; i++) {
                        let obj = {
                          value: '',
                          text: ''
                        };
                        obj.value = resOptions[i].id;
                        obj.text = resOptions[i].regionName;
                        options.push(obj)
                      }
                      this.provinceList = options
                    }
                });
            },
            loadData(isLoadMore) {
                if (isLoadMore) {
                    if (this.isHasMoreData) {
                        this.pageIndex++;
                    } else {
                        return
                    }
                } else {
                    this.pageIndex = 1
                }
                let data = {
                    keyWord: this.keyWord,
                    applyStatus: this.applyStatus,
                    provinceId: this.provinceId,
                    cityId: this.cityId,
                    workYearMin: this.workYearMin,
                    workYearMax: this.workYearMax,
                    workType: this.workType,
                    pageSize: 20,
                    pageIndex: this.pageIndex,
                };
                let _this = this;
                api.postGoodWorkerList(data).then((res) => {
                    wx.hideLoading();
                    if (res.messageId == '1000' ) {
                      this.isEmpty = false;//不为空
                      if (res.body.pageTotal == this.pageIndex) {
                        this.isHasMoreData = false;
                        this.isLoadMore = true;
                        this.loadStatus = 'nomore'
                      } else {
                        this.isHasMoreData = true;
                        this.isLoadMore = false
                      }
                      let list = res.body.data.map(item => {
                        if (item.lastBidTime){
                          item.lastBidTime = util.format(item.lastBidTime,"YYYY/MM/DD")
                        }
                        item.workerType = ''
                        if (item.workerWorkTypeList.length > 0) {
                          item.workerWorkTypeList.forEach((i, num) => {
                            if (num === item.workerWorkTypeList.length - 1) {
                              item.workerType += i.workTypeName
                            }else {
                              item.workerType += i.workTypeName + '、'
                            }
                          })
                        }
                        return item
                      });
                      if (isLoadMore) {
                        this.workerList = this.workerList.concat(list)
                      } else {
                        wx.pageScrollTo({
                          scrollTop:0
                        });
                        this.workerList = list
                      }
                      this.isSearch = true;
                      this.totalNum = res.body.total;
                    }else if (res.messageId == 2001) {
                      this.workerList = []
                      this.totalNum = 0
                      this.isEmpty = true;
                      this.isLoadMore = false;
                      this.loadStatus = '';
                    }
                })
            },
            loadWorkType(){
                let _this = this;
                api.getWorkerType().then(res => {
                    if (res.messageId == 1000) {
                        let workerTypes = [];
                        let body = res.body;
                        for (let i = 0; i < res.body.length; i++){
                            let obj = {text: '', value: ''};
                            obj.text = body[i].name;
                            obj.value = body[i].id;
                            workerTypes.push(obj);
                        }
                        _this.workerTypeList = workerTypes;
                    }
                })
            }
        },
        onLoad(){
            this.loadData(false);
            this.loadWorkType();//获取工种
            this.loadProvinces();//获取省市
        },
        onReachBottom(){  //上拉触底函数
            if(!this.isLoadMore){  //此处判断，上锁，防止重复请求
                this.isLoadMore = true;
                this.loadData(true);
            }
        },
    }
</script>

<style scoped lang="less">
    @import "../../assets/base";
    .container{
        letter-spacing: 1px;
        padding-bottom: 500px;
        .search{
            text-align: center;
            padding-top: 20px;
            .iconfont{
                display: inline-block;
                position: absolute;
                font-size: 18px;
            }
            .iconsearch{
                left: 35px;
                top: 25px;
            }
            .iconfalse{
                right: 35px;
                top: 25px;
                z-index: 100;
                padding: 0 10px;
            }
            .search-input {
                width: 88%;
                height: 40px;
                font-size: 14PX;
                display: inline-block;
                border-radius: 20px;
                line-height: 40px;
                box-shadow: 2px 2px 10px @blueBgColor;
                text-align: left;
                padding-left: 40px;
                box-sizing: border-box;
            }
            .search-placeholder {
                font-size: 14PX;
                color: @delColor;
            }
        }

        .selBox{
            display: flex;
            flex-flow: row;
            align-items: center;
            width: 100%;
            border-bottom: 1px solid @bgColor;
            .selItem{
                flex: 1;
                padding: 0 5px;
                box-sizing: border-box;
            }
        }

        .contentBox{
            margin-top: 10px;
            .totalNum{
                padding-left: 30px;
                font-size: 12px;
                color: @delColor;
                line-height: 1.8;
            }
        }
    }
</style>
