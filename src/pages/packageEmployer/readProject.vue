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
            <!--<div class="selItem"><sl-filter :menuList="applyStatusList"></sl-filter></div>-->
            <div class="selItem">
                <sl-filter-multi
                        :menuList1="applyStatusList" :menuList2="provinceList"
                        :menuList3="populationList" :menuList4="workerTypeList"
                        :val1="applyStatus" :val2="provinceId"
                        :val3="populationSel" :val4="workType" :valMulti="cityId"
                        @change="onSelChange"
                ></sl-filter-multi>
            </div>
            <!--<div class="selItem"><sl-filter :menuList="populationList"></sl-filter></div>-->
            <!--<div class="selItem"><sl-filter :menuList="workerTypeList"></sl-filter></div>-->
        </div>
        <div class="contentBox">
            <div class="totalNum">符合条件的班组共计 <span>{{totalNum}}</span> 条</div>
            <teamList :teamsList="teamsList" @click="goDetail"></teamList>
            <empty v-if="teamsList.length === 0" :title="emptyMessage"></empty>
        </div>
        <loadMore :status="loadStatus" v-if="isLoadMore"></loadMore>
    </div>
</template>

<script>
    import slFilter from '@/components/sl-filter'
    import slFilterMulti from '@/components/sl-filter-multi'
    import api from '@/net/api'
    import loadMore from '@/components/uni-load-more'
    import teamList from '@/components/teamList'
    import empty from "../../components/empty";

    export default {
        name: "readProject",
        components: {slFilter,slFilterMulti,loadMore,teamList,empty},
        data(){
            return {
                //搜索参数
                keyWord: "",
                applyStatus: "", //找活状态 val1
                provinceId: "",  //省份Id   val2
                cityId: "",      //城市Id   valMulti
                populationMin: '',//最小人数
                populationMax: '',//最大人数
                workType: '',     //拥有工种  val4
                pageSize: '',
                pageIndex: 1,

                populationSel: '',//队伍人数选择结果  val3

                isSearch: false,
                isHasMoreData: false,
                tipsText: '到底了，不要再拉了',
                loadStatus:'loading',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
                isLoadMore:false,  //是否加载中
                emptyMessage: '暂无符合条件的班组',

                teamsList: [],//listData

                applyStatusList:  [
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
                ], //selList
                provinceList: [],//selList
                citiesList: [],//selList
                populationList: [
                    {
                        text: '300人以上',
                        value: 0
                    },
                    {
                        text: '200-300人',
                        value: 1
                    },
                    {
                        text: '100-200人',
                        value: 2
                    },
                    {
                        text: '50-100人',
                        value: 3
                    },
                    {
                        text: '50人以下',
                        value: 4
                    }
                ],//selList
                workerTypeList: [],//selList
                totalNum: 0
            }
        },

        methods: {
            onSearchChange() {
                wx.showLoading({
                    title: '正在搜索'
                });
                this.applyStatus = '';
                this.provinceId = '';
                this.populationMin = '';
                this.populationMax = '';
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
                this.populationSel = arr[2];
                switch (arr[2]) {
                    case 0:
                        this.populationMin = 300;
                        this.populationMax = '';
                        break;
                    case 1:
                        this.populationMin = 200;
                        this.populationMax = 300;
                        break;
                    case 2:
                        this.populationMin = 100;
                        this.populationMax = 200;
                        break;
                    case 3:
                        this.populationMin = 50;
                        this.populationMax = 100;
                        break;
                    case 4:
                        this.populationMin = 0;
                        this.populationMax = 50;
                        break;
                }
                this.workType = arr[3];
                this.cityId = arr[4];

                //筛选搜索
                this.doSearch();
            },

            //跳转到班组名片
            goDetail(id){
                uni.navigateTo({
                    url: "/pages/packageEmployer/teamCard?id=" + id
                })
            },
            loadProvinces(){
              //获取省份
              let _this = this;
              let options = [{value: '-1',text: '请选择省市'}];
              let resOptions = [];
              api.postRegion({level: '1',proId: ''}).then(res => {
                if (res.messageId == 1000) {
                  resOptions = res.body;
                }
                for(let i = 0,len = resOptions.length; i < len; i++) {
                  let obj = {
                    value: '',
                    text: ''
                  };
                  obj.value = resOptions[i].id;
                  obj.text = resOptions[i].regionName;

                  options.push(obj)
                  _this.provinceList = options;
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
                    populationMin: this.populationMin,
                    populationMax: this.populationMax,
                    workType: this.workType,
                    pageSize: '',
                    pageIndex: 1,
                };
                let _this = this;
                api.postTeamsSearch(data).then((res) => {
                  wx.hideLoading();
                  if (res.messageId == 1000){
                    if (res.body.pageTotal == this.pageIndex) {
                      _this.isHasMoreData = false;
                      _this.isLoadMore = true;
                      _this.loadStatus = 'nomore'
                    } else {
                      _this.isHasMoreData = true;
                      _this.isLoadMore = false
                    }
                    let list = res.body.data.map(item => {
                      return item
                    });

                    if (isLoadMore) {
                      _this.teamsList = this.teamsList.concat(list)
                    } else {
                      wx.pageScrollTo({
                        scrollTop:0
                      });
                      _this.teamsList = list
                    }
                    _this.isSearch = true;
                    _this.totalNum = res.body.total;
                  }else if (res.messageId == 2001){
                    _this.isLoadMore = false;
                    _this.loadStatus = '';
                    _this.teamsList = [];
                    _this.totalNum = 0
                  }
                }).catch(error => {
                    wx.hideLoading();
                    wx.showToast({
                        icon: "none",
                        title: '网络错误！'
                    });
                    _this.isLoadMore = false;
                    _this.loadStatus = '';
                    _this.teamsList = [];
                    _this.totalNum = 0
                });
            },
            loadWorkType(){
                let _this = this;
                api.getWorkerType().then(res => {
                    if (res.messageId == 1000) {
                        let workerTypes = [];
                        let resBody = res.body;
                        for (let j = 0; j < resBody.length; j++){
                            let obj = {text: '', value: ''};
                            obj.text = resBody[j].name;
                            obj.value = resBody[j].id;
                            workerTypes.push(obj);
                        }
                        _this.workerTypeList = workerTypes;
                    }
                })

            }
        },
        onLoad() {
            // 调用应用实例的方法获取全局数据
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
