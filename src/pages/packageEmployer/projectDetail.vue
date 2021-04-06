<template>
    <div class="container">
        <div class="content">
            <div class="p">
                <div class="lf name">项目名称</div>
                <div class="rt val">{{projectData.projectName}}</div>
            </div>
            <div class="p">
                <div class="lf name">项目地区</div>
                <div class="rt val">{{projectData.provinceName}}-{{projectData.cityName}}</div>
            </div>
            <div class="p">
                <div class="lf name">详细地址</div>
                <div class="rt val">{{projectData.detailAddr}}</div>
            </div>
            <div class="p">
                <div class="lf name">工程类型</div>
                <div class="rt val">{{projectData.typeName}}</div>
            </div>
            <div class="p">
                <div class="lf name">项目描述</div>
                <div class="rt val">{{projectData.description}}</div>
            </div>
            <div class="p">
                <div class="lf name">截止时间</div>
                <div class="rt val">{{projectData.endTime}}</div>
            </div>
            <div class="p">
                <div class="lf name">报名名额</div>
                <div class="rt val">{{projectData.places}}</div>
            </div>
            <div class="p">
                <div class="lf name">附件信息</div>
                <a class="rt val" :src="projectData.files" :class="projectData.files?'link':'noClick'">详见附件</a>
            </div>
        </div>

    </div>
</template>

<script>
    import api from '../../net/api'
    import util from '../../utils/index'

    export default {
        name: "projectDetail",
        data(){
            return {
                projectId: '',
                projectData: '',
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
                        this.projectData.endTime = util.formatTime(this.projectData.endTime)
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
                });
            }
        },
        onLoad(){
            this.projectId = this.$root.$mp.query.id;
            this.loadData();//获取项目信息
        },
    }
</script>

<style scoped lang="less">
    @import "../../assets/base";

    .content{
        padding: 20px;
        .p:first-child{
            border-top: 1px dashed @bgColor;
        }
        .p{
            display: flex;
            flex-flow: row;
            align-items: center;
            border-bottom: 1px dashed @bgColor;
            color: @appBtnColor;
            letter-spacing: 1px;
            line-height: 1.8;
            padding: 10px 0;
            .lf{
                flex: 1;
            }
            .rt{
                flex: 3;
            }
            .link{
                color: @otherColorB;
            }
            .onClick{
                color: @delColor;
            }
        }
    }
</style>