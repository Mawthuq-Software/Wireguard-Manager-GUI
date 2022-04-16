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
        <Dropdown
          label="Server"
          :items="servers"
          @item-selected="serverSelection"
        />
        <div class="pt-6">
          <Input
            :placeholder="shownPriv"
            :label="'Private Key'"
            :type="'text'"
            :error="privKeyError"
            :disabled="true"
          />
        </div>
        <div class="pt-2">
          <Input
            :placeholder="pubKey"
            :label="'Public Key'"
            :type="'text'"
            :error="pubKeyError"
            :disabled="true"
          />
        </div>
        <div class="pt-2">
          <Input
            :placeholder="shownPre"
            :label="'Preshared Key'"
            :type="'text'"
            :error="preKeyError"
            :disabled="true"
          />
        </div>
        <div class="pt-4">
          <Button :label="'Generate keys'" @btn-click="genKeys" />
        </div>
      </div>
      
      <div class="pt-6">
        <Input
          :placeholder="'(0 to disable)'"
          :label="'Bandwidth (Megabytes)'"
          :type="'number'"
          :error="bwFieldError"
          @data-change="updateBW"
        />
      </div>
      <div class="pt-8 pb-4">
        <Button :label="'Submit'" @btn-click="submit" />
      </div>
    </div>
    <div :class="outerFormClass">
      <div>
        <no-ssr>
          <KeyDownload
            id="formID"
            :config-props="dataObj"
            @closeKeyGen="closeDownloadForm"
          />
        </no-ssr>
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
import KeyDownload from '../KeyDownload'
import Alert from '../Alert'
import jsonVal from '../../config.json'

import {
  generatePresharedKey,
  generatePrivateKey,
  generatePublicKey,
  keyToBase64,
} from '../../static/keygen'
export default {
  name: 'KeyGeneratorForm',
  components: {
    Input,
    Button,
    // Dropdown,
    KeyDownload,
    Alert,
  },
  data() {
    return {
      privKey: '',
      shownPriv: '',
      pubKey: '',
      preKey: '',
      shownPre: '',
      bw: '',
      bwFieldError: false,
      pubKeyError: false,
      privKeyError: false,
      preKeyError: false,
      formOpen: false,
      formID: 123,
      dataObj: {},
      infoType: 'danger',
      infoLabel: '',
      infoOpen: false,
      servers: [],
      serverSelected: '',
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
  created() {
    this.getServers()
  },

  methods: {
    async genPubPrivKey() {
      this.shownPriv = ''
      for (let i = 0; i < 10; i++) {
        await this.sleep(75)

        const privKeyArray = generatePrivateKey()
        const pubKeyArray = generatePublicKey(privKeyArray)

        this.privKey = keyToBase64(privKeyArray)
        this.pubKey = keyToBase64(pubKeyArray)
        this.shownPriv += '****'
      }
    },
    async genPreKey() {
      this.shownPre = ''
      for (let i = 0; i < 10; i++) {
        await this.sleep(75)
        const preKeyArray = generatePresharedKey()
        this.preKey = keyToBase64(preKeyArray)
        this.shownPre += '****'
      }
    },
    genKeys() {
      this.genPubPrivKey()
      this.genPreKey()
    },
    submit() {
      if (this.serverSelected === '') {
        return
      }
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
        this.apiCall()
      }
    },
    async apiCall() {
      const server = this.serverSelected
      if (server === '') {
        return
      }
      const serverURL = jsonVal.directAccess[server].url
      const serverAuth = jsonVal.directAccess[server].auth
      try {
        const res = await this.$axios.post(
          serverURL + '/manager/key',
          {
            publicKey: this.pubKey,
            presharedKey: this.preKey,
            bwLimit: Number(this.bw),
            subExpiry: '2099-Oct-10 12:39:05 PM',
            ipIndex: 0,
          },
          {
            headers: {
              authorization: serverAuth,
            },
            timeout: 3000
          }
        )
        const allowedIPs = res.data.allowedIPs
        const dns = res.data.dns
        const ipAddress = res.data.ipAddress
        const ipv4Address = res.data.ipv4Address
        const ipv6Address = res.data.ipv6Address
        // const keyID = res.data.keyID
        const listenPort = res.data.listenPort
        const serverPublicKey = res.data.publicKey
        const response = res.data.response
        this.dataObj = {
          privKey: this.privKey,
          preKey: this.preKey,
          allowedIPs,
          dns,
          ipAddress,
          ipv4: ipv4Address,
          ipv6: ipv6Address,
          listenPort,
          serverPub: serverPublicKey,
        }
        if (res.status === 202) {
          this.formID++
          this.formOpen = true
          this.showBanner('success')
          this.infoLabel = response
          this.successCreation()
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
      // need to add functionality here
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
    closeDownloadForm() {
      this.formOpen = false
    },
    successCreation() {
      this.$emit('successCreation')
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
    getServers() {
      for (const key in jsonVal.directAccess) {
        this.servers.push(key)
      }
    },
    serverSelection(server) {
      this.serverSelected = server
    }
  },
}
</script>
