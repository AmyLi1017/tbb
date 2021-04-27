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
                        :menuList1="workerTypeList" :menuList2="provinceList"
                        :val1="workType" :val2="provinceId"
                        :valMulti="cityId"
                        @change="onSelChange"
                ></slFilter>
            </div>
        </div>
        <div class="contentBox">
            <div class="totalNum">符合条件的班组共计 <span>{{totalNum}}</span> 条</div>
            <workList :workLists="workLists" @click="goDetail"></workList>
        </div>
        <loadMore :status="loadStatus"></loadMore>
    </div>
</template>

<script>
    import api from '@/net/api'
    import util from '@/utils/index'
    import store from '@/store/index'
    import loadMore from '@/components/uni-load-more'
    import slFilter from '@/components/staff/sl-filter-staff'
    import workList from '@/components/staff/work-list'

    export default {
        name: "goodJobs",
        components: {loadMore,slFilter,workList},
        data(){
            return {
                isAuthentication: '',//是否实名
                isImg: '',//班组是否有图
                //搜索参数
                keyWord: "",
                provinceId: "",  //省份Id   val2
                cityId: "",      //城市Id   valMulti
                workType: '',
                pageSize: 20,
                pageIndex: 1,

                workLists: '',
                totalNum: '',

                isSearch: false,
                isHasMoreData: false,
                tipsText: '到底了，不要再拉了',
                loadStatus:'loading',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
                isLoadMore:false,  //是否加载中


                provinceList: [],//地区筛选项
                citiesList: [],//地区筛选项
                workerTypeList: [],//工种筛选项
            }
        },
        methods: {
            onSearchChange() {
                wx.showLoading({
                    title: '正在搜索'
                });
                this.provinceId = '';
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
                this.workType = arr[0];
                this.provinceId = arr[1];
                this.cityId = arr[2];

                //筛选搜索
                this.doSearch();
            },

            //跳转到招聘详情
            goDetail(id){
                uni.navigateTo({
                    url: "/pages/packageStaff/workDetail?id=" + id
                })
            },

            loadProvinces(){
                //获取省份
                let options = [];
                let resOptions = [];
                let _this = this;
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
                      _this.provinceList = options
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
                    provinceId: this.provinceId,
                    cityId: this.cityId,
                    workType: this.workType,
                    pageSize: '',
                    pageIndex: 1,
                };
                api.postStaffWorkList(data).then((res) => {
                    wx.hideLoading();
                    if (res.body.pageTotal == this.pageIndex) {
                        this.isHasMoreData = false;
                        this.isLoadMore = true;
                        this.loadStatus = 'nomore'
                    } else {
                        this.isHasMoreData = true;
                        this.isLoadMore = false
                    }
                    let list = res.body.data.map(item => {
                        item.workTypeText = ''
                        if (item.workerRequirementWorkTypeList.length > 0 ){
                           item.workerRequirementWorkTypeList.forEach((i,index) => {
                               if (index == item.workerRequirementWorkTypeList.length - 1) {
                                   item.workTypeText += i.workTypeName
                               }else {
                                   item.workTypeText += i.workTypeName + '、'
                               }
                           })
                        }
                        return item
                    });

                    if (isLoadMore) {
                        this.workLists = this.workLists.concat(list)
                    } else {
                        wx.pageScrollTo({
                            scrollTop:0
                        });
                        this.workLists = list
                    }
                    this.isSearch = true;
                    this.totalNum = res.body.total;

                }).catch(error => {
                    wx.hideLoading();
                    wx.showToast({
                        icon: "none",
                        title: error
                    });
                    this.isLoadMore = false;
                    this.loadStatus = ''
                });
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
                        _this.workerTypeList = (workerTypes);
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
