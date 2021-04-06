<template>
    <div class="container">
        <div class="listBox" v-for="(item,index) in workLists" @click="goToDetail(item.id)">
            <div class="p">
                <div class="left title">{{item.requirementName}}</div>
                <div class="right">{{item.provinceName}}-{{item.cityName}}</div>
            </div>
            <div class="p">
                <div class="left">{{item.workTypeText}}</div>
                <div class="right">{{item.salaryMin}}-{{item.salaryMax}}/日</div>
            </div>
            <div class="dis">{{item.description}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "work-list",
        props: {
            workLists: ''
        },
        methods: {
            goToDetail(id){
                this.$emit('click',id)
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/base";
    .container{
        margin-top: 10px;
        letter-spacing: 1px;
        font-size: 12px;
        color: @appBtnColor;
        line-height: 2;
        .listBox{
            box-shadow: 2px 2px 10px @blueBgColor;
            border-radius: 8px;
            margin: 0 15px 15px 15px;
            padding: 15px;
            .p{
                display: flex;
                flex-flow: row;
                align-items: center;
                .left{
                    flex: 2;
                }
                .title{
                    font-size: 13px;
                    font-weight: bold;
                }
                .right{
                    flex: 1;
                }
            }
            .dis{
                margin-top: 10px;
                padding-top: 10px;
                border-top: 1px dashed @bgColor;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                text-overflow: ellipsis;
                overflow: hidden;
                -webkit-box-orient: vertical;
            }
        }
    }

</style>