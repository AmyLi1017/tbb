<template>
    <view class="upFile" >
        <view class="media" v-if="!fileType">
            <view v-if="!type" class="multiple">
                <view class="imageList">
                    <view class="imageItem" v-for="(item,index) in fileList" :key='index'>
                        <image :style="{
							width:width,
							height:height
						}"  :src="item[valueKey] " @click="seeImage(index)" mode="aspectFill"></image>
                        <view class="close" @click="removeFile('multiple',index)"  v-if="compile">
                            <image :src="closeImg"></image>
                        </view>
                    </view>
                    <view class="addFile" v-if="compile">
                        <image :style="{
							width:width,
							height:height
						}" :src="background" mode="上传文件" @click="uploadFile('multiple')"></image>
                        <text>{{upImgText}}</text>
                    </view>
                </view>
            </view>
            <view v-else class="single">
                <view :style="{
						width:width,
						height:height
					}" class="addFile" >
                    <image mode="aspectFill" :src="fileList[0] && fileList[0][valueKey] || background" @click="uploadFile('single')"></image>
                    <view class="close" @click="removeFile('single')" v-if="fileList.length && compile" >
                        <image :src="closeImg"></image>
                    </view>
                </view>
            </view>
        </view>
        <view class="accessory" v-else>

        </view>
    </view>
</template>

<script>
    export default {
        name: "upLoadFile",
        data(){
            return {
                // 文件列表
                fileList:[],
                // 删除的文件id
                removeList:[],
            }
        },
        props:{
            config:{
                type: Object,
                default:{
                    count:1,         							// 上传图片张数
                    sizeType: ['original','compressed'], 				// original 原图，compressed 压缩图，默认二者都有
                    sourceType:	['album','camera'],								// album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
                }
            },
            // 0 表示媒体文件 1 附件  默认为0
            fileType:{
                type: Number,
                default: 0,
            },
            // 0 表示上传多张图片模式 1 表示上传一张模式  当type设置为1时count无效
            type:{
                type: Number,
                default: 0,
            },
            // 上传图片的背景
            background:{
                type: String,
                default:'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-hglbk3dir3rbd07f5a/2efd0ea0-5718-11eb-8a36-ebb87efcf8c0.png',
            },
            // 删除图片
            closeImg:{
                type: String,
                default:'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-14mxvwe8lug756a025/12e55e20-50b0-11eb-b680-7980c8a877b8.png',
            },
            // 0 阿里云上传 1 腾讯云 2 自定义上传  默认为0
            upFileType:{
                type: Number,
                default:0,
            },
            // 展示图片的key
            valueKey:{
                type: String,
                default:'url',
            },
            // 图片的宽度
            width:{
                type: String,
                default:'210px',
            },
            // 图片的高度
            height:{
                type: String,
                default:'210px',
            },
            // 需要展示的图片数组
            values:{
                type: Array,
                default:() => [],
            },
            // true是编辑模式上传 false查看模式只能查看
            compile:{
                type: Boolean,
                default:() => true,
            },
            // 自定义文字
            upImgText:{
                type: String,
                default:() => '上传图片',
            },
        },
        created(){
            this.reset()
        },
        mounted(){
        },
        methods:{
            reset(){
                this.fileList = [...this.values] || []
                this.removeList = []
            },
            updataFile(){
                //前端代码
                uni.chooseImage({
                    count: this.type || this.config.count,
                    sizeType: this.config.sizeType,
                    sourceType: this.config.sourceType,
                    success: (res) => {
                        if (res.tempFiles.length > 0) {
                            switch (this.upFileType){
                                case 1:

                                    break;
                                case 2:
                                    this.$emit('upLoadFile',res)
                                    break;
                                default:
                                    let count = 0
                                    uni.showLoading({
                                        title: '正在上传',
                                        mask:true,
                                    });
                                    let upFile = async (data) => {
                                        if(data.length > count){
                                            console.log(uniCloud,"uniCloud")
                                            const result = await uniCloud.uploadFile({
                                                filePath: data[count].path,
                                                cloudPath: data[count].name || data[count].path.match(/[^\/]+$/)[0],  // 只有h5能获取到图片的名字
                                                onUploadProgress: function(progressEvent) {
                                                    // this.$emit('onUploadProgress',progressEvent)
                                                }
                                            });
                                            this.fileList.push({size:data[count].size,name:data[count].name,[this.valueKey]:result.fileID})
                                            count++
                                            upFile(data)
                                        }else{
                                            uni.hideLoading()
                                            this.fileListChange()
                                        }
                                    }
                                    upFile(res.tempFiles)
                                    break;
                            }

                        }else{
                            uni.showToast({
                                title: '获取图片失败请刷新重试',
                                icon:'none',
                                duration: 2000
                            });
                        }
                    },
                    fail(res){
                        console.log(res)
                        uni.showToast({
                            title: res,
                            icon:'none',
                            duration: 2000
                        });
                    },
                    complete(res){
                    }
                })
            },
            seeImage(index_ = 0){
                let images = []
                this.fileList.forEach(el => {
                    if(/\.(png|jpg|jpeg|gif|webp|svg|webm)$/.test(el[this.valueKey])){
                        images.push(el[this.valueKey])
                    }
                })
                if(images.length){
                    uni.previewImage({
                        urls:images,
                        current:index_
                    })
                }
            },
            uploadFile(type){
                if('single' === type){
                    if(this.fileList.length){
                        this.seeImage()
                        return
                    }
                    this.reset()
                }
                this.updataFile()
            },
            removeFile(type,index){
                if('single' === type){
                    this.removeList = [...this.fileList]
                    this.fileList = []
                }else if('multiple' === type){
                    this.removeList.push(this.fileList[index])
                    this.fileList.splice(index,1)
                }
                this.fileListChange()
            },
            // 当图片上传或者删除时都会触发这个函数
            fileListChange(){
                this.$emit('fileListChange',{
                    fileList:this.fileList,
                    removeList:this.removeList
                })
            }
        }
    }
</script>

<style lang="less">
    .upFile{

        .addFile{
            position: relative;

            image{
                width: 100%;
                height: 100%;
                cursor: pointer;
                border-radius: 6px;
            }

            text{
                left: 50%;
                bottom: 20%;
                position: absolute;
                white-space: nowrap;
                transform: translateX(-50%);
            }
        }

        .imageList{
            padding: 10px 0;

            >view{
                margin-right: 20px;
                margin-bottom: 16px;
                display: inline-block;
            }

            image{
                width: 100%;
                height: 100%;
                border-radius: 10px;
            }

            .imageItem{
                position: relative;
            }

            // .close{
            // 	top: -20px;
            // 	right: 8%;
            // }
        }

        .close{
            width: 40px;
            height: 40px;
            top: -20px;
            right: -20px;
            padding: 10px;
            position: absolute;

        }
    }
</style>