<template>
    <div class="container">
        <div class="title">职业技能</div>
        <div class="listBox" v-for="(item,index) in info">
            <div class="p">
                <div class="text">{{item.certificateName}}</div>
                <div class="val imgBox">
                    <img :src="one" alt="" mode="widthFix"  v-for="(one,i) in item.files">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "worker-card-base-info1",
        props: {
            info: ''
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/base";
    .title{
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        color: @fontColor;
    }
    .listBox{
        margin-top: 15px;
        border-bottom: 1px dashed @blueBgColor;
        .p{
            display: flex;
            flex-flow: row;
            align-items: normal;
            .text{
                flex: 1;
            }
            .val{
                flex: 3;
                box-sizing: border-box;
            }
        }
        .imgBox{
            display: flex;
            flex-flow: wrap;
            img{
                display: inline-block;
                width: 33.3%;
                padding: 10px;
                padding-top: 0px;
                box-sizing: border-box;
                border-radius: 4px;
            }
        }
    }
    .listBox:last-child{
        border-bottom: none;
    }
</style>