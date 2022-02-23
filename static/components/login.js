const login = {
  template: `
    <form action=''>
      <input type='text' name='email' id='email' placeholder='email' v-model="formData.email"/>
      <input type='password' name='password' placeholder='password' v-model="formData.password"/>
      <button @click.prevent="loginUser"> Login </button>
    </form>
  `,

  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
    }
  },

  methods: {
    async loginUser() {
      const res = await fetch('/login?include_auth_token', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.formData),
      })

      if (res.ok) {
        const data = await res.json()
        localStorage.setItem(
          'auth-token',
          data.response.user.authentication_token
        )
        this.$router.push('/profile/1')
      } else {
        console.log('something went wrong')
      }
    },
  },
}

export default login
