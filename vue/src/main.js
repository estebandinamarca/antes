
// const inicio = { template: '<div>-- inicio --</div>' }
// const Foo = { template: '<div><router-link to="/bar/algo">itemAlgo</router-link></div>' }
// const Bar = { template: '<div>bar</div>' }
// const barAlgo = { template: '<div>Este es barAlgo</div>' }


const routes = [
{ path: '/', component: { template: '#inicio' } },
{ path: '/foo', component: { template: '#Foo' } },
{ path: '/bar', component: { template: '#Bar' } },
{ path: '/bar/algo', component: { template: '#barAlgo' } }
]

const router = new VueRouter({
  //mode: 'history',
  routes // short for routes: routes
})


Vue.prototype.$http = axios

const app = new Vue({
	router,
	// data: function () {
	// 	return {
	// 		info: []
	// 	};
	// },
	methods: {
		getUser: function() {
			this.$http.get('http://httpbin.org/get')
			.then(function(response) {
				this.info = response;
				console.log(response);
			})
			.catch(function(error) {
				console.log(error);
			});
		}
	},
	created: function () {
		this.getUser();
	}

}).$mount('#app')

//app.getUser();