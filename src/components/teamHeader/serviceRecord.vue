<template>
    <div class="container">
        <div class="tabTop">
            <div class="lf" @click="tabType(0)"><span class="stop" :class="listType == 0?'active':''">全部</span></div>
            <div class="rt" @click="tabType(1)"><span class="stop" :class="listType == 1?'active':''">主动报名</span></div>
            <div class="rt" @click="tabType(2)"><span class="stop" :class="listType == 2?'active':''">邀请报名</span></div>
        </div>
        <div class="listBox">
            <serviceRecordList :listData="listData" :listType="listType" @click="stateChange"></serviceRecordList>
            <!--<serviceRecordList :listData="listData" :listType="listType" @click="publishStateChange"></serviceRecordList>-->
        </div>
        <loadMore :status="loadStatus"></loadMore>
    </div>
</template>

<script>
    import serviceRecordList from '@/components/teamHeader/team-service-record'
    import loadMore from '@/components/uni-load-more'
    import api from '@/net/api'

    export default {
        name: "serviceRecord",
        components: {serviceRecordList,loadMore},
        data(){
            return {
                listType: 1,//1为主动，2为邀请，0为全部
                listData: '',

                pageSize: '',
                pageIndex: 1,
                isHasMoreData: false,
                tipsText: '到底了，不要再拉了',
                loadStatus:'loading',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
                isLoadMore:false,  //是否加载中
            }
        },
        methods: {
            tabType(type){
                if (this.listType != type) {
                    this.listType = type;
                    this.loadData();
                }
            },
            stateChange(type,id){
                let _this = this;
                switch (type) {
                    case 0://删除
                        wx.showModal({
                            title: '',
                            content: '确认删掉该条记录吗？',
                            success (res) {
                                if (res.confirm) {
                                    let data = {id: id,};
                                    api.postTeamServiceDelete(data).then((res) => {
                                        wx.hideLoading();
                                        if (res.messageId == 1000){
                                            _this.loadData();//重新加载数据
                                        }else {
                                            wx.showToast({
                                                icon: "none",
                                                title: "网络错误，请重试！"
                                            });
                                        }
                                    }).catch(error => {
                                        wx.hideLoading();
                                        wx.showToast({
                                            icon: "none",
                                            title: "网络错误，请重试！"
                                        });
                                    });
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                }
                            }
                        });
                        break;
                    case 1://查看结果
                        uni.navigateTo({
                            url: "/pages/main/serverList/projectLastResult?id=" + id
                        });
                        break;
                    case 2://立即报名
                        wx.showModal({
                            title: '',
                            content: '确认立即报名吗？',
                            cancelColor: '#AC9BA8',
                            success (res) {
                                if (res.confirm) {
                                    let data1 = {projectRequirementId: id};
                                    api.postTeamServiceSign(data1).then((res) => {
                                        wx.hideLoading();
                                        if (res.messageId == 1000){
                                            _this.loadData();//重新加载数据
                                        }else {
                                            wx.showToast({
                                                icon: "none",
                                                title: "网络错误，请重试！"
                                            });
                                        }
                                    }).catch(error => {
                                        wx.hideLoading();
                                        wx.showToast({
                                            icon: "none",
                                            title: "网络错误，请重试！"
                                        });
                                    });
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                }
                            }
                        });
                        break;
                }
            },

            loadData(isLoadMore) {
                //测试数据，带注释 -------------------------------------------------
                if (this.listType == 1) {//主动
                    this.listData = [{
                        id: 1, // 报名id
                        customerId: "1sdsewweweew", // 客户id，32位字符串
                        projectId: "1sdsewweweew", // 项目id
                        projectName: "项目名项目名项目名项目名1", // 项目名
                        provinceId: 140000,  // 省id
                        provinceName: "重庆市",   // 省名称
                        cityId: 140100,  // 市id
                        cityName: "渝北区",  // 市名称
                        typeId: 12,  // 项目类型id
                        typeName: "边坡工程",   // 项目类型名称
                        endTime: 1232444343435,  // 截止时间:13位时间戳
                        signWay: 1, // 报名方式:0未知,1主动,2邀请
                        isSign: 1, // 是否报名成功:0否,1是
                        isSuit: 0,  // 是否合适:0否,1是
                        recommendStatus: 0 // 引进状态:0未引进,1成功,2失败
                    },{
                        id: 1, // 报名id
                        customerId: "1sdsewweweew", // 客户id，32位字符串
                        projectId: "1sdsewweweew", // 项目id
                        projectName: "项目名项目名项目名项目名1", // 项目名
                        provinceId: 140000,  // 省id
                        provinceName: "重庆市",   // 省名称
                        cityId: 140100,  // 市id
                        cityName: "渝北区",  // 市名称
                        typeId: 12,  // 项目类型id
                        typeName: "边坡工程",   // 项目类型名称
                        endTime: 1232444343435,  // 截止时间:13位时间戳
                        signWay: 1, // 报名方式:0未知,1主动,2邀请
                        isSign: 1, // 是否报名成功:0否,1是
                        isSuit: 1,  // 是否合适:0否,1是
                        recommendStatus: 1 // 引进状态:0未引进,1成功,2失败
                    }
                    ];
                }else if(this.listType == 2){//邀请
                    this.listData = [{
                        id: 1, // 报名id
                        customerId: "1sdsewweweew", // 客户id，32位字符串
                        projectId: "1sdsewweweew", // 项目id
                        projectName: "项目名项目名项目名项目名1", // 项目名
                        provinceId: 140000,  // 省id
                        provinceName: "重庆市",   // 省名称
                        cityId: 140100,  // 市id
                        cityName: "渝北区",  // 市名称
                        typeId: 12,  // 项目类型id
                        typeName: "边坡工程",   // 项目类型名称
                        endTime: 1232444343435,  // 截止时间:13位时间戳
                        signWay: 2, // 报名方式:0未知,1主动,2邀请
                        isSign: 0, // 是否报名成功:0否,1是
                        isSuit: 1,  // 是否合适:0否,1是
                        recommendStatus: 0 // 引进状态:0未引进,1成功,2失败
                    },{
                        id: 1, // 报名id
                        customerId: "1sdsewweweew", // 客户id，32位字符串
                        projectId: "1sdsewweweew", // 项目id
                        projectName: "项目名项目名项目名项目名1", // 项目名
                        provinceId: 140000,  // 省id
                        provinceName: "重庆市",   // 省名称
                        cityId: 140100,  // 市id
                        cityName: "渝北区",  // 市名称
                        typeId: 12,  // 项目类型id
                        typeName: "边坡工程",   // 项目类型名称
                        endTime: 1232444343435,  // 截止时间:13位时间戳
                        signWay: 2, // 报名方式:0未知,1主动,2邀请
                        isSign: 1, // 是否报名成功:0否,1是
                        isSuit: 1,  // 是否合适:0未知,1合适,2不合适,3确认
                        recommendStatus: 0 // 引进状态:0未引进,1成功,2失败
                    }
                    ];
                }else if(this.listType == 0){//全部
                    this.listData = [{
                        id: 1, // 报名id
                        customerId: "1sdsewweweew", // 客户id，32位字符串
                        projectId: "1sdsewweweew", // 项目id
                        projectName: "项目名项目名项目名项目名1", // 项目名
                        provinceId: 140000,  // 省id
                        provinceName: "重庆市",   // 省名称
                        cityId: 140100,  // 市id
                        cityName: "渝北区",  // 市名称
                        typeId: 12,  // 项目类型id
                        typeName: "边坡工程",   // 项目类型名称
                        endTime: 1232444343435,  // 截止时间:13位时间戳
                        signWay: 2, // 报名方式:0未知,1主动,2邀请
                        isSign: 0, // 是否报名成功:0否,1是
                        isSuit: 1,  // 是否合适:0否,1是
                        recommendStatus: 0 // 引进状态:0未引进,1成功,2失败
                    },{
                        id: 1, // 报名id
                        customerId: "1sdsewweweew", // 客户id，32位字符串
                        projectId: "1sdsewweweew", // 项目id
                        projectName: "项目名项目名项目名项目名1", // 项目名
                        provinceId: 140000,  // 省id
                        provinceName: "重庆市",   // 省名称
                        cityId: 140100,  // 市id
                        cityName: "渝北区",  // 市名称
                        typeId: 12,  // 项目类型id
                        typeName: "边坡工程",   // 项目类型名称
                        endTime: 1232444343435,  // 截止时间:13位时间戳
                        signWay: 2, // 报名方式:0未知,1主动,2邀请
                        isSign: 1, // 是否报名成功:0否,1是
                        isSuit: 0,  // 是否合适:0否,1是
                        recommendStatus: 0 // 引进状态:0未引进,1成功,2失败
                    }
                    ];
                }


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
                    signWay: this.listType,
                    pageSize: '',
                    pageIndex: 1,
                };
                // console.log(data,'data');
                api.postTeamServiceList(data).then((res) => {
                    wx.hideLoading();
                    if (res.messageId == 1000){
                        if (res.body.pageTotal == this.pageIndex) {
                            this.isHasMoreData = false;
                            this.isLoadMore = true;
                            this.loadStatus = 'nomore'
                        } else {
                            this.isHasMoreData = true;
                            this.isLoadMore = false
                        }

                        if (isLoadMore) {
                            this.listData = this.listData.concat(list)
                        } else {
                            wx.pageScrollTo({
                                scrollTop:0
                            });
                            this.listData = list
                        }
                    }else {
                        wx.showToast({
                            icon: "none",
                            title: "加载失败，请重试！"
                        });
                    }
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
        mounted(){
            this.loadData();//获取用户发布列表
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
        padding: 0 15px 15px;
        color: @appBtnColor;
        letter-spacing: 1px;
        .tabTop{
            display: flex;
            flex-flow: row;
            align-items: center;
            font-size: 14px;
            color: @delColor;
            margin: 0 0 20px 0;
            border-bottom: 1px dashed @bgColor;
            text-align: center;
            .lf{
                flex: 1;
                box-sizing: border-box;
                padding: 10px;
                span{
                    display: inline-block;
                }
                .active{
                    color: @otherColorR;
                    border-bottom: 2px solid @otherColorR;
                }
            }
            .rt{
                flex: 1;
                box-sizing: border-box;
                padding: 10px;
                span{
                    display: inline-block;
                }
                .active{
                    color: @otherColorR;
                    border-bottom: 2px solid @otherColorR;
                }
            }
        }
    }
</style>