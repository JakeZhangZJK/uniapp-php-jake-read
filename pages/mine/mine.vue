<template>
	<view>
		我的。。。
	</view>
</template>

<script>
	var loginRes 
	export default {
		data() {
			return {

			};
		},
		onLoad: function() {
			loginRes = this.checkLogin('../mine/mine', '2');
			if (!loginRes) {
				return false
			}
		}
	}
</script>

<style>

</style>
