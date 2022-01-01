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
        <ValidationText text="USERNAME HAS NO SPACES" :valid="noSpaces"/>
    </div>
    <div class="pt-4">
      <Input
        label="Password"
        placeholder="**********"
        type="password"
        @data-change="updatePassword"
      />
    </div>
    <div class="pt-4">
        <ValidationText text="CONTAINS LOWERCASE LETTER" :valid="lowercase"/>
        <ValidationText text="CONTAINS UPPERCASE LETTER" :valid="uppercase"/>
        <ValidationText text="CONTAINS SYMBOL" :valid="symbol"/>
        <ValidationText text="IS AT LEAST 8 CHARACTERS LONG" :valid="length"/>
    </div>
    <div class="pt-4">
      <Input
        label="Confirm Password"
        placeholder="**********"
        type="password"
        @data-change="updateConfirmPwd"
      />
    </div>
    <div class="pt-4">
        <ValidationText text="PASSWORDS MATCH" :valid="match"/>
    </div>
    <div class="pt-11 flex justify-end">
      <Button label="Register" @btn-click="registerCall" />
    </div>
  </div>
</template>
<script>
import Button from '../Button'
import Input from '../Input'
import ValidationText from '../ValidationText'

export default {
    name: "RegisterForm",
    components: {
    Button,
    Input,
    ValidationText
  },
  props: {},
  data() {
    return {
        username: '',
        noSpaces: false,
        password: '',
        confirmPwd: '',
        lowercase: false,
        uppercase: false,
        symbol: false,
        length: false,
        match: false
    }
  },
  watch: {
    username() {
        this.noSpaces = /^[^\s]+$/.test(this.username)
    },
    password(){
        this.lowercase = /[a-z]/.test(this.password);
        this.uppercase = /[A-Z]/.test(this.password);
        // eslint-disable-next-line no-useless-escape
        this.symbol   = /\W/.test(this.password);
        this.length = (this.password.length > 7);
        this.validationCheck()
    },
    confirmPwd() {
        this.validationCheck()
    }
  },
  methods: {
    updateUsername(name) {
      this.username = name
    },
    updatePassword(pass) {
      this.password = pass
    },
    updateConfirmPwd(pass){ 
        this.confirmPwd = pass
    },
    validationCheck() {
        if (this.confirmPwd === this.password && this.password.length > 7) {
            this.match = true;
        } 
        else {
            this.match = false;
        }
    },
    registerCall() {
      // this needs to be programmed
    },
  }
}
</script>


