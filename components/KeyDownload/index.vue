<template>
  <div class="p-4 bg-background rounded flex-row">
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
    <div class="pt-4">
      <p class="text-white font-bold pb-4">Download Configuration</p>
      <Input
        label="Filename"
        placeholder="mawthuq_software.conf"
        type="text"
        @data-change="filenameChange"
      />
      <div class="pt-6">
        <Button label="Download" @btn-click="downloadConfig" />
      </div>
    </div>
    <div class="pt-8 pb-4">
      <p class="text-white font-bold pb-4">
        Scan QR code with mobile to import into Wireguard.
      </p>
      <qrcode-vue
        :id="qrID"
        :value="confString"
        size="200"
        level="Q"
        background="#202427"
        foreground="#ffffff"
      />
    </div>
  </div>
</template>
<script>
import QrcodeVue from 'qrcode.vue'
import Button from '../Button'
import Input from '../Input'
// import { blobCreate } from '../../static/blobCreate'
export default {
  name: 'KeyDownload',
  components: {
    QrcodeVue,
    Button,
    Input,
  },
  props: {
    configProps: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      config: [],
      confString: '',
      blob: '',
      qrID: 10239123234,
      filename: '',
    }
  },
  computed: {
    defaultProp() {
      return Object.assign(
        {
          privKey: '',
          preKey: '',
          allowedIPs: '',
          dns: '',
          ipAddress: '',
          ipv4: '',
          ipv6: '',
          listenPort: '',
          serverPub: '',
        },
        this.configProps
      )
    },
  },
  watch: {
    defaultProp() {
      this.setConfig()
      // this.qrID ++
    },
  },
  created() {
    this.setConfig()
  },
  methods: {
    downloadConfig() {
      const link = document.createElement('a')
      if (this.filename === '') {
        link.download = 'mawthuq_software.conf'
      } else {
        link.download = this.filename
      }

      link.style.display = 'none'
      link.href = URL.createObjectURL(this.blob)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    setConfig() {
      this.config = []
      this.config.push('[Interface]')
      const defConf = this.defaultProp
      if ((defConf.ipv4 !== '') & (defConf.ipv6 === '')) {
        this.config.push(`Address = ${defConf.ipv4}`)
      } else if ((defConf.ipv4 === '') & (defConf.ipv6 !== '')) {
        this.config.push(`Address = ${defConf.ipv6}`)
      } else {
        this.config.push(`Address = ${defConf.ipv4}, ${defConf.ipv6}`)
      }
      this.config.push(`DNS = ${defConf.dns}`)
      this.config.push(`PrivateKey = ${defConf.privKey}`)
      this.config.push('')

      this.config.push('[Peer]')
      this.config.push(`PublicKey = ${defConf.serverPub}`)
      this.config.push(`PresharedKey = ${defConf.preKey}`)
      this.config.push(`AllowedIPs = ${defConf.allowedIPs}`)
      this.config.push(`Endpoint = ${defConf.ipAddress}:${defConf.listenPort}`)
      this.config.push('')
      this.confString = this.config.join('\n')
      //   const testBlob = blobCreate(this.confString)
      //   console.log(testBlob)
      this.blob = new Blob([this.confString], { type: 'text/plain' })
    },
    closeClicked() {
      this.$emit('closeKeyGen')
    },
    filenameChange(value) {
      this.filename = value + '.conf'
    },
  },
}
</script>
