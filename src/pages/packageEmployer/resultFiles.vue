<template>
    <div class="container">
        <div class="title">项目概况</div>
        <projectDetail :projectData="projectData"></projectDetail>
        <div class="title">班组概况</div>
        <teamsSimpleInfo :teamList="teamList"></teamsSimpleInfo>
        <div class="title"><span class="red">*</span>相关材料</div>
        <zhUpFile :config='config' :background='require("./static/img/shangchuantupian.png")' :type='1' width='290rpx' height='180rpx' @fileListChange='upImgZ'></zhUpFile>
        <div class="btnBox">
            <a class="button text-space" :class="isActive?'active':''" @click="saveResult">确认</a>
        </div>
    </div>
</template>

<script>
    import api from '../../net/api'
    import util from '../../utils/index'
    import projectDetail from '@/components/employer/project-detail'
    import teamsSimpleInfo from '@/components/employer/teams-simple-info'
    import zhUpFile from "@/components/upLoadFile"

    export default {
        name: "resultFiles",
        components: {projectDetail,teamsSimpleInfo,zhUpFile},
        data(){
            return {
                projectId: '',
                projectData: '',
                teamList: '',
                config: {
                    count:1,                                    // 上传图片张数
                    sizeType: ['original','compressed'],                // original 原图，compressed 压缩图，默认二者都有
                    sourceType: ['album','camera']
                },
                serviceImg: 'jioij'
            }
        },
        methods: {
            //上传图片
            upImgZ(data){
                console.log(data)
            },
            saveResult(){
                if (this.serviceImg.length != 0) {//已上传图片
                    let data = {
                        id: this.projectId,
                        serviceImg: this.serviceImg
                    };
                    api.postProjectTeamsImgSave(data).then((res) => {
                        wx.hideLoading();
                        if (res.messageId == 1000){
                            wx.showToast({
                                icon: "none",
                                title: "材料提交成功！"
                            });
                            //返回到前两页
                            wx.navigateBack({
                                delta: 2,
                                success: function () {
                                    getCurrentPages()[0].onLoad(); // 执行前一个页面的onLoad方法
                                }
                            });
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
                            title: "加载失败，请重试！"
                        });
                    });

                    //待删除------------------------------------------
                    wx.navigateBack({
                        delta: 2,
                        success: function () {
                            getCurrentPages()[0].onLoad(); // 执行前一个页面的onLoad方法
                        }
                    });
                }else {
                    wx.showModal({
                        title: '',
                        content: '请上传引进成功相关材料！',
                        cancelColor: '#AC9BA8',
                        success (res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    });
                }
            },
            loadData(){
                //测试数据-------------------------------待删
                this.projectData = {
                    id: "21aasadsfdds", // 项目id
                    customerId: "21aasadsfddsqwqqw", // 客户id
                    projectName: "重庆大学科技研究院项目", // 项目名称
                    provinceId: 410000, // 省id
                    provinceName: "云南省", // 省名称
                    cityId: 410100, // 市id
                    cityName: "昆明市", // 市名称
                    detailAddr: "重庆医专科技大学校园内", // 详细地址
                    typeId: 12, // 工程类型id
                    typeName: "边坡工程", // 工程类型名称
                    description: "1.抽、排水", // 项目描述
                    endTime: '2021/01/03', // 截止时间:13位时间戳
                    places: 34, // 报名名额
                    files: "http://www.baidu.com" // 单个附件地址
                };

                let data = {
                    id: this.projectId
                };
                wx.showLoading();
                api.postProjectRequirement(data).then((res) => {
                    wx.hideLoading();
                    if (res.messageId == 1000){
                        this.projectData = res.body;
                        this.projectData.endTime = util.formatTime(this.projectData.endTime);
                        this.projectData.createTime = util.formatTime(this.projectData.createTime);
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
                        title: "加载失败，请重试！"
                    });
                });
            },
            loadTeamList(){
                //测试数据-------------------------------待删
                this.teamList =  [
                    {
                        id: "1133221dsds",  // id
                        name: "小飞",   // 名字
                        idCard: "1242232****13232",   // 身份证号码，中间会后端隐藏
                        workType: [  // 招聘工种数组
                            {
                                workTypeId:1221,
                                workTypeName:"钢筋工"
                            },
                            {
                                workTypeId:121,
                                workTypeName:"水泥工"
                            }
                        ]
                    },{
                        id: "1133221dsds",  // id
                        name: "小飞",   // 名字
                        idCard: "1242232****13232",   // 身份证号码，中间会后端隐藏
                        workType: [  // 招聘工种数组
                            {
                                workTypeId:1221,
                                workTypeName:"钢筋工"
                            },
                            {
                                workTypeId:121,
                                workTypeName:"水泥工"
                            }
                        ]
                    }
                ];
                this.teamList.forEach((item,index) => {
                    this.teamList[index].workText = '';
                    for (let j = 0; j < item.workType.length; j++) {
                        if (j == item.workType.length - 1){
                            this.teamList[index].workText += item.workType[j].workTypeName
                        } else {
                            this.teamList[index].workText += item.workType[j].workTypeName + '、'
                        }
                    }
                });



                let data = {
                    id: this.projectId
                };
                wx.showLoading();
                api.postProjectTeamsInfo(data).then((res) => {
                    wx.hideLoading();
                    if (res.messageId == 1000){
                        this.teamList = res.body;

                        this.teamList.forEach((item,index) => {
                            this.teamList[index].workText = '';
                            for (let j = 0; j < item.workType.length; j++) {
                                if (j == item.workType.length - 1){
                                    this.teamList[index].workText += item.workType[j].workTypeName
                                } else {
                                    this.teamList[index].workText += item.workType[j].workTypeName + '、'
                                }
                            }
                        });
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
                        title: "加载失败，请重试！"
                    });
                });
            }
        },
        onLoad(){
            this.projectId = this.$root.$mp.query.id;
            this.loadData();//获取项目信息
            this.loadTeamList();//获取班组概况
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/base";
    .container{
        letter-spacing: 1px;
        padding-bottom: 80px;
        .title{
            font-size: 15px;
            color: @appBtnColor;
            margin: 0 20px;
            border-bottom: 2px solid @blueBgColor;
            box-sizing: border-box;
            margin-top: 20px;
            font-weight: bold;
        }
        .btnBox{
            width: 100%;
            position: fixed;
            bottom: 0;
            height: 40px;
            line-height: 40px;
            background: @appBtnColor;
            color: white;
            font-size: 16px;
            text-align: center;
        }
    }
</style>