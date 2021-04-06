<template>
    <div class="container">
        <div class="imgBox"><img src="../../../static/imgs/chooseRole_2.jpg" alt="" mode="widthFix"></div>
        <div class="tipBox" :class="selected?'active':''" @click="goIndex(0) "><div class="text">我是<span class="textTitle">建筑公司/劳务公司</span></div><img src="../../../static/imgs/company.png" alt="" class="iconfont" mode="widthFix"></div>
        <div class="tipBox" :class="selected?'active':''" @click="goIndex(1)"><div class="text">我是<span class="textTitle">班组长/承包人</span></div><img src="../../../static/imgs/workers.png" alt="" class="iconfont" mode="widthFix"></div>
        <div class="tipBox" :class="selected?'active':''" @click="goIndex(2)"><div class="text">我是<span class="textTitle">工人</span></div><img src="../../../static/imgs/worker.png" alt="" class="iconfont" mode="widthFix"></div>
    </div>
</template>

<script>
    import store from '@/store/index'

    export default {
        name: "chooseRole",
        data(){
            return {
                roleType:"0"
            }
        },
        methods:{
            goIndex(roleTyep){
                this.roleType = roleTyep;
                store.commit("saveUserRole", {role: this.roleType});
                uni.switchTab({
                    url:"/pages/index"
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../../assets/base";
    .container{
        padding-bottom: 30px;
        background-color: @bgColor;
    }
    .imgBox{
        width: 100%;
        img{
            width: 100%;
            height: auto;
        }
    }
    .tipBox{
        width: 72%;
        margin: 25px 14%;
        padding: 15px;
        box-sizing: border-box;
        font-size: 13px;
        color: @appBtnColor;
        letter-spacing: 1px;
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: white;
        border-radius: 20px;
        box-shadow: #B4C5E5 2px 2px 10px;
        .iconfont{
            flex: 2;
            display: inline-block;
        }
        .text{
            display: inline-block;
            flex: 5;
            font-weight: bold;
            padding-left: 8px;
            box-sizing: border-box;
            color: @fontColor;
            .textTitle{
                font-size: 15px;
                font-weight: bold;
            }
        }
    }
    .selected{
        background-color: @blueBgColor;
    }

</style>