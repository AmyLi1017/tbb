<template>
    <div class="container">
        <div class="title"><span class="lf">职业技能</span><div class="rt"><span class="iconfont iconfalse" @click="goToStaffAbility()"></span></div></div>
        <div class="box">
            <div class="proBox" v-for="(item,index) in info" @click="goToStaffAbility(item.id)">
                <div class="p">
                    <div class="nameBox">
                        <span class="name over">{{item.certificateName}}</span>
                        <span class="tips" v-if="item.files && item.files.length > 0">有图</span>
                        <span class="iconfont iconright"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "staff-card-baseInfo1",
        props: {
            info: ''
        },
        methods: {
            goToStaffAbility(id){
                if (id) {
                    uni.navigateTo({
                        url: '/pages/main/my/staffAbility?id=' + id
                    })
                }else {
                    uni.navigateTo({
                        url: '/pages/main/my/staffAbility'
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
                .iconfont{
                    flex: 1;
                    text-align: right;
                }
            }
            .rt{
                flex: 1;
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