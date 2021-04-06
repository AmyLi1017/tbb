<template>
    <div class="search-sel">
        <picker @change="bindPickerChange" :value="index" :range="selNames">
            <view class="picker">
                {{options[index].name}}
            </view>
            <span class="iconfont icon-jiantou"></span>
        </picker>
    </div>
</template>

<script>
    export default {
        name: "provinceSel",
        props: {
            options: '',
            selProvinceId: ''
        },
        data: function (){
            return {
                index: 0,
                selId: this.selProvinceId
            }
        },
        computed: {
            selNames(){
                let names = [];
                if (this.options.length > 0){
                    console.log(this.selProvinceId,'selProvinceId');
                    this.options.forEach((item,index) => {
                        if (item.id == this.selProvinceId) {
                            this.index = index;
                        }
                        names.push(item.name)
                    });
                }
                return names;
            }
        },
        methods: {
            bindPickerChange (e) {
                let chooseIndex = e.mp.detail.value;
                this.index = e.mp.detail.value;
                this.$emit('change',this.options[chooseIndex]);
            }
        },
        watch:{
            selProvinceId: {
                immediate: true, // 重要！
                handler (val) {
                    this.selId = val;
                },
                deep: true
            }
        }
    }
</script>

<style scoped lang="less">
    .search-sel{
        display: inline-block;
        width:100%;
        height: 40px;
        padding-left: 10px;
        padding-right: 20px;
        box-sizing: border-box;
        line-height:40px;
        font-size:13px;
        border-radius: 4px;
        background: white;
        position: relative;
        .picker{
            overflow: hidden;
            white-space: nowrap;
            border:none;
        }
        .iconfont{
            position: absolute;
            right: 15px;
            height: 40px;
            top: 0;
            transform: rotate(90deg);
            font-size:13px;
        }
    }
</style>
