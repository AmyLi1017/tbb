<template>
    <div class="dropdown-item">
        <!-- selected -->
        <view class="dropdown-item__selected"
              @click="changePopup">
            <slot name="title" v-if="$slots.title"></slot>
            <block v-else>
                <view class="selected__name">{{title ? title : selectMultiItem.text}}</view>
                <view class="selected__icon"
                      :class="showClass === 'show'? 'up' : 'down'"
                >
                    <span class="iconfont">&#xe851;</span>
                </view>
            </block>
        </view>
        <view class="dropdown-item__content" :style="{top: contentTop + 'px'}" v-if="showList">
            <!-- dropdown -->
            <view :class="['list', showClass]">
                <slot v-if="$slots.default"></slot>
                <block v-else>
                    <view class="list__option" :class="item.value === value?'sel_bg':''"
                          v-for="(item, index) in list"
                          :key="index"
                          @click="choose(item,1)">
                        <view>{{item.text}}</view>
                        <icon v-if="item.value === value" type="success_no_circle" size="26"/>
                    </view>
                </block>
            </view>
            <view :class="['list', showClass]" class="right">
                <slot v-if="$slots.default"></slot>
                <block v-else>
                    <view class="list__option"
                          v-for="(item, index) in multiList"
                          :key="index"
                          @click="choose(item,2)"
                          v-if="isMulti">
                        <view>{{item.text}}</view>
                        <icon v-if="item.value === multiVal" type="success_no_circle" size="26"/>
                    </view>
                </block>
            </view>
            <!-- dropdown-mask -->
            <view :class="['dropdown-mask', showClass]" v-if="showList" @click="closePopup"></view>
            <!-- <view class="dropdown-mask-all" v-if="showList"></view> -->
        </view>
    </div>
</template>

<script>
    export default {
        components: {
        },
        props: {
            value: [Number, String, Object],
            multiVal: '',
            list: {
                type: Array,
                default: ()=> {
                    return []
                }
            },
            multiList: {
                type: Array,
                default: ()=> {
                    return []
                }
            },
            isMulti: '',
            title: [Number, String]
        },
        data() {
            return {
                showList: "",
                showClass: '',
                selectItem: {},
                selectMultiItem: {},
                contentTop: 0,
                multiLists: this.multiList,
                multiValue: this.multiVal
            }
        },
        watch: {
            multiList: {
                immediate: true,
                handler(val){this.multiLists = val;console.log(val,'watchMulti')},
                deep: true
            },
            multiVal: {
                immediate: true,
                handler(val){this.multiValue = val;console.log(val,'watchMultiVal')},
                deep: true
            },

        },
        mounted() {
            this.showList = this.active;
            this.selectItem = this.list[this.value] || {};
            this.selectMultiItem = this.multiLists[this.multiValue] || {};
        },
        methods: {
            choose(item,listType) {
                switch (listType) {
                    case 1:
                        this.selectItem = item;
                        this.$emit('input', item.value);
                        this.$emit('change', item.value,1);//回传省份选择结果
                        break;
                    case 2:
                        this.selectMultiItem = item;
                        this.$emit('change', item.value,2);//回传市区选择结果
                        this.closePopup();
                        break;
                }
            },
            changePopup() {
                if(this.showList) {
                    this.closePopup()
                } else {
                    this.openPopup()
                }
            },
            openPopup() {
                // this.$parent  -> dropdown-menu
                this.$parent.$emit('close')
                this.showList = true
                this.$nextTick(() => {
                    this.getElementData('.dropdown-item__selected', (data)=>{
                        this.contentTop = data[0].bottom
                        this.showClass = 'show'
                    })
                })
            },
            closePopup() {
                this.showClass = ''
                setTimeout(() => {
                    this.showList = false
                }, 300)
            },
            close() {
                this.showClass = ''
                this.showList = false
            },
            getElementData(el, callback){
                uni.createSelectorQuery().in(this).selectAll(el).boundingClientRect().exec((data) => {
                    callback(data[0]);
                });
            },
            moveHandle(){}
        }
    }
</script>

<style lang="less">
    @import "../../assets/base";
    @font-face {
        font-family: 'iconfont';  /* project id 1564327 */
        src: url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.eot');
        src: url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.eot?#iefix') format('embedded-opentype'),
        url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.woff2') format('woff2'),
        url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.woff') format('woff'),
        url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.ttf') format('truetype'),
        url('https://at.alicdn.com/t/font_1564327_fcszez4n5i.svg#iconfont') format('svg');
    }
    .iconfont{
        font-family:"iconfont" !important;
        font-size:24rpx;
        font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }
    .dropdown-item {
        width: 100%;
        flex:1;
        position: relative;
        color: #0D0F35;
        &__selected {
            position: relative;
            display: flex;
            align-items: center;
            background: #fff;
            padding: 26rpx 20rpx 20rpx 20rpx;
            box-sizing: border-box;
            justify-content: center;
            .selected__name {
                font-size: 24rpx;
            }
            .selected__icon {
                margin-left: 20rpx;
                &.down {
                    transition: transform .3s;
                    transform: rotateZ(0);
                }
                &.up {
                    transition: transform .3s;
                    transform: rotateZ(-180deg);
                }
            }
        }
        &__content {
            position: fixed;
            left: 0;
            right: 0;
            overflow: hidden;
            top: 0;
            bottom: 0;
            z-index: 1;
            display: flex;
            flex-flow: row;
            .list {
                max-height: 400px;
                overflow-y: auto;
                position: absolute;
                flex: 1;
                width: 50%;
                z-index: 1000;
                background: #fff;
                transform: translateY(-100%);
                transition: all .3s;
                &.show {
                    transform: translateY(0);
                }
                &.right{
                    right: 0;
                    border-left: 1px solid #DDDDDD;
                    box-sizing: border-box;
                    height: 280px;
                }
                &__option {
                    font-size:24rpx;
                    padding: 26rpx 28rpx;
                    display: flex;
                    justify-content: space-between;
                    flex: 1;
                    &:not(:last-child) {
                        border-bottom: 1rpx solid #DDDDDD;
                    }
                    &.sel_bg{
                        background: @appBtnColor;
                        color: white;
                    }
                }
            }
            .dropdown-mask {
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                transition: all .3s;
                z-index: 999;
                &.show {
                    background:rgba(0,0,0,0.5);
                }
            }
        }
        .dropdown-mask-all {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 998;
        }
        &:not(:last-child):after {
            content: ' ';
            position: absolute;
            width: 2rpx;
            top: 36rpx;
            bottom: 36rpx;
            right: 0;
            background: #0D0F35;
        }
    }
</style>
