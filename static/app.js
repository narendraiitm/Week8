import home from './components/home.js'
import profile from './components/profile.js'
import login from './components/login.js'

const routes = [
  { path: '/', component: home },
  { path: '/profile/:id', component: profile },
  { path: '/login', component: login },
]

const router = new VueRouter({
  routes,
  base: '/',
})

const app = new Vue({
  el: '#app',
  router,
  methods: {
    async logout() {
      const res = await fetch('/logout')
      if (res.ok) {
        localStorage.clear()
        this.$router.push('/')
      } else {
        console.log('could not logout the user')
      }
    },
  },
})
