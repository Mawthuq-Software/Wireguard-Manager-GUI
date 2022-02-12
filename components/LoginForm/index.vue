<template>
  <div class="p-4 bg-background rounded flex-row">
    <div>
      <Input
        label="Username"
        placeholder="john.doe@wgmanager.com"
        type="text"
        @data-change="updateUsername"
      />
    </div>
    <div class="pt-4">
      <Input
        label="Password"
        placeholder="**********"
        type="password"
        @data-change="updatePassword"
      />
    </div>
    <div class="pt-4 flex justify-between">
      <Checkbox label="Remember Me" />
      <a href="" class="text-white">Forgot Password?</a>
    </div>
    <div class="pt-11 flex justify-end">
      <Button label="Login" @btn-click="loginCall" />
    </div>
  </div>
</template>
<script>
import Button from '../Button'
import Input from '../Input'
import Checkbox from '../Checkbox'
export default {
  name: 'LoginForm',
  components: {
    Button,
    Input,
    Checkbox,
  },
  props: {},
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    updateUsername(name) {
      this.username = name
    },
    updatePassword(pass) {
      this.password = pass
    },
    loginCall() {
      this.$emit('login-click', this.username, this.password)
    },
  },
}
</script>
