<template>
    <div class="content">
        <div class="p">
            <div class="lf name">项目名称</div>
            <div class="rt val">{{projectData.projectName}}</div>
        </div>
        <div class="p">
            <div class="lf name">项目地区</div>
            <div class="rt val">{{projectData.provinceName}}-{{projectData.cityName}}</div>
        </div>
        <div class="p">
            <div class="lf name">详细地址</div>
            <div class="rt val">{{projectData.detailAddr}}</div>
        </div>
        <div class="p">
            <div class="lf name">工程类型</div>
            <div class="rt val">{{projectData.typeName}}</div>
        </div>
        <div class="p">
            <div class="lf name">项目描述</div>
            <div class="rt val">{{projectData.description}}</div>
        </div>
        <div class="p">
            <div class="lf name">发布时间</div>
            <div class="rt val">{{projectData.createTime}}</div>
        </div>
        <div class="p">
            <div class="lf name">截止时间</div>
            <div class="rt val">{{projectData.endTime}}</div>
        </div>
        <div class="p" v-if="projectData.suitTime">
            <div class="lf name">定标时间</div>
            <div class="rt val">{{projectData.suitTime}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "project-detail",
        props: {
            projectData: ''
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/base";

    .content{
        padding: 0 20px;
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