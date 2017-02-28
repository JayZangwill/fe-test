window.onload = function() {
	let vm = new Vue({
		el: "#app",
		data: {
			title: {},
			loading: true
		},
		created() {
			this.$http.get('https://cnodejs.org/api/v1/topics').then((response) => {
				this.title = response.data.data;
				this.loading = false;
			}, (response) => {
				console.log(response);
			});
		},
		methods: {
			reload: function() {
				window.location.reload();
			}
		}
	});
	Vue.filter("content", (value) => {
		let reg = /([\u4e00-\u9fa5])/g,
			val = "";
		while(reg.exec(value)) {
			val += RegExp.$1;
		}
		if(val.length > 43) {
			return val.slice(0, 43) + "......";
		}
		return val;
	});
	Vue.filter("date", (value) => {
		let reg = /(\d+\-\d+)T(\d+\:\d+\:\d+)/g,
			result = "";
		reg.test(value) && (result = `${RegExp.$1} ${RegExp.$2}`);
		return result;
	});
}