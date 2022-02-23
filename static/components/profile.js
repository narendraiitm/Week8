const profile = {
  template: `<div>
    <div v-if="success">
    <h1> Username: {{profile.username}}</h1>
    <h2>Email: {{profile.email}}</h2>
    <h3>{{$route.params.id}}</h3>
    </div>
    <div v-else>
       {{error}}
    </div>
  </div>`,

  data() {
    return {
      profile: {
        username: 'Abhisek',
        email: 'narendra@gmail.com',
      },

      success: true,
      error: 'Something went wrong',
    }
  },

  async mounted() {
    const res = await fetch(`/api/users/${this.$route.params.id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authentication-Token': localStorage.getItem('auth-token'),
        //   'WyI4MzI1YThmNjc3NzE0MTdlYWNiOTQ1YmI3OTg2OTExNCJd.YhTcgg.hu9X8B-RDH_v_FXNscFiuie-IoM',
      },
    })
    const data = await res.json()
    console.log(data)
    if (res.ok) {
      this.profile = data
    } else if (res.status == 401) {
      this.success = false
      this.error = data.response.error
    } else {
      this.success = false
      this.error = data.message
    }
  },
}

export default profile
