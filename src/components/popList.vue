<template>
    <div class="container">
        <div class="mask"></div>
        <div class="content">
            <div class="del" @click="closePop"><span class="iconfont iconfalse"></span></div>
            <div class="head">
                <div class="title lt">邀请报名</div>
                <div class="nextBtn rt" @click="nextPage">换一批</div>
            </div>
            <div class="listBox">
                <view class="weui-cells weui-cells_after-title">
                    <checkbox-group @change="checkboxChange">
                        <label class="weui-cell weui-check__label" v-for="(item,index) in inviteLists" :key="item.value">
                            <view class="weui-cell__bd text">{{item.name}}</view>
                            <view class="weui-cell__hd val">
                                <checkbox :value="item.value" :checked="item.checked"/>
                            </view>
                        </label>
                    </checkbox-group>
                </view>
            </div>
            <div class="pageInfo">
                当前：{{invitePageIndex}}/{{invitePageTotal}}页
            </div>
            <div class="btnBox">
                <a class="button text-space" :class="isActive?'active':''" @click="makeSure">确定</a>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '@/net/api'
    export default {
        name: "popList",
        props: {
            showPopList: '',
            customerId: ''
        },
        data(){
            return {
                isActive: '',
                invitePageIndex: 1,
                invitePageTotal: '',
                inviteListTotal: 5,
                inviteLists: '',
                checkedValLists: [],
            }
        },
        methods: {
            closePop(){
                this.showPopList = false;
                this.$emit('click',this.showPopList)
            },
            nextPage(){
                //保存选择
                this.saveChecked();

                //加载下一页
                this.loadPublish(true);
            },
            makeSure(){
                //保存选择
                this.saveChecked();
                //提交邀请列表
                let data = {
                    customerId: this.customerId,
                    ids: []
                };
                for (let h = 0; h < this.checkedValLists.length; h++) {
                    data.ids.push(this.checkedValLists[h].value)
                }
                console.log(data,'data');
                api.postCustomerInviteProjects(data).then(res => {
                    if (res.messageId == 1000) {
                        uni.showToast({
                            title: '邀请报名成功！',
                            icon: "none",
                            duration: 2000
                        });
                    }else {
                        uni.showToast({
                            title: '邀请报名失败，请重试！',
                            icon: "none",
                            duration: 2000
                        });
                    }
                }).catch(res => {
                    uni.showToast({
                        title: '邀请报名失败，请重试！',
                        icon: "none",
                        duration: 2000
                    });
                });
            },
            saveChecked(){
                //保存选择
                console.log(this.inviteLists,'inviteLists');
                for (let q = 0; q < this.inviteLists.length; q++){
                    let item = this.inviteLists[q];
                    if (item.checked == true){
                        let isHad = false;
                        for (let p = 0; p < this.checkedValLists.length; p++){
                            if (this.checkedValLists[p].value == item.value) {
                                isHad = true;
                            }
                        }
                        if (isHad === false){
                            this.checkedValLists.push(item)
                        }
                    } else if (item.checked == false) {
                        let isHad = false;
                        let index = '';
                        for (let k = 0; k < this.checkedValLists.length; k++){
                            let checkedItem = this.checkedValLists[k];
                            if (checkedItem.value == item.value) {
                                isHad = true;
                                index = k;
                            }
                        }
                        if (isHad === true){
                            this.checkedValLists.splice(index, 1);
                        }
                    }
                }
                console.log(this.checkedValLists,'checkedValLists');
            },
            loadPublish(isLoadMore){
                if (isLoadMore) {
                    if (this.invitePageIndex < this.invitePageTotal){
                        this.invitePageIndex += 1;
                    } else {
                        this.invitePageIndex == 1;
                    }
                }
                let data = {
                    customerId: this.customerId,
                    pageIndex: this.invitePageIndex,
                    pageSize: 5
                };
                //获取用户发布列表
                api.postCustomerInviteList(data).then(res => {
                    if (res.messageId == 1000) {
                        let inviteList = [];
                        let list = res.body.data;
                        this.inviteLists = [];
                        for (let e=0; e < list.length; e++){
                            let item = {name: '',value: '',checked: ''};
                            item.name = list[e].projectName;
                            item.value = list[e].id;
                            //循环checkedValue
                            for (let g=0; g < this.checkedValLists.length; g++){
                                if (item.value == this.checkedValLists[g].value) {
                                    item.checked = this.checkedValLists[g].checked;
                                }
                            }

                            inviteList.push(item);
                            console.log(inviteLists,'inviteLists')
                        }
                        _this.inviteList = inviteList;
                        _this.inviteListTotal = res.body.total;
                    }
                });

                //测试数据--------------------------------------------------------
                let list =  [{
                    id: "1", // 项目id
                    projectName: "项目名称1", // 项目名称
                    signWay: 1  // 报名方式:0未邀请,1主动,2邀请，null是没有报名
                },{
                    id: "2", // 项目id
                    projectName: "项目名称2", // 项目名称
                    signWay: 1  // 报名方式:0未邀请,1主动,2邀请，null是没有报名
                },{
                    id: "3", // 项目id
                    projectName: "项目名称3", // 项目名称
                    signWay: 1  // 报名方式:0未邀请,1主动,2邀请，null是没有报名
                },{
                    id: "4", // 项目id
                    projectName: "项目名称4", // 项目名称
                    signWay: 1  // 报名方式:0未邀请,1主动,2邀请，null是没有报名
                },{
                    id: "5", // 项目id
                    projectName: "项目名称5", // 项目名称
                    signWay: 1  // 报名方式:0未邀请,1主动,2邀请，null是没有报名
                }
                    ];
                this.invitePageTotal = 6;
                this.inviteLists = [];
                for (let e=0; e < list.length; e++){
                    let item = {name: '',value: '',checked: ''};
                    item.name = list[e].projectName;
                    item.value = list[e].id;
                    //循环checkedValue
                    for (let t=0; t < this.checkedValLists.length; t++){
                        if (item.value == this.checkedValLists[t].value) {
                            item.checked = this.checkedValLists[t].checked;
                        }
                    }

                    this.inviteLists.push(item);
                    console.log(this.inviteLists,'inviteLists')
                }


            },
            checkboxChange(e) {
                console.log('checkbox发生change事件，携带value值为：', e.detail.value);

                const items = this.inviteLists;
                const values = e.detail.value;
                for (let i = 0, lenI = items.length; i < lenI; ++i) {
                    items[i].checked = false;
                    for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
                        if (items[i].value === values[j]) {
                            items[i].checked = true;
                            break
                        }
                    }
                }
            }
        },
        mounted(){
            this.loadPublish();//获取用户发布列表
        },
        onLoad(){

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