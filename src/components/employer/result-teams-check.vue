<template>
    <div class="container">
        <div class="listTop">
            <view class="weui-cells weui-cells_after-title">
                <checkbox-group @change="checkboxChange">
                    <label class="weui-cell liList weui-check__label" v-for="(item,index) in teamList" :key="checkList[index].value">
                        <div class="content">
                            <div class="left"><img :src="item.icon" mode="widthFix"></div>
                            <div class="right">
                                <div class="p1">
                                    <div class="leftSpan name">{{item.name}}<span class="tips" v-if="item.isAuthentication==1">已实名</span><span class="tips">有图</span></div>
                                </div>
                                <div class="p1">
                                    <div class="leftSpan">队伍人数: <span class="teamNum">{{item.population}}</span>人</div>
                                </div>
                                <div class="p2">
                                    <div class="lf">拥有工种</div>
                                    <div class="rt">
                                        <span class="littleTips" v-for="(i,index) in item.teamSearchWorkTypeResponseList" :key="index">{{i.workTypeName}}</span>
                                    </div>
                                </div>
                            </div>
                            <view class="weui-cell__hd val">
                                <checkbox :value="checkList[index].value" :checked="checkList[index].checked"/>
                            </view>
                        </div>
                    </label>
                </checkbox-group>
            </view>
        </div>
        <div class="btnBox">
            <a class="button text-space" :class="isActive?'active':''" @click="saveResult">确认</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "result-teams-check",
        props: {
            teamsList: '',
            checkList: ''
        },
        data(){
            return {
                teamList: this.teamsList,
                checkedList: this.checkList,
                checkedArr: ''
            }
        },
        methods:{
            checkboxChange(e) {
                console.log('checkbox发生change事件，携带value值为：', e.detail.value);
                this.checkedArr = e.detail.value;
            },
            saveResult(){
                this.$emit('click',this.checkedArr)
            }
        },
        watch: {
            teamsList: {
                immediate: true,
                handler(val){
                    this.teamList = val;
                    console.log(val,"watchVal")
                },
                deep: true
            },
            checkList: {
                immediate: true,
                handler(val){
                    this.checkedList = val;
                    console.log(val,"watchVal")
                },
                deep: true
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/base";
    .container{
        letter-spacing: 1px;
        padding-bottom: 60px;
    }
    .liList{
        color: @appBtnColor;
        font-size: 12px;
        width: 92%;
        margin: 10px 2%;
        border-radius: 6px;
        box-shadow: 2px 2px 10px @blueBgColor;
        line-height: 1.8;
        display: block;
        .content{
            padding: 15px 0 10px 0;
            box-sizing: border-box;
            display: flex;
            flex-flow: row;
            align-items: center;
            .left{
                flex: 1;
                text-align: center;
                img{
                    display: inline-block;
                    width: 60%;
                    border-radius: 50%;
                }
            }
            .right{
                flex: 3;
                .p1{
                    display: flex;
                    flex-flow: row;
                    align-items: center;
                    margin-bottom: 5px;
                    .leftSpan{
                        flex: 3;
                        .name{
                            font-size: 15px;
                            color: @fontColor;
                            font-weight: bold;
                        }
                        .tips{
                            font-size: 12px;
                            display: inline-block;
                            vertical-align: middle;
                            padding: 0 10px;
                            box-sizing: border-box;
                            background: @otherColorB;
                            color: white;
                            border-radius: 4px;
                        }
                        .tips:first-child{
                            margin: 0 19px 0 29px;
                            background: @otherColorR;
                        }
                    }
                    .rightSpan{
                        flex: 2;
                        flex-flow: row;
                        align-items: center;
                        text-align: right;
                        padding-right: 10px;
                        box-sizing: border-box;
                    }
                }
                .p2{
                    display: flex;
                    flex-flow: row;
                    align-items: center;
                    margin-bottom: 5px;
                    .lf{
                        flex: 1;
                    }
                    .rt{
                        flex: 3;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        display: -webkit-box; /*设置为弹性盒子*/
                        -webkit-line-clamp: 1; /*最多显示1行*/
                        overflow: hidden; /*超出隐藏*/
                        text-overflow: ellipsis; /*超出显示为省略号*/
                        -webkit-box-orient: vertical; /* 从上向下垂直排列子元素。 */
                        .littleTips{
                            display: inline-block;
                            vertical-align: middle;
                            margin-right: 8px;
                        }
                        .littleTips:first-child{
                            margin-left: 8px;
                        }
                    }
                }
            }
            .val{
                flex: 1;
            }
        }
    }
    .btnBox{
        width: 100%;
        position: fixed;
        bottom: 0;
        height: 40px;
        line-height: 40px;
        background: @appBtnColor;
        color: white;
        font-size: 16px;
        text-align: center;
    }
</style>