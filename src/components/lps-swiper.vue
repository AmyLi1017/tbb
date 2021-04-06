<template>
	<view class="my-plan-style">
		<!-- 3D轮播 -->
		<view class="">
			<swiper class="imageContainer" @change="handleChange" previous-margin="10rpx" next-margin="10rpx" circular  autoplay>
				<block v-for="(item,index) in imgList" :key="index">
					<swiper-item class="swiperitem">
						<image class="itemImg" :class="currentIndex == index ? 'swiperactive': ''" :src="item.href" lazy-load mode="widthFix"></image>
					</swiper-item>
				</block>
			</swiper>
			<view class="pointbox" v-if="isPoint&&imgList.length>1">
				<block v-for="(item,index) in imgList" :key="index">
					<view class="point" :class="currentIndex == index ? 'pointactive': ''"></view>
				</block>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'swiper-bar',
		props: { 
		  /**
		   * 固定到页面顶部
		   */
		  imgList: {
		    type: Array,
		    default: ()=>[]
				
		  },
		  isPoint: {
		    type: Boolean,
		    default: false		
		  },
		},
		data() {
			return {
				currentIndex:0
			};
		},
		computed: {
	
		},
		methods: {
			 handleChange(e){
				 this.currentIndex = e.detail.current;
			 }
		}
	}	
</script>
<style lang="less">
	.pointbox{
		height: 40px;
		line-height: 40px;
		margin-top: 0;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.point{
		width: 8px;
		height: 8px;
		background: #FBB717;
		border-radius: 50%;
		margin-left: 20px;
		align-self: center;
	}
	.pointactive{
		width:40px;
		height:16px;
		background:#FBB717;
		border-radius: 12px;
		align-self: center;

	}
	// 3D轮播样式
	.imageContainer {
		width: 100%;
		/* height: 500rpx; */
		/* background: #000; */
		height: 215px;
	}
	
	.swiperitem {
		/* height: 500rpx; */
		height: 255px;
		padding: 0;
		box-sizing: border-box;
		position: relative;
		.swiperText {
			display: flex;
			flex-direction: column;
			align-items: center;
			position: absolute;
			top: 56px;
			left: 51px;
			z-index: 998;
			width:162px;
			height:163px;
			background:rgba(255,255,255,1);
			border-radius:8px;
			padding:10px;
			.name {
				font-size:26px;
				font-weight:500;
				color:rgba(253,57,91,1);
				line-height:37px;
				margin-bottom: 10px;
			}
			.zq,.cz {
				font-size:20px;
				color:rgba(253,57,91,1);
				line-height:35px;
			}
			.addNl {
				width:120px;
				height:26px;
				background:rgba(253,57,91,1);
				border-radius:13px;
				font-size:20px;
				font-weight:500;
				color:rgba(255,255,255,1);
				text-align: center;
				line-height: 26px;
				margin-top: 10px;
			}
			
		}
	}
	
	.itemImg {
		/*position: absolute;*/
		width: 95%;
		/* height: 380rpx; */
		height: 255px;
		border-radius: 15px;
		z-index: 5;
		opacity: 0.7;
		top: 5%; 
		box-shadow:0px 4px 15px 0px rgba(153,153,153,0.24);
	}
	
	.swiperactive {
		z-index: 10;
		width: 96%;
		opacity: 1;
		margin: 0 2%;
		//height: 430rpx; 
		height: 300px;
		top: 0%;
		transition: all .2s ease-in 0s;
	}
	
	.zhankai{
		text-align: center;
		.iconfont{
			margin-left: 10px;
		}
	}
</style>