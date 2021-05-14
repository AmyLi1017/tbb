<template>
    <div class="container" @click="goToTeamAbility">
        <div class="title">
          <span class="lf">承包能力</span>
          <div class="rt">
            <span class="status" v-if="!info">去填写</span>
            <span class="iconfont iconright"></span>
          </div>
        </div>
        <div class="box" v-if="info">
            <div class="p">
                <span class="text">财务状况：</span>
                <span class="val" v-if="info.financialStatus == 0">未知</span>
                <span class="val" v-if="info.financialStatus == 1">良好</span>
                <span class="val" v-if="info.financialStatus == 2">一般</span>
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
        <empty v-if="!info" :title="emptyTips"></empty>
    </div>
</template>

<script>
import empty from "../empty-item";
    export default {
        name: "team-card-baseInfo1",
        components: {empty},
        props: {
            info: ''
        },
        data() {
          return {
            emptyTips: '信息为空，请先填写信息！'
          }
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
                .status{
                    font-size: 12px;
                    font-weight: normal;
                    display: inline-block;
                    margin-right: 5px;
                }
                .iconright{
                    font-size: 12px;
                }
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
