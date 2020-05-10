<template>
	<view class="content">
		首页。。。
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() { 
			uni.request({
				url: this.apiServer + 'index&m=index',
				method: 'GET',
				data: {},
				success: res => {
					console.log(JSON.stringify(res));
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {

		}
	}
</script>

<style>
	
</style>
