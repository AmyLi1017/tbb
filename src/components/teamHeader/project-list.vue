<template>
    <div class="container">
        <div class="listBox" v-for="(item,index) in projectList" :key="index">
            <div class="content" @click="goToDetail(item.id)">
                <div class="box">
                    <div class="item bold">{{item.projectName}}</div>
                    <div class="item rt">{{item.provinceName}}<span v-if="item.cityName">-{{item.cityName}}</span></div>
                </div>
                <div class="box">
                    <div class="item del">{{item.typeName}}</div>
                    <div class="item rt del">{{item.endTime}}</div>
                </div>
                <div class="box">
                    <div class="item del" v-if="item.recommendStatus == 0">已有{{item.signPerson}}人报名</div>
                    <div class="item del" v-if="item.recommendStatus == 1 || item.recommendStatus == 2">共有{{item.signPerson}}人报名</div>
                    <div class="item rt del" v-if="item.signStatus == 0">报名未满</div>
                    <div class="item rt del" v-if="item.signStatus == 1">报名已满</div>
                </div>
            </div>
            <div class="btnBox">
                <div class="item">{{item.name}}</div>
                <div class="itemS">{{item.enterpriseName}}</div>
                <div class="item rt" v-if="item.signStatus == 0 && item.recommendStatus == 0" @click="signUp(item.id)">立即报名</div>
                <div class="item rt del" v-if="item.recommendStatus == 1 || item.recommendStatus == 2">已结束</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "project-list",
        props: {
            projectList: ''
        },
        methods: {
            goToDetail(id){
                uni.navigateTo({
                    url: "/pages/packageHeadman/projectDetail?id=" + id
                })
            },
            signUp(id){
                this.$emit('click',id)
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/base";
    .listBox{
        margin: 0 15px;
        border-radius: 8px;
        box-shadow: 2px 2px 10px @bgColor;
        margin-bottom: 15px;
        color: @appBtnColor;
        font-size: 12px;
        .content{
            padding: 10px 15px 8px 15px;
            box-sizing: border-box;
            line-height: 2;
            .box{
                display: flex;
                flex-flow: row;
                align-items: center;
                .item{
                    flex: 1;
                }
                .bold{
                    font-weight: bold;
                }
                .del{
                    color: @delColor;
                }
                .rt{
                    text-align: right;
                }
            }
        }
        .btnBox{
            display: flex;
            flex-flow: row;
            align-items: center;
            padding: 8px 15px 8px 15px;
            border-top: 1px dashed @bgColor;
            .item{
                flex: 1;
            }
            .itemS{
                flex: 2;
            }
            .rt{
                text-align: right;
                color: @otherColorB;
            }
            .del{
                color: @delColor;
            }
        }
    }
</style>