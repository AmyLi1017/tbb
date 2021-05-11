<template>
    <div class="container">
        <div class="title">项目概况</div>
        <projectDetail :projectData="projectData"></projectDetail>
        <div class="title">班组概况</div>
        <teamsSimpleInfo :teamList="teamList"></teamsSimpleInfo>
        <div class="title">相关材料</div>
        <div class="imgBox">
            <img v-for="(item,index) in projectImgs" :src="item" mode="widthFix">
        </div>
    </div>
</template>

<script>
    import api from '@/net/api'
    import util from '@/utils/index'
    import projectDetail from '@/components/employer/project-detail'
    import teamsSimpleInfo from '@/components/employer/teams-simple-info'

    export default {
        name: "projectLastResult",
        components: {projectDetail,teamsSimpleInfo},
        data(){
            return {
                projectId: '',
                teamList: '',
                projectData: '',
                projectImgs: []
            }
        },
        methods: {
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
                    createTime: '2021/01/02',
                    endTime: '2021/01/03', // 截止时间:13位时间戳
                    suitTime: '2021/01/04',
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
                        this.projectData.suitTime = util.formatTime(this.projectData.suitTime);
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
            },
            loadProjectImg(){
                this.projectImgs = [
                    "../../../static/imgs/starUser2.jpg",
                    "../../../static/imgs/starUser2.jpg",
                    "../../../static/imgs/starUser2.jpg",
                    "../../../static/imgs/starUser2.jpg",
                    "../../../static/imgs/starUser2.jpg"
                ];

                let data = {
                    id: this.projectId
                };
                wx.showLoading();
                api.postProjectTeamsImg(data).then((res) => {
                    wx.hideLoading();
                    if (res.messageId == 1000){
                        this.projectImgs = res.body;
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
            this.loadTeamList();//获取班组结果
            this.loadProjectImg();//获取项目资料信息
        }
    }
</script>

<style scoped lang="less">
    @import "../../../assets/base";
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
        .imgBox{
            display: flex;
            flex-flow: wrap;
            margin: 0 10px;
            img{
                display: inline-block;
                width: 33.3%;
                padding: 10px;
                box-sizing: border-box;
                border-radius: 4px;
            }
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
