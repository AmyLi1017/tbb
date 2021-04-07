<template>
    <div class="container">
        <div class="listBox" v-for="(item,index) in needList">
            <div class="content">
                <div class="head">
                    <div class="rt title">{{item.requirementName}}</div>
                    <div class="lf">{{item.salarText}}</div>
                </div>
                <div class="p">{{item.workText}}</div>
                <div class="p">{{item.description}}</div>
            </div>
            <div class="btnBox">
                <div class="rt"><a class="button text-space" :class="isActive?'active':''" @click="changeStatus(0,item.id)">修改</a></div>
                <div class="mid" v-if="item.requirementStatus == 1"><a class="button text-space" :class="isActive?'active':''" @click="changeStatus(1,item.id,item.requirementStatus)">停止招聘</a></div>
                <div class="mid" v-if="item.requirementStatus == 0"><a class="button text-space" :class="isActive?'active':''" @click="changeStatus(1,item.id,item.requirementStatus)">重新招聘</a></div>
                <div class="lf" v-if="item.requirementStatus == 1"><a class="button text-space" :class="isActive?'active':''" @click="changeStatus(2,item.id)">刷新</a></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "workerNeedList",
        props: {
            needList: ''
        },
        methods: {
            changeStatus(e,id,status){
                this.$emit('click',e,id,status)
            }
        },
    }
</script>

<style scoped lang="less">
    @import "../../assets/base";
    .listBox{
        background: white;
        color: @appBtnColor;
        font-size: 12px;
        line-height: 2;
        border-radius: 8px;
        box-shadow: 2px 2px 10px @bgColor;
        margin-bottom: 15px;
        .content{
            padding: 15px;
            box-sizing: border-box;
            .head{
                display: flex;
                flex-flow: row;
                align-items: center;
                .title{
                    font-size: 14px;
                    font-weight: bold;
                }
                .rt{
                    flex: 5;
                }
                .lf{
                    flex: 2;
                    text-align: right;
                    color: @otherColorR;
                }
            }
            .p{
                color: @delColor;
            }
        }
        .btnBox{
            display: flex;
            flex-flow: row;
            align-items: center;
            text-align: center;
            border-top: 1px dashed @bgColor;
            div{
                padding: 5px 0;
                .button{
                    display: inline-block;
                    padding: 0 10px;
                    color: @otherColorB!important;
                    background-color: white!important;
                }
            }
            .rt{
                flex: 1;
            }
            .mid{
                flex: 1;
            }
            .lf{
                flex: 1;
            }
        }
    }
</style>