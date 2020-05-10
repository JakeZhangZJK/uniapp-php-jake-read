<template>
	<view>
		写作。。。
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
			loginRes = this.checkLogin('../write/write', '2');
			if (!loginRes) {
				return false
			}
		}
	}
</script>

<style>

</style>
