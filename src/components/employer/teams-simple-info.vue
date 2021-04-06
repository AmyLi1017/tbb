<template>
    <div class="container">
        <div class="listBox" v-for="(item,index) in teamList">
            <div class="p">
                <div class="lf name">姓 名</div>
                <div class="rt val">{{item.name}}</div>
            </div>
            <div class="p">
                <div class="lf name">身份证</div>
                <div class="rt val">{{item.idCard}}</div>
            </div>
            <div class="p">
                <div class="lf name">拥有工种</div>
                <div class="rt val">{{item.workText}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "teams-simple-info",
        props: {
            teamList: ''
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/base";
    .listBox{
        padding: 0 20px;
        width: 92%;
        margin: 10px 4%;
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow: 2px 2px 10px @bgColor;
        .p:last-child{
            border-bottom: none;
        }
        .p{
            display: flex;
            flex-flow: row;
            align-items: center;
            border-bottom: 1px dashed @bgColor;
            color: @appBtnColor;
            letter-spacing: 1px;
            line-height: 1.8;
            padding: 10px 0;
            .lf{
                flex: 1;
            }
            .rt{
                flex: 3;
            }
            .link{
                color: @otherColorB;
            }
            .onClick{
                color: @delColor;
            }
        }
    }
</style>