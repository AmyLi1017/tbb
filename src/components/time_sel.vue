<template>
    <div class="search-sel">
        <picker mode="date" :value="date" :start="startTime" :end="endTime" @change="bindDateChange">
            <view class="picker">
                {{date}}
            </view>
        </picker>
    </div>
</template>

<script>
    export default {
        name: "time_sel",
        props: {

        },
        data: function (){
            return {
                date: "",
                start: this.startTime,
                end: ''
            }
        },
        computed: {
            startTime(){
                let myDate = new Date();
                let year = myDate.getFullYear();
                let month = myDate.getMonth() + 1;
                let day = "";
                if (myDate.getDate()<10){
                    day = '0' + myDate.getDate()
                } else {
                    day = myDate.getDate()
                }
                this.date = year + "-" + month + "-" + day;
                return year + "-" + month + "-" + day;
            },
            endTime(){
                let myDate = new Date((new Date()).getTime() + 2592000000);
                console.log('now',new Date().getTime(),"30天后",myDate);
                let year = myDate.getFullYear();
                let month = myDate.getMonth() + 1;
                let day = "";
                if (myDate.getDate()<10){
                    day = '0' + myDate.getDate()
                } else {
                    day = myDate.getDate()
                }
                console.log(year,'year');
                this.end = year + "-" + month + "-" + day;
                return this.end;
            }
        },
        methods: {
            bindDateChange: function (e) {
                console.log('picker发送选择改变，携带值为', e.detail.value);
                this.date = e.detail.value;
                let timestr = this.date.replace(/-/g,'/');
                let timestamp = new Date(timestr).getTime();
                this.$emit('change',timestamp);
            }
        },
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
