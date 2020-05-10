import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.checkLogin = function(backpage, backtype){// 判断用户是否登陆成功
	var SUID  = uni.getStorageSync('SUID');
	var SRAND = uni.getStorageSync('SRAND');
	var SNAME = uni.getStorageSync('SNAME');
	var SFACE = uni.getStorageSync('SFACE');
	if(SUID == '' || SRAND == '' || SFACE == ''){
		uni.redirectTo({url:'../login/login?backpage='+backpage+'&backtype='+backtype});
		return false;
	}
	return [SUID, SRAND, SNAME, SFACE];// 已经登录返回数组 [用户 id, 用户随机码, 用户昵称, 用户表情]
}

var APITOKEN  = 'api2018';
Vue.prototype.apiServer = 'http://192.168.3.72/index.php?token='+APITOKEN+'&c=';

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
