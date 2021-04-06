<template>
    <div class="container">
        <div class="title"><span class="lf">项目经验</span><div class="rt"><span class="iconfont iconfalse" @click="goToStaffProjects()"></span></div></div>
        <div class="box">
            <div class="proBox" v-for="(item,index) in projectList" @click="goToStaffProjects(item.id)">
                <div class="p">
                    <div class="nameBox">
                        <span class="name over">{{item.projectName}}</span>
                        <span class="tips" v-if="item.files && item.files.length > 0">有图</span>
                    </div>
                    <span class="rt over">{{item.provinceName}}{{item.cityName}}</span>
                </div>
                <div class="p">
                    <div class="val over">{{item.mainEnterprise}}</div>
                    <div class="text"><span class="iconfont iconright"></span></div>
                </div>
                <div class="p">
                    <span class="val over">{{item.workContent}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "staff-card-baseInfo2",
        props: {
            projectList: ''
        },
        methods: {
            goToStaffProjects(id){
                if (id) {
                    uni.navigateTo({
                        url: '/pages/main/my/staffProject?id=' + id
                    })
                }else {
                    uni.navigateTo({
                        url: '/pages/main/my/staffProject'
                    })
                }
            },
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/base";
    .container{
        .proBox{
            margin-top: 15px;
            margin-bottom: 15px;
            border-bottom: 1px dashed @blueBgColor;
            padding-bottom: 10px;
        }
        .proBox:last-child{
            border-bottom: none;
        }
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
                .iconfalse{
                    display: inline-block;
                    transform: rotate(45deg);
                    font-weight: bold;
                }
            }
        }
        .p{
            display: flex;
            flex-flow: row;
            align-items: center;
            .text{
                flex: 1;
                text-align: right;
            }
            .val{
                flex: 3;
                box-sizing: border-box;
            }
            .nameBox{
                flex: 3;
                display: flex;
                flex-flow: row;
                align-items: center;
                .name{
                    flex: 3;
                }
                .tips{
                    flex: 1;
                    color: @otherColorY;
                }
            }
            .rt{
                flex: 1;
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
        .over{
            overflow: hidden;
            text-overflow:ellipsis;
            display: -webkit-box; /*设置为弹性盒子*/
            -webkit-line-clamp: 1; /*最多显示1行*/
            overflow: hidden; /*超出隐藏*/
            text-overflow: ellipsis; /*超出显示为省略号*/
            -webkit-box-orient: vertical; /* 从上向下垂直排列子元素。 */
        }
    }
</style>