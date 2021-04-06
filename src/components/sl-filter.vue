<template>
    <view>
        <msDropdownMenu>
            <msDropdownItem v-model="value1" :list="list" @change="onValChange"></msDropdownItem>
            <!--<msDropdownItem v-model="value2" :list="list">-->
                <!--<view slot="title">-->
                    <!--<view class="dropdown-item-title">-->
                        <!--<view class="title">自定义title</view>-->
                        <!--<view class="btn">打开</view>-->
                    <!--</view>-->
                <!--</view>-->
            <!--</msDropdownItem>-->
            <!-- <msDropdownItem v-model="value3" :hasSlot="true" title="自定义下拉框内容" ref="dropdownItem">
                <view class="dropdown-item-content">
                    <view>=====此为测试内容=====</view>
                    <view class="btn" @click="choose">输出：test</view>
                    <view class="btn" @click="close">关闭</view>
                </view>
            </msDropdownItem> -->
        </msDropdownMenu>
        <!--<view>输出：{{value1}}</view>-->
        <!--<view>输出：{{value2}}</view>-->
        <!--<view>输出：{{value3}}</view>-->

        <!--<view class="btn" @click="getData()">异步加载数据</view>-->
        <!--<msDropdownMenu>-->
            <!--<msDropdownItem v-model="value4" :list="lazyList"></msDropdownItem>-->
        <!--</msDropdownMenu>-->

    </view>
</template>

<script>
    import msDropdownMenu from '@/components/ms-dropdown/dropdown-menu.vue'
    import msDropdownItem from '@/components/ms-dropdown/dropdown-item.vue'
    export default {
        components: {msDropdownMenu, msDropdownItem},
        props: {
            menuList: '',
            themeColor: ''
        },
        data() {
            return {
                list: this.menuList,
                value1: 0,
                value2: 1,
                value3: 'init',
                lazyList: [],
                value4: '',
            }
        },
        watch: {
            menuList: {
                immediate: true,
                handler(val){this.list = val},
                deep: true
            }
        },
        mounted() {
        },
        methods: {
            choose() {
                let obj = {
                    value: 'test'
                }
                this.$refs.dropdownItem.choose(obj)
            },
            close() {
                this.$refs.dropdownItem.closePopup()
            },
            getData() {
                this.lazyList = this.list
            },
            onValChange(val){
                this.$emit('change', val)
            }
        }
    }
</script>

<style lang="less">
    @import "../assets/base";

    .dropdown-item-content {
        padding: 20rpx;
        .btn {
            background: @appBtnColor;
            background: #007aff;
            color: #fff;
            padding: 20rpx;
            display: inline-block;
            border-radius: 10rpx;
        }
    }
    .dropdown-item-title {
        display: flex;
        .title {
            color: red;
        }
        .btn {
            font-size: 24rpx;
            background: @appBtnColor;
            background: #007aff;
            color: #fff;
            padding: 10rpx;
            display: inline-block;
            border-radius: 10rpx;
        }
    }

</style>
