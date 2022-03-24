<template>
  <div>
    <div
      :class="outerFormClass"
      :style="{ 'background-image': 'url(./assets/bg.jpg)' }"
    >
      <div class="w-11/12 sm:w-10/12 md:w-6/12 lg:w-5/12 xl:w-4/12">
        <LoginForm @login-click="login" />
      </div>
    </div>
    <div :class="infoAlertClass">
      <div class="w-3/4">
        <Alert :label="infoLabel" :variant="infoType" />
      </div>
    </div>
  </div>
</template>
<script>
import LoginForm from '../LoginForm'
import jsonVal from '../../config.json'
import Alert from '../Alert'

export default {
  name: 'LoginPage',
  components: {
    LoginForm,
    Alert,
  },
  props: {},
  data() {
    return {
      alertOpen: false,
      infoType: 'danger',
      infoLabel: '',
      infoOpen: false,
    }
  },
  computed: {
    outerFormClass() {
      return {
        fixed: true,
        'left-0': true,
        'right-0': true,
        'top-0': true,
        flex: true,
        'items-center': true,
        'justify-center': true,
        'h-full': true,
        'w-full': true,
        'bg-background-light': true,
        'bg-fixed': true,
        'bg-center': true,
        'bg-cover': true,
      }
    },
    infoAlertClass() {
      return {
        fixed: true,
        'items-center': true,
        'justify-center': true,
        'left-0': true,
        'right-0': true,
        'top-0': true,
        'py-4': true,
        'w-full': true,
        flex: true,
        visible: this.infoOpen,
        invisible: !this.infoOpen,
      }
    },
  },
  methods: {
    login(username, password) {
      const authUser = jsonVal.username
      const authPass = jsonVal.password

      if (authUser === username && authPass === password) {
        console.log('OK')
      } else {
        this.infoLabel = 'Username or Password is incorrect'
        this.showBanner('error')
      }
    },
    sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms)
      })
    },
    async showBanner(type) {
      if (type === 'error') {
        this.infoType = 'danger'
      } else {
        this.infoType = 'success'
      }
      this.infoOpen = true
      await this.sleep(3000)
      this.infoOpen = false
    },
  },
}
</script>
