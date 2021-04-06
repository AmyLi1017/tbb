<template>
    <div class="container">
        <div class="mask"></div>
        <div class="content">
            <div class="del" @click="closePop"><span class="iconfont iconfalse"></span></div>
            <div class="head">
                <div class="title lt">请选择工种<span class="tip">（可多选）</span></div>
            </div>
            <div class="listBox">
                <view class="weui-cells weui-cells_after-title">
                    <checkbox-group @change="checkboxChange">
                        <label class="weui-cell weui-check__label" v-for="(item,index) in selCheckedList" :key="item.value">
                            <view class="weui-cell__bd text">{{item.name}}</view>
                            <view class="weui-cell__hd val">
                                <checkbox :value="item.value" :checked="item.checked"/>
                            </view>
                        </label>
                    </checkbox-group>
                </view>
            </div>
            <div class="btnBox">
                <a class="button text-space" :class="isActive?'active':''" @click="makeSure">确定</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "popCheckbox",
        props: {
            isOpenPop: '',
            checkItems: '',
            checkedArr: ''
        },
        data(){
            return {
                checkedList: this.checkedArr
            }
        },
        computed: {
            selCheckedList(){
                if (this.checkItems.length > 0){
                    this.checkItems.forEach((item,index) => {
                        if (this.checkedList.length > 0) {
                            this.checkedList.forEach((i,num) =>{
                                if (item.value == i.value) {
                                    this.checkItems[index].checked = true;
                                }
                            });
                        }
                    });
                }

                return this.checkItems;
            }
        },
        methods: {
            closePop(){
                this.$emit('click',false)
            },
            checkboxChange(e) {
                console.log('checkbox发生change事件，携带value值为：', e.detail.value);

                const items = this.checkItems;
                const values = e.detail.value;
                for (let i = 0, lenI = items.length; i < lenI; ++i) {
                    items[i].checked = false;
                    for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
                        if (items[i].value == values[j]) {
                            this.checkItems[i].checked = true;
                        }
                    }
                }
            },
            makeSure(){
                this.$emit('change',this.checkItems);
                this.closePop();
            },
        },
        watch:{
            checkedArr: {
                immediate: true, // 重要！
                handler (val) {
                    this.checkedList = val;
                },
                deep: true
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../assets/base";
    .container{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        .mask{
            width: 100%;
            height: 100%;
            background: #646464;
            opacity: 0.5;
            position: relative;
        }
        .content{
            background: white;
            padding: 40px 20px 20px 20px;
            width: 88%;
            margin: 0 6%;
            box-sizing: border-box;
            border-radius: 10px;
            position: absolute;
            top: 120px;
            .iconfont{
                position: absolute;
                top: 5px;
                right: 0;
                display: inline-block;
                padding: 3px 10px;
                font-size: 16px;
            }
            .head{
                display: flex;
                flex-flow: row;
                align-items: center;
                .lt{
                    flex: 2;
                    color: @fontColor;
                    font-size: 16px;
                    font-weight: bold;
                    .tip{
                        font-size: 12px;
                        font-weight: normal;
                    }
                }
                .rt{
                    flex: 1;
                    color: @otherColorB;
                    text-align: right;
                }
            }
            .listBox{
                padding: 10px 0;
                .weui-check__label{
                    display: flex;
                    flex-flow: row;
                    align-items: center;
                    margin-bottom: 10px;
                    .text{
                        flex: 4;
                    }
                    .val{
                        flex: 1;
                        text-align: right;
                    }
                }
            }
            .pageInfo{
                text-align: right;
                color: @delColor;
                margin-bottom: 5px;
            }
            .btnBox{
                text-align: center;
                .button{
                    display: inline-block;
                    width: 70%;
                    line-height: 40px;
                    height: 40px;
                    color: white;
                    background: @appBtnColor;
                    border-radius: 4px;
                }
            }
        }
    }
</style>