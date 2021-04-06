<template>
    <div class="container">
        <div class="title">
            <span class="lf">个人信息</span>
            <div class="rt">
                <span class="status" v-if="info.applyStatus == 1">找工作中</span>
                <span class="status" v-if="info.applyStatus == 2">观察中</span>
                <span class="iconfont iconright"></span>
            </div>
        </div>
        <div class="p">
            <span class="text">工&nbsp;作&nbsp;年&nbsp;限：</span>
            <span class="val">{{info.workYear}}年</span>
        </div>
        <div class="p">
            <span class="text">期望工作地：</span>
            <span class="val">{{info.provinceName}}-{{info.cityName}}</span>
        </div>
        <div class="p">
            <span class="text">身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;份：</span>
            <span class="val" v-if="info.position == 0">未知</span>
            <span class="val" v-if="info.position == 1">工人</span>
        </div>
        <div class="p">
            <span class="text">工&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;种：</span>
            <span class="val">{{info.workTypeList}}</span>
        </div>
        <div class="p">
            <span class="text">自&nbsp;我&nbsp;介&nbsp;绍：</span>
            <span class="val">{{info.description}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "staff-card-info2",
        props: {
            info: ''
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/base";
    .container{
        padding: 13px;
        .title{
            font-size: 15px;
            font-weight: bold;
            color: @fontColor;
            display: flex;
            flex-flow: row;
            align-items: center;
            .lf{
                flex: 2;
            }
            .rt{
                flex: 1;
                text-align: right;
                color: @delColor;
                .status{
                    font-size: 12px;
                    font-weight: normal;
                    display: inline-block;
                    margin-right: 5px;
                }
            }
        }
        .p{
            display: flex;
            flex-flow: row;
            align-items: center;
            .text{
                flex: 3;
            }
            .val{
                flex: 8;
                padding-left: 10px;
                box-sizing: border-box;
            }
        }
    }
</style>