<template>
    <div class="container">
        <div class="listBox" v-for="(item,index) in listData">
            <div class="content" @click="goToDetail(item.id)">
                <div class="p">
                    <div class="lf name">服务类型</div>
                    <div class="rt val">班组引进</div>
                </div>
                <div class="p">
                    <div class="lf name">项目名称</div>
                    <div class="rt val">{{item.projectName}}</div>
                </div>
                <div class="p">
                    <div class="lf name">班组类型</div>
                    <div class="rt val">{{item.typeName}}</div>
                </div>
                <div class="p">
                    <div class="lf name">发布状态</div>
                    <div class="rt val">
                        <span v-if="listType == 1">发布中</span>
                        <span v-if="listType == 0">已截止</span>
                    </div>
                </div>
            </div>
            <div class="btnBox" v-if="listType == 1">
                <div><span class="btn" @click="goToTeamList(item.id)">{{item.signPersons}}人报名</span></div>
                <div class="row">
                    <span class="btn stop" @click="clickPublish(0,item.id)">停止发布</span>
                    <span class="toTop" v-if="listType == 1" @click="clickPublish(1,item.id)"><span class="iconfont iconicon_top"></span></span>
                </div>

            </div>
            <div class="btnBox" v-if="listType == 0">
                <div><span class="btn" @click="goToTeamList(item.id)">{{item.signPersons}}人报名</span></div>
                <div>
                    <span class="btn stop" v-if="item.recommendStatus == 0" @click="goToResultCheck(item.id)">结果确认</span>
                    <span class="btn success" v-if="item.recommendStatus == 1" @click="goToResult(item.id)">引进成功</span>
                    <span class="btn del" v-if="item.recommendStatus == 2">引进失败</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "service-record-list",
        props: {
            listData: '',
            listType: ''
        },
        methods: {
            clickPublish(type,id){
                this.$emit('click',type,id)//0：停止发布，1：置顶，2：引进失败
            },
            goToResultCheck(id){
                let _this = this;
                wx.showModal({
                    content: '是否成功 引进班组',
                    cancelText: '否',
                    confirmText: '是',
                    cancelColor: '#AC9BA8',
                    success (res) {
                        if (res.confirm) {
                            uni.navigateTo({
                                url: "/pages/packageEmployer/resultCheck?id=" + id
                            })
                        } else if (res.cancel) {
                            wx.showModal({
                                content: '感谢使用，期待下次为您服务！',
                                cancelText: '返回',
                                confirmText: '关闭',
                                cancelColor: '#AC9BA8',
                                success (res) {
                                    if (res.confirm) {
                                        _this.clickPublish(2,id)
                                    } else if (res.cancel) {
                                        _this.clickPublish(2,id)
                                    }
                                }
                            })
                        }
                    }
                })

            },
            goToDetail(id){
                uni.navigateTo({
                    url: "/pages/packageEmployer/projectDetail?id=" + id
                })
            },
            goToResult(id){
                uni.navigateTo({
                    url: "/pages/main/serverList/projectLastResult?id=" + id
                });
            },
            goToTeamList(id){
                uni.navigateTo({
                    url: "/pages/packageEmployer/projectRecordList?id=" + id + '&type=' + this.listType
                })
            }
        },
        mounted(){
            console.log(this.listType,'listType')
        },
    }
</script>

<style scoped lang="less">
    @import "../../assets/base";
    .listBox{
        padding-bottom: 10px;
        margin-bottom: 10px;
        .content{
            padding: 15px;
            border-radius: 10px;
            box-shadow: 2px 2px 10px @bgColor;
            position: relative;
            .p{
                display: flex;
                flex-flow: row;
                align-items: center;
                .lf{
                    flex: 1;
                }
                .rt{
                    flex: 3;
                }
            }
        }
        .btnBox{
            display: flex;
            flex-flow: row;
            align-items: center;
            margin-top: 15px;
            div{
                flex: 1;
                font-size: 12px;
                text-align: center;
                .btn{
                    color: @otherColorR;
                }
                .stop{
                    display: inline-block;
                    padding: 2px 8px;
                    color: white;
                    background: @blueBgColor;
                    border-radius: 4px;
                }
                .del{
                    color: @delColor;
                }
                .success{
                    color: @otherColorY;
                }
            }
            .row{
                position: relative;
                .toTop{
                    position: absolute;
                    right: 5px;
                    top: 0;
                    display: inline-block;
                    font-size: 11px;
                    color: @fontColor;
                    text-align: center;
                    background: @bgColor;
                    width: 28px;
                    height: 28px;
                    line-height: 28px;
                    border-radius: 7px;
                    z-index: 100;
                    .iconfont{
                        font-size: 18px;
                    }
                }
            }

        }
    }
</style>
