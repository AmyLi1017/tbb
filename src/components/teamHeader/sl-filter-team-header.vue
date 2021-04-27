<template>
    <view>
        <msDropdownMenu>
            <msDropdownItem class="row" v-model="value1" :list="list1" :title="'工程类型'"
                            @change="onValChange"></msDropdownItem>
            <msDropdownItemMulti class="row" v-model="value2"
                                 :list="list2" :isMulti="true"
                                 :multiList="multiList" :multiVal="multiVal" :title="'项目地区'"
                                 @change="onMultiValChange"></msDropdownItemMulti>
            <msDropdownItem class="row" v-model="value3" :list="list3" :title="'截止时间'"
                            @change="onValChange"></msDropdownItem>
            <!--<msDropdownItem v-model="value4" :list="list4" :title="'拥有工种'"-->
                            <!--@change="onValChange"></msDropdownItem>-->
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
    import msDropdownItemMulti from '@/components/ms-dropdown/dropdown-item-multi.vue'
    import api from '@/net/api'

    export default {
        components: {msDropdownMenu, msDropdownItem,msDropdownItemMulti},
        props: {
            menuList1: '',
            menuList2: '',
            menuList3: '',
            val1: '',
            val2: '',
            val3: '',
            valMulti: '',
        },
        data() {
            return {
                list1: this.menuList1,
                list2: this.menuList2,
                list3: this.menuList3,
                multiList: '',
                value1: this.val1,
                value2: this.val2,
                value3: this.val3,
                multiVal: this.multiVal,
                lazyList: [],
            }
        },

        mounted() {
            this.getProvinceChange(this.value2)
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
                let valArr = [];
                valArr.push(this.value1);
                valArr.push(this.value2);//provinceId
                valArr.push(this.value3);
                valArr.push(this.multiVal);//cityId
                this.$emit('change', valArr)
            },
            onMultiValChange(val,type){
                switch (type) {
                    case 1:
                        this.getProvinceChange(val);
                        break;
                    case 2:
                        this.multiVal = val;
                        let valArr = [];
                        valArr.push(this.value1);
                        valArr.push(this.value2);//provinceId
                        valArr.push(this.value3);
                        valArr.push(this.multiVal);//cityId
                        this.$emit('change', valArr);
                        break;
                }
            },
            //查询区县
            getProvinceChange(value){
                let options = [];
                let resOptions = [];
                if (value !== '') {
                  api.postRegion({level: '',proId: value}).then(res => {
                    if (res.messageId == 1000) {
                      resOptions = res.body;
                      for(let i = 0,len = resOptions.length; i < len; i++) {
                        let obj = {
                          value: '',
                          text: '',
                        };
                        obj.value = resOptions[i].id;
                        obj.text = resOptions[i].regionName;
                        options.push(obj)
                      }
                      this.multiList = options;
                    }
                  });
                }
            },

        },
        watch: {
            menuList1: {
                immediate: true,
                handler(val){this.list1 = val},
                deep: true
            },
            menuList2: {
                immediate: true,
                handler(val){this.list2 = val},
                deep: true
            },
            menuList3: {
                immediate: true,
                handler(val){this.list3 = val},
                deep: true
            },
            val1: {
                immediate: true,
                handler(val){this.value1 = val},
                deep: true
            },
            val2: {
                immediate: true,
                handler(val){this.value2 = val},
                deep: true
            },
            val3: {
                immediate: true,
                handler(val){this.value3 = val},
                deep: true
            },
            valMulti: {
                immediate: true,
                handler(val){this.multiVal = val},
                deep: true
            },
        },
    }
</script>

<style lang="less">
    @import "../../assets/base";

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
    .row{
        flex: 1;
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
