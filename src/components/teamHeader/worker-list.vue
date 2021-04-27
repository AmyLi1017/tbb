<template>
    <div class="container">
        <div class="listBox" v-for="(item,index) in workerList" @click="goToDetail(item.id,item.customerId)">
            <div class="content">
                <div class="lf"><img :src="item.icon?item.icon:''" mode="widthFix" alt=""></div>
                <div class="rt">
                    <div class="lf">
                        <div class="p title">
                            <div class="lf">{{item.name}}</div>
                            <div class="rt" v-if="item.isAuthentication == 1"><span>已实名</span></div>
                        </div>
                        <div class="p">
                            <div class="lf">工龄</div>
                            <div class="rt">{{item.workYear}}年</div>
                        </div>
                        <div class="p">
                            <div class="lf">工种</div>
                            <div class="rt">{{item.workerType}}</div>
                        </div>
                    </div>
                    <div class="right">
                        <div>{{item.provinceName}}<span v-if="item.cityName">-{{item.cityName}}</span></div>
                        <div v-if="item.applyStatus == 1">正在找活</div>
                    </div>
                </div>
            </div>
            <div class="bottom">
                {{item.description}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "worker-list",
        props: {
            workerList: ''
        },
        methods: {
            goToDetail(id,customerId){
                this.$emit('click',id,customerId)
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/base";
    .container{
        letter-spacing: 1px;
        font-size: 12px;
        color: @appBtnColor;
        line-height: 2;
        margin-top: 10px;
        .listBox{
            box-shadow: 2px 2px 10px @blueBgColor;
            border-radius: 8px;
            margin: 0 15px;
            margin-bottom: 15px;
            .content{
                padding: 10px;
                box-sizing: border-box;
                display: flex;
                flex-flow: row;
                align-items: center;
                .lf{
                    flex: 1;
                    box-sizing: border-box;
                    text-align: center;
                    img{
                        display: inline-block;
                        width: 80%;
                        border-radius: 50%;
                    }
                }
                .rt{
                    flex: 4;
                    display: flex;
                    flex-flow: row;
                    .lf{
                        flex: 3;
                        text-align: left;
                        padding-left: 10px;
                        box-sizing: border-box;
                        .p{
                            display: flex;
                            flex-flow: row;
                            .lf{
                                flex: 1;
                            }
                            .rt{
                                flex: 2;
                                display: -webkit-box;
                                -webkit-line-clamp: 1;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                -webkit-box-orient: vertical;
                            }
                        }
                        .title{
                            .lf{
                                font-size: 13px;
                                font-weight: bold;
                            }
                            .rt{
                                span{
                                    display: inline-block;
                                    padding: 0 5px;
                                    box-sizing: border-box;
                                    border-radius: 4px;
                                    background: @otherColorY;
                                    color: white;
                                    text-align: center;
                                }
                            }
                        }
                    }
                    .right{
                        flex: 2;
                        display: block;
                        text-align: right;
                    }
                }
            }
            .bottom{
                text-align: center;
                border-top: 1px dashed @bgColor;
                padding: 0 10px;
                line-height: 40px;
                box-sizing: border-box;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                text-overflow: ellipsis;
                overflow: hidden;
                -webkit-box-orient: vertical;
            }
        }
    }
</style>
