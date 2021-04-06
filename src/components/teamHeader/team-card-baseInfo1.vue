<template>
    <div class="container" @click="goToTeamAbility">
        <div class="title"><span class="lf">承包能力</span><span class="rt iconfont iconright"></span></div>

        <div class="p">
            <span class="text">财务状况：</span>
            <span class="val" v-if="info.financial_status == 0">未知</span>
            <span class="val" v-if="info.financial_status == 1">良好</span>
            <span class="val" v-if="info.financial_status == 2">一般</span>
        </div>
        <div class="p">
            <span class="text">材料证明：</span>
            <span class="val" v-if="info.files && info.files.length > 0">{{info.files.length}}张图</span>
        </div>
        <div class="p">
            <span class="text">守信承诺：</span>
            <span class="val">{{info.commitment}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "team-card-baseInfo1",
        props: {
            info: ''
        },
        methods: {
            goToTeamAbility(){
                uni.navigateTo({
                    url: '/pages/main/my/teamAbility'
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/base";

    .container{
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
            }
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