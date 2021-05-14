<template>
    <div class="container">
        <div class="title">
            <span class="lf">班组信息</span>
            <div class="rt" v-if="info">
                <span class="status" v-if="info.applyStatus == 1">找工作中</span>
                <span class="status" v-if="info.applyStatus == 2">观察中</span>
                <span class="iconfont iconright"></span>
            </div>
            <div class="rt" v-else>
              <span class="status">去填写</span>
              <span class="iconfont iconright"></span>
            </div>
        </div>
        <div class="box" v-if="info">
          <div class="p">
            <span class="text">工&nbsp;作&nbsp;年&nbsp;限：</span>
            <span class="val">{{info.workYear}}年</span>
          </div>
          <div class="p">
            <span class="text">期望工作地：</span>
            <span class="val">{{info.provinceName}}<span v-if="info.cityName">-{{info.cityName}}</span></span>
          </div>
          <div class="p">
            <span class="text">身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;份：</span>
            <span class="val" v-if="info.position == 0">未知</span>
            <span class="val" v-if="info.position == 1">班组长/承包人</span>
          </div>
          <div class="p">
            <span class="text">工&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;种：</span>
            <span class="val">{{info.workTypeText}}</span>
          </div>
          <div class="p" v-if="info.population">
            <span class="text">队&nbsp;伍&nbsp;人&nbsp;数：</span>
            <span class="val">{{info.population}}人</span>
          </div>
          <div class="p">
            <span class="text">自&nbsp;我&nbsp;介&nbsp;绍：</span>
            <span class="val">{{info.description}}</span>
          </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "team-card-info2",
        props: {
            info: ''
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/base";
    .container{
        padding: 13px;
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
            align-items: center;
            .text{
                flex: 3;
            }
            .val{
                flex: 8;
                padding-left: 10px;
                box-sizing: border-box;
            }
        }
    }
</style>
