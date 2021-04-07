<template>
    <div class="container">
        <div class="title">承包能力</div>
        <div class="p">
            <span class="text">守信承诺：</span>
            <span class="val">{{info.commitment}}</span></div>
        <div class="p">
            <span class="text">财务状况：</span>
            <span class="val" v-if="info.financialStatus == 0">未知</span>
            <span class="val" v-if="info.financialStatus == 1">良好</span>
            <span class="val" v-if="info.financialStatus == 2">一般</span>
        </div>
        <div class="p">
            <span class="text">材料证明：</span>
        </div>
        <div class="imgBox">
            <img v-for="(item,index) in info.files" :src="item" mode="widthFix">
        </div>
    </div>
</template>

<script>
    export default {
        name: "team-card-baseInfo1",
        props: {
            info: ''
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/base";

    .container{
        .title{
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            color: @fontColor;
        }
        .p{
            display: flex;
            flex-flow: row;
            align-items: normal;
            .text{
                flex: 1;
            }
            .val{
                flex: 3;
                box-sizing: border-box;
            }
        }
        .imgBox{
            display: flex;
            flex-flow: wrap;
            img{
                display: inline-block;
                width: 33.3%;
                padding: 10px;
                box-sizing: border-box;
                border-radius: 4px;
            }
        }
    }
</style>
