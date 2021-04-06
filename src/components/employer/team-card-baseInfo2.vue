<template>
    <div class="container">
        <div class="title">项目经验</div>
        <div class="proBox" v-for="(item,index) in projectList">
            <div class="p">
                <span class="text">项目名称：</span>
                <span class="val">{{item.projectName}}</span>
            </div>
            <div class="p">
                <span class="text">总包单位：</span>
                <span class="val">{{item.mainEnterprise}}</span>
            </div>
            <div class="p" v-if="item.contractAmount">
                <span class="text">承包金额：</span>
                <span class="val">{{item.contractAmount}}万元</span>
            </div>
            <div class="p">
                <span class="text">工作内容：</span>
                <span class="val">{{item.workContent}}</span>
            </div>
            <div class="p">
                <span class="text">材料证明：</span>
            </div>
            <div class="imgBox">
                <img v-for="(imgItem,index) in item.files" :src="imgItem" mode="widthFix">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "team-card-baseInfo2",
        props: {
            projectList: ''
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/base";
    .container{
        .proBox{
            margin-top: 15px;
            border-bottom: 1px dashed @blueBgColor;
        }
        .proBox:last-child{
            border-bottom: none;
        }
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