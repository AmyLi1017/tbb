<template>
    <div class="container">
        <div class="top"></div>
        <div class="tipBox">
            <div class="title">班组引进</div>
            <div class="tips">
                <div class="left">已服务1000次</div>
                <div class="right">分享<span class="iconfont iconshare"></span></div>
            </div>
            <div class="shows">
                <div class="left"><span class="iconfont iconaward"></span>实名保障</div>
                <div class="middle"><span class="iconfont iconfaxian"></span>资料齐全</div>
                <div class="right"><span class="iconfont iconflow-others"></span>快速高效</div>
            </div>
        </div>
        <div class="content">
            <div class="title">服务流程</div>
            <div class="processBox">
                <div class="step">
                    <div class="icon">
                        <div class="icons"></div>
                        <div class="cirB icons"><span class="cir">1</span></div>
                        <div class="line icons"></div>
                    </div>
                    <div class="tips">
                        <!--<div class="p1">第1步</div>-->
                        <div class="p2">填写项目</div>
                    </div>
                </div>
                <div class="step">
                    <div class="icon">
                        <div class="line icons"></div>
                        <div class="cirB icons"><span class="cir">2</span></div>
                        <div class="line icons"></div>
                    </div>
                    <div class="tips">
                        <!--<div class="p1">第2步</div>-->
                        <div class="p2">班组报名</div>
                    </div>
                </div>
                <div class="step">
                    <div class="icon">
                        <div class="line icons"></div>
                        <div class="cirB icons"><span class="cir">3</span></div>
                        <div class="line icons"></div>
                    </div>
                    <div class="tips">
                        <!--<div class="p1">第3步</div>-->
                        <div class="p2">选择班组</div>
                    </div>
                </div>
                <div class="step">
                    <div class="icon">
                        <div class="line icons"></div>
                        <div class="cirB icons"><span class="cir">4</span></div>
                        <div class="line icons"></div>
                    </div>
                    <div class="tips">
                        <!--<div class="p1">第4步</div>-->
                        <div class="p2">考察面谈</div>
                    </div>
                </div>
                <div class="step">
                    <div class="icon">
                        <div class="line icons"></div>
                        <div class="cirB icons"><span class="cir">5</span></div>
                        <div class="icons"></div>
                    </div>
                    <div class="tips">
                        <!--<div class="p1">第5步</div>-->
                        <div class="p2">结果确认</div>
                    </div>
                </div>
            </div>
            <div class="title">服务评价</div>
            <div class="serviceBox">
                <div class="serviceStar">
                <div class="left"><img src="./static/img/starUser2.jpg" mode="widthFix"></div>
                <div class="right">
                    <div class="starB">
                        <div class="phone">1517****</div>
                        <div class="star">
                            <span class="iconfont iconstarFill"></span>
                            <span class="iconfont iconstarFill"></span>
                            <span class="iconfont iconstarFill"></span>
                            <span class="iconfont iconstarFill"></span>
                            <span class="iconfont iconstarFill"></span>
                        </div>
                    </div>
                    <div class="art">平台模式相当不错，一次性就了解到班组非常全面的资料，看完直接就去考查和谭价格了</div>
                </div>
            </div>
                <div class="serviceStar">
                    <div class="left"><img src="./static/img/starUser1.jpg" mode="widthFix"></div>
                    <div class="right">
                        <div class="starB">
                            <div class="phone">1386****</div>
                            <div class="star">
                                <span class="iconfont iconstarFill"></span>
                                <span class="iconfont iconstarFill"></span>
                                <span class="iconfont iconstarFill"></span>
                                <span class="iconfont iconstarFill"></span>
                                <span class="iconfont iconstarFill"></span>
                            </div>
                        </div>
                        <div class="art">平台模式相当不错，一次性就了解到班组非常全面的资料，看完直接就去考查和谭价格了</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btnBox">
            <a class="button text-space" :class="isActive?'active':''" @click="goTo">去发布</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "teamBring",
        data(){
            return {
                havTimes: true,
                isActive: false
            }
        },
        methods: {
            goTo(){
                this.isActive = true;
                if (this.havTimes){
                    uni.navigateTo({
                        url: "/pages/packageEmployer/projectForm"
                    });
                }
            }
        }

    }
</script>

<style scoped lang="less">
    @import "../../assets/base";
    .container{
        background: white;
        padding-bottom: 60px;
    }
    .top{
        background: @appBtnColor;
        height: 150px;
        width: 100%;
    }
    .tipBox{
        position: absolute;
        top: 75px;
        width: 90%;
        margin: 0 5%;
        height: 150px;
        border-radius: 16px;
        box-shadow: 2px 2px 10px @bgColor;
        background: white;
        color: @fontColor;
        padding: 20px 20px;
        letter-spacing: 1px;
        box-sizing: border-box;
        line-height: 1.5!important;
        .title{
            font-size: 15px;
            margin-bottom: 5px;
        }
        .tips{
            display: flex;
            flex-flow: row;
            align-items: center;
            font-size: 14px;
            color: @appBtnColor;
            padding-bottom: 20px;
            border-bottom: 1px solid @bgColor;
            .left{
                flex: 1;
            }
            .right{
                flex: 1;
                text-align: right;
                margin-right: 5px;
                .iconfont{
                    font-size: 24px;
                    font-weight: bold;
                    vertical-align: middle;
                    display: inline-block;
                    color: @appBtnColor;
                }
            }
        }
        .shows{
            display: flex;
            flex-flow: row;
            align-items: center;
            text-align: center;
            font-size: 12px;
            color: @delColor;
            margin-top: 10px;
            .iconfont{
                display: inline-block;
                margin-right: 3px;
                font-weight: bold;
                vertical-align: middle;
            }
            .left{
                flex: 1;
                .iconfont{
                    color: @otherColorY;
                    font-size: 16px;
                }
            }
            .middle{
                flex: 1;
                .iconfont{
                    color: @otherColorB;
                    font-size: 18px;
                }
            }
            .right{
                flex: 1;
                .iconfont{
                    color: @otherColorR;
                    font-size: 18px;
                }
            }
        }
    }
    .content{
        width: 100%;
        padding-top: 100px;
        letter-spacing: 1px;
        .title{
            font-size: 15px;
            color: @appBtnColor;
            margin-left: 20px;
            font-weight: bold;
            margin-bottom: 15px;
        }
        .processBox{
            display: flex;
            flex-flow: row;
            align-items: center;
            margin: 0 5px 30px 5px;
            .step{
                flex: 1;
                .icon{
                    display: flex;
                    flex-flow: row;
                    align-items: flex-start;
                    .icons{
                        flex: 1;
                    }
                    .line{
                        flex: 1;
                        width: 100%;
                        height: 12px;
                        border-bottom: 2px solid @appBtnColor;
                    }
                    .cirB{
                        flex: 2;
                        color: white;
                        text-align: center;
                        height: 25px;
                        line-height: 25px;
                    }
                    .cir{
                        background: @appBtnColor;
                        display: inline-block;
                        width: 25px;
                        border-radius: 50%;
                        font-size: 13px;
                    }
                }
            }
            .tips{
                text-align: center;
                margin-top: 5px;
                .p1{
                    font-size: 10px;
                    color: @delColor;
                }
                .p2{
                    font-size: 11px;
                    color: @appBtnColor;
                }
            }
        }
        .serviceBox{
            padding: 0 15px;
            margin-top: 10px;
            font-size: 12px;
            .serviceStar{
                display: flex;
                flex-flow: row;
                align-items: center;
                margin-bottom: 20px;
                .left{
                    flex: 1;
                    text-align: center;
                    box-sizing: border-box;
                    img{
                        display: inline-block;
                        width: 60%;
                        border-radius: 50%;
                    }
                }
                .right{
                    flex: 3;
                    color: @delColor;
                    .starB{
                        display: flex;
                        flex-flow: row;
                        align-items: center;
                        margin-bottom: 10px;
                        .phone{
                            flex: 1;
                            color: @appBtnColor;
                            font-weight: bold;
                        }
                        .star{
                            flex: 1;
                            color: @otherColorY;
                        }
                    }
                    .art{
                        padding-right: 20px;
                        box-sizing: border-box;
                        line-height: 1.5;
                    }
                }
            }
        }

    }
    .btnBox{
        width: 100%;
        text-align: center;
    }
    .button{
        height: 45px;
        line-height: 45px;
        display: inline-block;
        width: 83%;
        text-align: center;
        font-size: 18px;
        background: @appBtnColor;
        color: white;
        border: none;
        margin-top: 35px;
        box-shadow: 3px 3px 3px @borderColor;
        border-radius: 24px;
    }
    .active{
        background: @appBtnColor;
        color: white;
    }
</style>