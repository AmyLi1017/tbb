<template>
    <div class="container">
        <div class="listBox" v-for="(item,index) in listData">
            <div class="content" @click="goToDetail(item.projectId)">
                <div class="box">
                    <div class="item">{{item.projectName}}</div>
                    <div class="item rt">{{item.provinceName}}-{{item.cityName}}</div>
                </div>
                <div class="box">
                    <div class="item">{{item.typeName}}</div>
                    <div class="item rt">2020-12-21</div>
                </div>
                <div class="box">
                    <div class="item" v-if="item.signWay == 1">主动报名</div>
                    <div class="item" v-if="item.signWay == 2">邀请报名</div>
                    <div class="item center" v-if="item.isSign == 0">未报名</div>
                    <div class="item center" v-if="item.isSign == 1">已报名</div>
                    <div class="item rt" v-if="item.isSign == 0">-</div>
                    <div class="item rt" v-if="item.isSuit == 3 && item.isSign == 1">确认</div>
                    <div class="item rt" v-if="item.isSuit == 2 && item.isSign == 1">不合适</div>
                    <div class="item rt" v-if="item.isSuit == 1 && item.isSign == 1">合适</div>
                </div>
            </div>
            <div class="btn">
                <div class="btnItem" @click="changeStatus(0,item.id)">删除</div>
                <div class="btnItem" v-if="item.recommendStatus != 0" @click="changeStatus(1,item.projectId)">查看结果</div>
                <div class="btnItem del" v-if="item.recommendStatus == 0 && item.isSign != 0">未结束</div>
                <div class="btnItem" v-if="item.recommendStatus == 0 && item.isSign == 0" @click="changeStatus(2,item.projectId)">立即报名</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "team-service-record",
        props: {
            listData: '',
            listType: ''
        },
        methods: {
            changeStatus(type,id){//type，0：删除，1：查看结果，2：立即报名
                this.$emit('click',type,id)
            },
            goToDetail(id){
                uni.navigateTo({
                    url: "/pages/packageEmployer/projectDetail?id=" + id
                })
            },
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/base";
    .listBox{
        box-sizing: border-box;
        margin-bottom: 15px;
        box-shadow: 2px 2px 10px @bgColor;
        border-radius: 8px;
        .content{
            padding: 15px;
            .box{
                display: flex;
                flex-flow: row;
                align-items: center;
                .item{
                    flex: 1;
                }
                .rt{
                    text-align: right;
                }
                .center{
                    text-align: center;
                }
            }
        }
        .btn{
            display: flex;
            flex-flow: row;
            align-items: center;
            text-align: center;
            color: @otherColorB;
            line-height: 35px;
            border-top: 1px dashed @bgColor;
            .btnItem{
                flex: 1;
            }
            .del{
                color: @delColor;
            }
        }
    }
</style>
