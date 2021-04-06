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
        </div>
        <loadMore :status="loadStatus"></loadMore>
    </div>
</template>

<script>
    import slFilter from '@/components/sl-filter'
    import slFilterMulti from '@/components/sl-filter-multi'
    import api from '@/net/api'
    import loadMore from '@/components/uni-load-more'
    import teamList from '@/components/teamList'

    export default {
        name: "readProject",
        components: {slFilter,slFilterMulti,loadMore,teamList},
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
                //测试数据-----------------------------------------待删除
                this.provinceList = [
                    {
                        text: '云南省',
                        value: 450000
                    },
                    {
                        text: '浙江省',
                        value: 651654
                    }
                ];

                //获取省份
                let options = [];
                let resOptions = [];
                api.postRegion({level: '',proId: ''}).then(res => {
                    if (res.messageId == 1000) {
                        resOptions = res.body;
                    }
                });

                //测试数据-----------------------------待注释
                resOptions = [{
                    id: 450000, //行政区id
                    regionName: "云南省", //行政区名称
                    provinceSimple: "滇", // 省简称
                    level: 1 //等级:1省,2市,3区县
                }, {
                    id: 651654, //行政区id
                    regionName: "浙江省", //行政区名称
                    provinceSimple: "浙", // 省简称
                    level: 1 //等级:1省,2市,3区县
                }
                ];

                for(let i = 0,len=resOptions.length; i < len; i++) {
                    let obj = {
                        value: '',
                        text: ''
                    };
                    obj.value = resOptions[i].id;
                    obj.text = resOptions[i].regionName;

                    options.push(obj)
                }
                console.log('provinceList');
            },
            loadData(isLoadMore) {
                //测试数据，带注释 -------------------------------------------------
                this.teamsList = [{
                    customerId: "1sdsewweweew", // 客户id，32位字符串
                    icon: "../pages/packageEmployer/static/img/starUser2.jpg", // 头像
                    name: "小飞", // 姓名
                    isAuthentication: 1, // 是否实名:0否,1是
                    provinceName: "重庆市", // 省名称
                    cityName: "江北区", // 市名称
                    population: 22, // 队伍人数
                    applyStatus: 1, // 求职状态:0未知,1找工作中,2观察中
                    projectName: "万科西城项目一期土石方", // 最近工程
                    mainEnterprise: "重庆建工第三建筑有限公司", // 总包单位
                    workContent: "地坪、抹灰、砌砖", // 工作内容
                    teamSearchWorkTypeResponseList: [ // 工种列表
                        {
                            workTypeId: 1,   // 工种id
                            workTypeName: "架子工"},   // 工种名称
                        {
                            workTypeId: 1,
                            workTypeName: "木工"
                        }
                    ]
                },{
                    customerId: "1sdsewweweew", // 客户id，32位字符串
                    icon: "../pages/packageEmployer/static/img/starUser2.jpg", // 头像
                    name: "小飞", // 姓名
                    isAuthentication: 1, // 是否实名:0否,1是
                    provinceName: "重庆市", // 省名称
                    cityName: "江北区", // 市名称
                    population: 22, // 队伍人数
                    applyStatus: 1, // 求职状态:0未知,1找工作中,2观察中
                    projectName: "万科西城项目一期土石方", // 最近工程
                    mainEnterprise: "重庆建工第三建筑有限公司", // 总包单位
                    workContent: "地坪、抹灰、砌砖", // 工作内容
                    teamSearchWorkTypeResponseList: [ // 工种列表
                        {
                            workTypeId: 1,   // 工种id
                            workTypeName: "架子工"},   // 工种名称
                        {
                            workTypeId: 1,
                            workTypeName: "木工"
                        }
                    ]
                }];

                console.log(this.teamsList,"this.teamsList");

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
                console.log(data,'data');
                api.postTeamsSearch(data).then((res) => {
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
                        return item
                    });

                    if (isLoadMore) {
                        this.teamsList = this.teamsList.concat(list)
                    } else {
                        wx.pageScrollTo({
                            scrollTop:0
                        });
                        this.teamsList = list
                    }

                    this.isSearch = true;
                    this.totalNum = res.body.total;
                    console.log(this.teamsList)
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
                //测试数据-----------------------------------------待删除
                this.workerTypeList = [
                    {
                        text: '架子工',
                        value: 0
                    },
                    {
                        text: '抹灰工',
                        value: 1
                    },
                    {
                        text: '钢筋工',
                        value: 2
                    }
                ]

                console.log(this.workerTypeList,"this.workerTypeList");

                api.getWorkerType().then(res => {
                    if (res.messageId == 1000) {
                        let workerTypes = [];
                        let body = res.body;
                        for (let i; i < res.body.length; i++){
                            let obj = {text: '', value: ''};
                            obj.text = body[i].id;
                            obj.value = body[i].name;
                            workerTypes.push(obj);
                        }
                        _this.workerTypeList.push(workerTypes);
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