<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">使用微信登录</button>
		<!-- #endif -->
	</view>
</template>

<script>
	var _self, pageOptions, session_key, openid;
	var sign = require('../../commons/sign.js');
	export default {
		data() {
			return {

			};
		},

		methods: {
			// #ifdef MP-WEIXIN
			getUserInfo: (info) => {
				info = info.mp.detail.userInfo;
				var sign = uni.getStorageInfoSync('sign');
				// 与服务器交互将数据提交到服务端数据库
				uni.request({
					url: _self.apiServer + 'member&m=login',
					method: 'POST',
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					data: {
						openid: openid,
						name: info.nickName,
						face: info.avatarUrl,
						sign:sign
					},
					success: res => {
						console.log(res);
						res = res.data;
						// 登录成功 记录会员信息到本地
						if (res.status == 'ok') {
							uni.showToast({
								title: "登录成功"
							});
							uni.setStorageSync('SUID', res.data.u_id + '');
							uni.setStorageSync('SRAND', res.data.u_random + '');
							uni.setStorageSync('SNAME', res.data.u_name + '');
							uni.setStorageSync('SFACE', res.data.u_face + '');
							// 跳转
							if (pageOptions.backtype == 1) {
								uni.redirectTo({
									url: pageOptions.backpage
								});
							} else {
								uni.switchTab({
									url: pageOptions.backpage
								});
							}
						} else {
							uni.showToast({
								title: res.data
							});
						}
					},
					fail: (e) => {
						console.log(JSON.stringify(e));
					}
				});

			},
			// #endif
		},
		onLoad: function(options) {
			sign.sign(this.apiServer);
			_self = this;
			pageOptions = options;
			// #ifdef MP-WEIXIN
			// 调用 微信 login 获取 code
			uni.login({
				success: function(res) {
					console.log(res);
					uni.request({
						url: _self.apiServer + 'member&m=codeToSession&code=' + res.code,
						method: 'GET',
						data: {},
						success: res => {
							// console.log(res);
							// 获取 unionId
							session_key = res.data.session_key;
							openid = res.data.openid;
						},
						fail: () => {},
						complete: () => {}
					});
				}
			})
			// #endif
			//app 端微信登录
			// 手册位置 https://uniapp.dcloud.io/api/plugins/login?id=getuserinfo
			// #ifdef APP-PLUS
			uni.login({
				success: (res) => {
					// res 对象格式
					//{"code":"***",
					//"authResult":{
					//"openid":"***",
					//"scope":"snsapi_userinfo",
					//"refresh_token":"**",
					//"code":"****",
					//"unionid":"***",
					//"access_token":"***",
					//"expires_in":7200
					//},
					//"errMsg":"login:ok"}
					uni.getUserInfo({
						success: (info) => {
							// info 对象格式
							// {"errMsg":"getUserInfo:ok",
							// "rawData":"...
							// "userInfo":{
							//"openId":"***",
							//"nickName":"***",
							//"gender":1,
							// "city":"Xi'an",
							// "province":"Shaanxi",
							// "country":"China",
							// "avatarUrl":"头像",
							// "unionId":"oU5Yyt_agt547zWyA0v0eLfFPqxo"
							//},"signature":""}
							// 与服务器交互将数据提交到服务端数据库
							uni.request({
								url: _self.apiServer + 'member&m=login',
								method: 'POST',
								header: {
									'content-type': "application/x-www-form-urlencoded"
								},
								data: {
									openid: info.userInfo.openId,
									name: info.userInfo.nickName,
									face: info.userInfo.avatarUrl,
								},
								success: res => {
									console.log(JSON.stringify(res));
									res = res.data;
									// 登录成功 记录会员信息到本地
									if (res.status == 'ok') {
										uni.showToast({
											title: "登录成功"
										});
										uni.setStorageSync('SUID', res.data.u_id + '');
										uni.setStorageSync('SRAND', res.data.u_random + '');
										uni.setStorageSync('SNAME', res.data.u_name + '');
										uni.setStorageSync('SFACE', res.data.u_face + '');
										// 跳转
										if (options.backtype == 1) {
											uni.redirectTo({
												url: options.backpage
											});
										} else {
											uni.switchTab({
												url: options.backpage
											});
										}
									} else {
										uni.showToast({
											title: res.data
										});
									}
								},
								fail: (e) => {
									console.log(JSON.stringify(e));
								}
							});
						},
						fail: () => {
							uni.showToast({
								title: "微信登录授权失败"
							});
						}
					})
				},
				fail: () => {
					uni.showToast({
						title: "微信登录授权失败"
					});
					uni.hideLoading();
				}
			})
			// #endif
		}
	}
</script>

<style>

</style>
