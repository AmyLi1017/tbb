<template>
    <view>
        <msDropdownMenu>
            <msDropdownItem class="row right" v-model="value1" :list="list1" :title="'工种'"
                            @change="onValChange"></msDropdownItem>
            <msDropdownItemMulti class="row left" v-model="value2"
                                 :list="list2" :isMulti="true"
                                 :multiList="multiList" :multiVal="multiVal" :title="'期望城市'"
                                 @change="onMultiValChange"></msDropdownItemMulti>
            <!--<msDropdownItem class="row" v-model="value4" :list="list4" :title="'拥有工种'"-->
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
            val1: '',
            val2: '',
            valMulti: '',
        },
        data() {
            return {
                list1: this.menuList1,
                list2: this.menuList2,
                multiList: '',
                value1: this.val1,
                value2: this.val2,
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
                        valArr.push(this.multiVal);//cityId
                        this.$emit('change', valArr);
                        break;
                }
            },
            //查询区县
            getProvinceChange(value){
                let options = [];
                let resOptions = [];
                api.postRegion({level: '',proId: value}).then(res => {
                    if (res.messageId == 1000) {
                        resOptions = res.body;
                    }
                });

                //测试数据-----------------------------待注释
                if (value == 450000){
                    resOptions = [{
                        id: 450100, //行政区id
                        regionName: "昆明市", //行政区名称
                        provinceSimple: null, // 省简称
                        level: 2 //等级:1省,2市,3区县
                    }, {
                        id: 450200, //行政区id
                        regionName: "玉溪市", //行政区名称
                        provinceSimple: null, // 省简称
                        level: 2 //等级:1省,2市,3区县
                    }];
                }
                if (value == 651654) {
                    resOptions = [{
                        id: 651100, //行政区id
                        regionName: "杭州市", //行政区名称
                        provinceSimple: null, // 省简称
                        level: 2 //等级:1省,2市,3区县
                    }, {
                        id: 651200, //行政区id
                        regionName: "义乌市", //行政区名称
                        provinceSimple: null, // 省简称
                        level: 2 //等级:1省,2市,3区县
                    }];
                }

                for(let i = 0,len=resOptions.length; i < len; i++) {
                    let obj = {
                        value: '',
                        text: '',
                    };
                    obj.value = resOptions[i].id;
                    obj.text = resOptions[i].regionName;
                    options.push(obj)
                }
                this.multiList = options;
                console.log(this.multiList,'isLoadMulti')
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
    .row{
        flex: 1;
    }
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
