<template>
    <div class="container">
        <div class="btnBox" v-for="(item,index) in roleList()" :class="item.bgName" @click="goTo(index)">
            <span class="iconfont" :class="item.className"></span>
            <div class="btnName">{{item.btnName}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "indexContentType",
        props: {
            roleType: {
                default: false
            }
        },
        data(){
            return {
                roleLists: [{
                    className: 'iconshigongjihuaqingdan',
                    btnName: '发需求',
                    bgName: 'bg1',
                    url: "/pages/packageEmployer/teamBring"
                }, {
                    className: 'icongongrenjinengshujuku',
                    btnName: '淘班组',
                    bgName: 'bg2',
                    url: "/pages/packageEmployer/readProject"
                }]
            }
        },
        methods: {
            roleList(){
                console.log(this.roleType,"roleType");
                switch (this.roleType) {
                    case 0: //企业角色
                        this.roleLists = [{
                            className: 'iconshigongjihuaqingdan',
                            btnName: '发需求',
                            bgName: 'bg1',
                            url: "/pages/packageEmployer/teamBring"
                        }, {
                            className: 'icongongrenjinengshujuku',
                            btnName: '淘班组',
                            bgName: 'bg2',
                            url: "/pages/packageEmployer/readProject"
                        }];
                        break;
                    case 1://班组角色
                        this.roleLists = [{
                            className: 'iconmianxingqiqianggongren',
                            btnName: '找民工',
                            bgName: 'bg1',
                            url: "/pages/packageHeadman/findWorker"
                        }, {
                            className: 'iconshigongjihuaqingdan',
                            btnName: '优质分包',
                            bgName: 'bg2',
                            url: "/pages/packageHeadman/proPackage"
                        }, {
                            className: 'icongongren1',
                            btnName: '优质工人',
                            bgName: 'bg3',
                            url: "/pages/packageHeadman/goodWorker"
                        }];
                        break;
                    case 2://工人角色
                        this.roleLists = [{
                            className: 'icongongren',
                            btnName: '我的名片',
                            bgName: 'bg1',
                            url: "/pages/packageStaff/myInfo"
                        }, {
                            className: 'icondrxx90',
                            btnName: '优质招工',
                            bgName: 'bg2',
                            url: "/pages/packageStaff/goodJobs"
                        }];
                        break;
                }
                return this.roleLists;
            },
            goTo(index){
                let url = this.roleLists[index].url;
                uni.navigateTo({
                    url: url
                })
            }
        },
    }
</script>

<style scoped lang="less">
    @import "../assets/base";
    .container{
        display: flex;
        align-items: center;
        .btnBox{
            flex: 1;
            width: 96%;
            margin: 2%;
            height: 80px;
            border-radius: 8px;
            box-shadow: #B4C5E5 2px 2px 10px;
            .iconfont{
                font-size: 26px;
                width: 100%;
                display: inline-block;
                color: white;
                font-weight: bold;
                opacity: 0.4;
                padding: 10px 0 0 10px;
            }
            .btnName{
                text-align: center;
                font-size: 16px;
                color: white;
                letter-spacing: 1px;
                opacity: 0.9;
                position: relative;
                top: -28px;
                font-weight: bold;
            }
        }
        .bg1{
            background: #FFBA30;
        }
        .bg2{
            background: #5E9CFB;
        }
        .bg3{
            background: #B175F9;
        }
    }
</style>