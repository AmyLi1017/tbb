<template>
    <div class="container">
        <div class="left"><img :src="info.icon" mode="widthFix"></div>
        <div class="middle">
            <div class="p">
                <span>{{info.name}}</span>
                <span class="tips" v-if="info.isAuthentication == 1">已实名</span>
            </div>
            <div class="p">
                <span v-if="info.sex==1">男</span>
                <span v-if="info.sex==0">女</span>
                <span>{{info.nationName}}</span>
                <span>{{info.age}}岁</span>
            </div>
            <div class="p">
                <span>找活状态：</span>
                <span v-if="applyStatus == 1">正在找活</span>
                <span v-if="applyStatus == 2">观察中</span>
            </div>
        </div>
        <div class="right" v-if="!hideShare">
            <span class="iconfont iconshare"></span>
            <span>分享</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "team-card-info1",
        props: {
            info: '',
            applyStatus: '',
            hideShare: ''
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/base";

    .container{
        display: flex;
        flex-flow: row;
        align-items: center;
        .left{
            flex: 1;
            padding: 15px;
            box-sizing: border-box;
            text-align: center;
            img{
                display: inline-block;
                width: 98%;
                border-radius: 8px;
            }
        }
        .middle{
            flex: 3;
            padding: 13px 0 10px 0;
            line-height: 1.8;
            .tips{
                background: @otherColorY;
                color: white;
                display: inline-block;
                vertical-align: middle;
                padding: 0 5px;
                border-radius: 4px;
                margin-left: 10px;
            }
            .p>span{
                display: inline-block;
                margin: 0 8px;
            }
        }
        .right{
            flex: 1;
            .iconfont{
                font-size: 22px;
                font-weight: bold;
            }
        }
    }
</style>