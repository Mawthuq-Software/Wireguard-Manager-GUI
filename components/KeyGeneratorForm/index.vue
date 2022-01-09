<template>
  <div class="bg-background rounded">
    <div class="p-4">
      <div>
        <div>
          <Input
            :placeholder="privKey"
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
        <div class="pt-4">
          <Button :label="'Generate new key'" @btn-click="genPubPrivKey" />
        </div>
      </div>
      <div class="pt-4">
        <div>
          <Input
            :placeholder="preKey"
            :label="'Preshared Key'"
            :type="'text'"
            :error="preKeyError"
            :disabled="true"
          />
        </div>
        <div class="pt-4">
          <Button :label="'Generate new key'" @btn-click="genPreKey" />
        </div>
      </div>
      <!-- <div class="pt-4">
        <Dropdown label="Server" />
      </div> -->
      <div class="pt-4">
        <Input
          :placeholder="'(0 to disable)'"
          :label="'Bandwidth (Megabytes)'"
          :type="'number'"
          :error="bwFieldError"
          @data-change="updateBW"
        />
      </div>
      <div class="pt-8">
        <Button :label="'Submit'" @btn-click="submit" />
      </div>
    </div>
  </div>
</template>
<script>
import Input from '../Input'
import Button from '../Button'
import Dropdown from '../Dropdown'

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
    Dropdown,
  },
  data() {
    return {
      privKey: '',
      pubKey: '',
      preKey: '',
      bw: '',
      bwFieldError: false,
      pubKeyError: false,
      privKeyError: false,
      preKeyError: false,
    }
  },
  methods: {
    async genPubPrivKey() {
      for (let i = 0; i < 20; i++) {
        await this.sleep(75)

        const privKeyArray = generatePrivateKey()
        const pubKeyArray = generatePublicKey(privKeyArray)

        this.privKey = keyToBase64(privKeyArray)
        this.pubKey = keyToBase64(pubKeyArray)
      }
    },
    async genPreKey() {
      for (let i = 0; i < 20; i++) {
        await this.sleep(75)
        const preKeyArray = generatePresharedKey()
        this.preKey = keyToBase64(preKeyArray)
      }
    },
    submit() {
      if (this.bw === '') {
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
        this.bw !== '' &&
        this.privKey !== '' &&
        this.preKey !== '' &&
        this.pubKey !== ''
      ) {
        this.$emit(
          'data-change',
          this.privKey,
          this.pubKey,
          this.preKey,
          this.bw
        )
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
  },
}
</script>
