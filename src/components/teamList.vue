<template>
    <div class="container">
        <div class="liList" v-for="(item,index) in teamList" :key="index" @click="goNext(item.id)">
            <div class="listTop">
                <div class="left"><img :src="item.icon" mode="widthFix"></div>
                <div class="right">
                    <div class="p1">
                        <div class="leftSpan name">{{item.name}}<span class="tips" v-if="item.isAuthentication==1">已实名</span><span class="tips" v-if="item.isImg == 1">有图</span></div>
                        <div class="rightSpan">{{item.provinceName}}<span v-if="item.cityName">-{{item.cityName}}</span></div>
                    </div>
                    <div class="p1">
                        <div class="leftSpan">队伍人数: <span class="teamNum">{{item.population}}</span>人</div>
                        <div class="rightSpan">
                            <span v-if="item.applyStatus == 0">未知</span>
                            <span v-if="item.applyStatus == 1">正在找活</span>
                            <span v-if="item.applyStatus == 2">正在观察</span>
                        </div>
                    </div>
                    <div class="p2">
                        <div class="lf">拥有工种</div>
                        <div class="rt">
                            <span class="littleTips" v-for="(i,index) in item.teamWorkTypeList" :key="index">{{i.workTypeName}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="listBottom">
                <div class="p2">
                    <div class="lf">最近工程:</div>
                    <div class="rt">{{item.projectName}}</div>
                </div>
                <div class="p2">
                    <div class="lf">总包单位:</div>
                    <div class="rt">{{item.mainEnterprise}}</div>
                </div>
                <div class="p2">
                    <div class="lf">工作内容:</div>
                    <div class="rt">{{item.workContent}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "teamList",
        props: {
            teamsList: ''
        },
        data(){
            return {
                teamList: this.teamsList
            }
        },
        methods:{
          goNext(id){
              this.$emit('click', id)
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
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../assets/base";

    .liList{
        width: 92%;
        margin: 10px 4%;
        border-radius: 6px;
        box-shadow: 2px 2px 10px @blueBgColor;
        .listTop{
            padding: 15px 0 10px 0;
            box-sizing: border-box;
            display: flex;
            flex-flow: row;
            align-items: center;
            .left{
                flex: 1;
                text-align: center;
                max-height: 100px;
                img{
                    display: inline-block;
                    width: 60%;
                    border-radius: 50%;
                }
            }
            .right{
                flex: 3;
                color: @appBtnColor;
                font-size: 12px;
                .p1{
                    display: flex;
                    flex-flow: row;
                    align-items: center;
                    .leftSpan{
                        flex: 3;
                        .name{
                            font-size: 15px;
                            color: @fontColor;
                            font-weight: bold;
                        }
                        .tips{
                            font-size: 11px;
                            display: inline-block;
                            vertical-align: middle;
                            padding: 0 5px;
                            box-sizing: border-box;
                            background: @otherColorB;
                            color: white;
                            border-radius: 4px;
                        }
                        .tips:first-child{
                            margin: 0 5px 0 10px;
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
            padding: 15px 0 10px 0;
            margin: 0 15px;
            border-top: 1px dashed @blueBgColor;
            box-sizing: border-box;
            color: @appBtnColor;
            font-size: 12px;
            .p2{
                display: flex;
                flex-flow: row;
                align-items: center;
                .lf{
                    flex: 1;
                }
                .rt{
                    flex: 3;
                }
            }
        }
    }


</style>
