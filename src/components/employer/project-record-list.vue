<template>
    <div class="container">
        <div class="liList" v-for="(item,index) in teamList" :key="index">
            <div class="listTop" @click="clickItem(0,item.customerId)">
                <div class="left"><img :src="item.icon" mode="widthFix"></div>
                <div class="right">
                    <div class="p1">
                        <div class="leftSpan name">{{item.name}}<span class="tips" v-if="item.isAuthentication==1">已实名</span><span class="tips" v-if="item.isImg == 1">有图</span></div>
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
            </div>
            <div class="listBottom" v-if="tabType == 0 && item.isSuit == 0 && projectType == 1">
                <div class="lf" @click="clickItem(1,item.customerId,2)">不合适</div>
                <div class="rt" @click="clickItem(1,item.customerId,1)">合适</div>
            </div>
            <div class="listBottom" v-if="tabType == 0 && item.isSuit == 0 && projectType == 0">
                <div class="lf del">不合适</div>
                <div class="rt del">合适</div>
            </div>
            <div class="listBottom" v-if="tabType == 0 && item.isSuit == 1">
                <div class="lf del">不合适</div>
                <div class="rt colorGe">合适</div>
            </div>
            <div class="listBottom" v-if="tabType == 0 && item.isSuit == 2">
                <div class="lf colorR">不合适</div>
                <div class="rt del">合适</div>
            </div>
            <div class="listBottom" v-if="tabType == 1 && item.isSuit == 0">
                <div class="lf" @click="clickItem(1,item.customerId,2)">不合适</div>
                <div class="rt" @click="clickItem(1,item.customerId,1)">合适</div>
            </div>
            <div class="listBottom" v-if="tabType == 2 && item.isSuit == 1">
                <div class="lf"></div>
                <div class="rt colorGe">合适</div>
            </div>
            <div class="listBottom" v-if="tabType == 3 && item.isSuit == 2">
                <div class="lf colorR">不合适</div>
                <div class="rt"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "project-record-list",
        props: {
            teamsList: '',
            listType: '',
            projectType: ''
        },
        data(){
            return {
                teamList: this.teamsList,
                tabType: this.listType
            }
        },
        methods:{
            clickItem(type,id,status){
                this.$emit('click', type,id,status)
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
            listType: {
                immediate: true,
                handler(val){
                    this.tabType = val;
                    console.log(val,"watchVal")
                },
                deep: true
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/base";
    .liList{
        color: @appBtnColor;
        font-size: 12px;
        width: 92%;
        margin: 10px 4%;
        border-radius: 6px;
        box-shadow: 2px 2px 10px @blueBgColor;
        line-height: 1.8;
        .listTop{
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
        }
        .listBottom{
            display: flex;
            flex-flow: row;
            align-items: center;
            padding: 5px 0 5px 0;
            border-top: 1px dashed @bgColor;
            color: @otherColorB;
            .del{
                color: @delColor;
            }
            .lf{
                flex: 1;
                padding-left: 40px;
                box-sizing: border-box;
            }
            .rt{
                flex: 1;
                text-align: right;
                padding-right: 40px;
                box-sizing: border-box;
            }
            .colorGe{
                color: @otherColorGe;
            }
            .colorR{
                color: @otherColorR;
            }
        }
    }
</style>