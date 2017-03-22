
const inicio = { template: '<div>-- inicio --</div>' }
const Foo = { template: '<div><router-link to="/bar/algo">itemAlgo</router-link></div>' }
const Bar = { template: '<div>bar</div>' }
const barAlgo = { template: '<div>Este es barAlgo</div>' }


const routes = [
  { path: '/', component: inicio },
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
  { path: '/bar/algo', component: barAlgo }
]

const router = new VueRouter({
  //mode: 'history',
  routes // short for routes: routes
})

const app = new Vue({
  router
}).$mount('#app')
