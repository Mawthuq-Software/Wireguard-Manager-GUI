<template>
  <div class="bg-background rounded">
    <div class="p-4">
      <div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-white float-right cursor-pointer"
            @click="closeClicked"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </div>
      </div>
      <div class="pt-2">
        <p class="text-white font-bold">Bandwidth Used: {{ bwUsed }} MB</p>
        <p class="text-white font-bold pt-1">
          Bandwidth Limit: {{ bwLimit }} MB
        </p>
      </div>
      <div class="pt-4">
        <Input
          :placeholder="'(0 for unlimited)'"
          :label="'Bandwidth (Megabytes)'"
          :type="'number'"
          :error="bwFieldError"
          @data-change="updateBW"
        />
      </div>
      <div class="pt-8 pb-4 flex flex-wrap gap-4">
        <Button :label="'Set Bandwidth'" @btn-click="setBWAPI" />
        <Button :label="'Reset Bandwidth'" @btn-click="resetBWAPI" />
        <Button
          :label="'Delete Key'"
          variant="danger"
          @btn-click="deleteKeyAPI"
        />
        <Button
          :label="'Enable/Disable Key'"
          variant="warning"
          @btn-click="enableDisableKey"
        />
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
import Input from '../Input'
import Button from '../Button'
// import Dropdown from '../Dropdown'
import Alert from '../Alert'
import jsonVal from '../../config.json'

export default {
  name: 'ModifyKeyForm',
  components: {
    Input,
    Button,
    // Dropdown,
    Alert,
  },
  props: {
    serverID: {
      type: String,
      default: '',
    },
    keyID: {
      type: Number,
      default: 1000000,
    },
    keyEnabled: {
      type: String,
      default: '',
    },
    bwLimit: {
      type: String,
      default: '',
    },
    bwUsed: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      bw: '',
      bwFieldError: false,
      formOpen: false,
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
        'bg-black': true,
        'bg-opacity-50': true,
        visible: this.formOpen,
        invisible: !this.formOpen,
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
    submit() {
      if (this.bw < 0 || this.bw === '') {
        this.bwFieldError = true
      } else {
        this.bwFieldError = false
      }
      if (this.privKey === '') {
        this.privKeyError = true
      } else {
        this.privKeyError = false
      }
      if (this.pubKey === '') {
        this.pubKeyError = true
      } else {
        this.pubKeyError = false
      }
      if (this.preKey === '') {
        this.preKeyError = true
      } else {
        this.preKeyError = false
      }
      if (
        this.bw >= 0 &&
        this.privKey !== '' &&
        this.preKey !== '' &&
        this.pubKey !== ''
      ) {
        // this.$emit(
        //   'data-change',
        //   this.privKey,
        //   this.pubKey,
        //   this.preKey,
        //   this.bw
        // )
        this.apiCall()
      }
    },
    updateBW(bw) {
      this.bw = bw
    },
    sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms)
      })
    },
    closeClicked() {
      this.$emit('closeKeyGen')
    },
    closeModifyKeyForm() {
      this.formOpen = false
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
    async setBWAPI() {
      const serverURL = jsonVal.directAccess[this.serverID].url
      const serverAuth = jsonVal.directAccess[this.serverID].auth

      try {
        const res = await this.$axios.post(
          serverURL + '/manager/subscription/edit',
          {
            keyID: String(this.keyID),
            bwLimit: Number(this.bw),
            subExpiry: '-1',
            bwReset: false,
          },
          {
            headers: {
              authorization: serverAuth,
            },
            timeout: 3000,
          }
        )

        const response = res.data.response
        if (res.status === 202) {
          this.closeServerInput = true
          this.showBanner('success')
          this.infoLabel = response

          this.$emit('success-change')
          this.closeClicked()
        }
      } catch (err) {
        if (err.response) {
          this.infoLabel = err.response.data.response
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        } else {
          this.infoLabel = 'Unable to connect to server.'
        }
        this.showBanner('error')
      }
    },
    async resetBWAPI() {
      const serverURL = jsonVal.directAccess[this.serverID].url
      const serverAuth = jsonVal.directAccess[this.serverID].auth

      try {
        const res = await this.$axios.post(
          serverURL + '/manager/subscription/edit',
          {
            keyID: String(this.keyID),
            bwLimit: -1,
            subExpiry: '-1',
            bwReset: true,
          },
          {
            headers: {
              authorization: serverAuth,
            },
            timeout: 3000,
          }
        )
        const response = res.data.response

        if (res.status === 202) {
          this.closeServerInput = true
          this.showBanner('success')
          this.infoLabel = response

          this.$emit('success-change')
          this.closeClicked()
        }
      } catch (err) {
        if (err.response) {
          this.infoLabel = err.response.data.response
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        } else {
          this.infoLabel = 'Unable to connect to server.'
        }
        this.showBanner('error')
      }
    },
    async deleteKeyAPI() {
      const serverURL = jsonVal.directAccess[this.serverID].url
      const serverAuth = jsonVal.directAccess[this.serverID].auth

      try {
        const res = await this.$axios.delete(serverURL + '/manager/key', {
          headers: {
            authorization: serverAuth,
            'Content-Type': 'application/json',
          },
          timeout: 3000,
          data: {
            keyID: String(this.keyID),
          },
        })
        const response = res.data.response
        if (res.status === 202) {
          this.closeServerInput = true
          this.showBanner('success')
          this.infoLabel = response

          this.$emit('success-change')
          this.closeClicked()
        }
      } catch (err) {
        if (err.response) {
          this.infoLabel = err.response.data.response
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        } else {
          this.infoLabel = 'Unable to connect to server.'
        }
        this.showBanner('error')
      }
    },
    async enableDisableKey() {
      const serverURL = jsonVal.directAccess[this.serverID].url
      const serverAuth = jsonVal.directAccess[this.serverID].auth

      let path = '/manager/key/'
      if (this.keyEnabled === 'false') {
        path = path + 'enable'
      } else if (this.keyEnabled === 'true') {
        path = path + 'disable'
      }
      try {
        const res = await this.$axios.post(
          serverURL + path,
          {
            keyID: String(this.keyID),
          },
          {
            headers: {
              authorization: serverAuth,
            },
            timeout: 3000,
          }
        )
        const response = res.data.response

        if (res.status === 202) {
          this.closeServerInput = true
          this.showBanner('success')
          this.infoLabel = response

          this.$emit('success-change')
          this.closeClicked()
        }
      } catch (err) {
        if (err.response) {
          this.infoLabel = err.response.data.response
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        } else {
          this.infoLabel = 'Unable to connect to server.'
        }
        this.showBanner('error')
      }
    },
  },
}
</script>
