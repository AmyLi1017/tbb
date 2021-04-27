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
                <sl-filter-team-header
                        :menuList1="projectTypes" :menuList2="provinceList"
                        :menuList3="timeFilter"
                        :val1="typeId" :val2="provinceId"
                        :val3="selTime" :valMulti="cityId"
                        @change="onSelChange"
                ></sl-filter-team-header>
            </div>
        </div>
        <div class="contentBox">
            <div class="totalNum">符合条件的班组共计 <span>{{totalNum}}</span> 条</div>
            <projectList :projectList="projectList" @click="signUp"></projectList>
        </div>
        <loadMore :status="loadStatus"></loadMore>
    </div>
</template>

<script>
    import api from '@/net/api'
    import util from '@/utils/index'
    import store from '@/store/index'
    import loadMore from '@/components/uni-load-more'
    import teamHeaderFilter from '@/components/teamHeader/sl-filter-team-header'
    import SlFilterTeamHeader from "../../components/teamHeader/sl-filter-team-header";
    import projectList from '@/components/teamHeader/project-list'

    export default {
        name: "proPackage",
        components: {SlFilterTeamHeader, loadMore,teamHeaderFilter,projectList},
        data(){
            return {
                isAuthentication: '',//是否实名
                isImg: '',//班组是否有图
                //搜索参数
                keyWord: "",
                provinceId: "",  //省份Id   val2
                cityId: "",      //城市Id   valMulti
                typeId: '',
                endTimeStart: '',
                endTimeEnd: '',
                pageSize: '',
                pageIndex: 1,

                projectList: '',
                totalNum: '',

                isSearch: false,
                isHasMoreData: false,
                tipsText: '到底了，不要再拉了',
                loadStatus:'loading',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
                isLoadMore:false,  //是否加载中

                provinceList: '',
                projectTypes: '',
                timeFilter: [{
                    value: 0,
                    text: '最近三天'
                },{
                    value: 1,
                    text: '最近一周'
                },{
                    value: 2,
                    text: '最近一个月'
                }],
                selTime: ''
            }
        },
        methods: {
            //立即报名
            signUp(id){
                let _this = this;
                //判断实名
                if (this.isAuthentication == 0) {
                    wx.showModal({
                        title: '',
                        content: '您还没有进行实名验证，请先完成实名验证！',
                        cancelColor: '#AC9BA8',
                        confirmText: "立即验证",
                        success (res) {
                            if (res.confirm) {
                                uni.navigateTo({
                                    url: "/pages/packageHeadman/projectDetail?id=" + id //待修改，引导去实名认证----------------
                                })
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    })
                }else {
                    //判断资料是否齐全--有图是否
                    if (this.isImg == 0){
                        wx.showModal({
                            title: '',
                            content: '检测到您当前资料完善度一般，为提升您的报名后成功承包的概率，建议您进一步完善信息！',
                            cancelColor: '#AC9BA8',
                            cancelText: '仍旧报名',
                            confirmText: "完善资料",
                            success (res) {
                                if (res.confirm) {
                                    uni.navigateTo({
                                        url: "/pages/packageHeadman/projectDetail?id=" + id //待修改，引导去资料完善，上传图----------------
                                    })
                                } else if (res.cancel) {
                                    _this.sign(id)
                                }
                            }
                        })
                    }else {
                        wx.showModal({
                            title: '',
                            content: '确认立即报名？',
                            cancelColor: '#AC9BA8',
                            success (res) {
                                if (res.confirm) {
                                    _this.sign(id)
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                }
                            }
                        })
                    }
                }
            },
            //报名
            sign(id){
                let data = {projectRequirementId: id}
                api.postProjectTeamSignUp(data).then(res => {
                    if (res.messageId == 1000) {
                        wx.showToast({
                            title: '报名成功！',
                            icon: 'success',
                            duration: 2000
                        })
                    }else {
                        wx.showToast({
                            title: '网络错误，请重试！',
                            icon: '',
                            duration: 2000
                        })
                    }
                }).catch(res => {
                    wx.showToast({
                        title: '网络错误，请重试！',
                        icon: '',
                        duration: 2000
                    })
                });
            },
            onSearchChange() {
                wx.showLoading({
                    title: '正在搜索'
                });
                this.provinceId = '';
                this.cityId = '';
                this.typeId = '';
                this.endTimeStart = '';
                this.endTimeStart = '';
                this.loadData(false)
            },
            clearSearch() {
                this.keyWord = "";
                this.isSearch = false;
            },
            //跳转到分包名片
            goDetail(id){
                uni.navigateTo({
                    url: "/pages/packageHeadman/projectDetail?id=" + id
                })
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
                console.log(arr)
                this.typeId = arr[0];
                this.provinceId = arr[1];
                this.selTime = arr[2];
                let date = new Date();
                this.endTimeStart = date.getTime();
                switch (arr[2]) {
                    case 0:
                        this.endTimeEnd = this.endTimeStart + 3*24*60*60*1000;
                        break;
                    case 1:
                        this.endTimeEnd = this.endTimeStart + 7*24*60*60*1000;
                        break;
                    case 2:
                        this.endTimeEnd = this.endTimeStart + 30*24*60*60*1000;
                        break;
                }
                this.cityId = arr[3];

                //筛选搜索
                this.doSearch();
            },
            //获取省份
            loadProvinces(){
                let options = [];
                let resOptions = [];
                let _this = this;
                api.postRegion({level: '1',proId: ''}).then(res => {
                    if (res.messageId == 1000) {
                        resOptions = res.body;
                      for(let i = 0,len = resOptions.length; i < len; i++) {
                        let obj = {
                          value: '',
                          text: ''
                        };
                        obj.value = resOptions[i].id;
                        obj.text = resOptions[i].regionName;
                        options.push(obj)
                      }
                      _this.provinceList = options;
                    }
                });
            },
            // 获取工程类型
            loadProjectType(){
              let _this = this;
                api.getProjectType().then(res => {
                    if (res.messageId == 1000) {
                        let projectTypes = [];
                        let body = res.body;
                        for (let i = 0; i < res.body.length; i++){
                            let obj = {};
                            obj.text = body[i].name;
                            obj.value = body[i].id;
                            projectTypes.push(obj);
                        }
                        _this.projectTypes = projectTypes;
                    }
                })
            },
            // 获取list数据
            loadData(isLoadMore) {
              console.log(isLoadMore, this.isHasMoreData)
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
                    typeId: this.typeId,
                    provinceId: this.provinceId,
                    cityId: this.cityId,
                    endTimeStart: this.endTimeStart,
                    endTimeEnd: this.endTimeEnd,
                    pageSize: 20,
                    pageIndex: this.pageIndex,
                };
                api.postProjectSearch(data).then((res) => {
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
                        if (item.endTime){
                            item.endTime = util.formatTime(item.endTime)
                        }
                        return item
                    });
                    if (isLoadMore) {
                        this.projectList = this.projectList.concat(list)
                    } else {
                        wx.pageScrollTo({
                            scrollTop:0
                        });
                        this.projectList = list
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
        },
        onLoad() {
            this.isAuthentication = store.state.user.isAuthentication;
            this.isImg = store.state.user.isImg;
            // 调用应用实例的方法获取全局数据
            this.loadData(false);
            //获取省市
            this.loadProvinces();
            //获取工程类型
            this.loadProjectType();
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
        padding-bottom: 50px;
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
            margin: 10px 0;
            .totalNum{
                padding-left: 30px;
                padding-bottom: 10px;
                font-size: 12px;
                color: @delColor;
                line-height: 1.8;
            }
        }
    }
</style>
