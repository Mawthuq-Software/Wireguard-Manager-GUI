<template>
  <div>
    <div :class="upperClass">
      <Input
        label=""
        placeholder="Search"
        type="text"
        @data-change="searchFunc"
      />
      <Button label="Add Key" @btn-click="addKey" />
    </div>
    <div class="pt-4">
      <Table
        :headers="headers"
        :rows="searchArray"
        :button="button"
        @btn-click="modifyKey"
      />
    </div>
    <div :class="outerFormClass">
      <div :class="keyFormClass">
        <KeyGeneratorForm :key="keyID" @closeKeyGen="toggleForm" />
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
import Button from '../Button'
import Table from '../Table'
import Input from '../Input'
import KeyGeneratorForm from '../KeyGeneratorForm'
import jsonVal from '../../template.json'
export default {
  name: 'KeysSection',
  components: {
    Button,
    Table,
    Input,
    KeyGeneratorForm,
  },
  data() {
    return {
      headers: ['KeyID', 'Public Key', 'Private IP', 'Enabled', 'Edit'],
      button: { exists: true, label: 'Modify' },
      searchArray: [],
      formOpen: false,
      keyID: 10101,
      infoType: 'danger',
      infoLabel: 'test',
      infoOpen: false,
      dataRows: {},
    }
  },
  computed: {
    upperClass() {
      return {
        flex: true,
        'items-end': true,
        'place-content-between': true,
      }
    },
    backgroundClass() {
      return {}
    },
    keyFormClass() {
      return {
        'w-2/4': true,
      }
    },
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
    this.getKeys()
  },
  methods: {
    searchFunc(search) {
      const searchRows = this.dataRows
      const outputRows = []

      if (search === '') {
        this.searchArray = searchRows
      } else {
        for (let i = 0; i < searchRows.length; i++) {
          for (const key in searchRows[i]) {
            const element = searchRows[i][key].toString().toLowerCase()
            if (element.includes(search.toLowerCase())) {
              outputRows.push(searchRows[i])
              break
            }
          }
        }
        this.searchArray = outputRows
      }
    },
    addKey() {
      this.$emit('add-key')
      this.forceRerender()
      this.formOpen = true
    },
    modifyKey(row) {
      console.log(row)
    },
    toggleForm() {
      this.formOpen = false
    },
    forceRerender() {
      this.keyID += 1
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
    async getKeys() {
      const serverURL = jsonVal.directAccess.url
      const serverAuth = jsonVal.directAccess.auth
      try {
        const res = await this.$axios.get(serverURL + '/manager/key', {
          headers: {
            authorization: serverAuth,
          },
        })

        const response = res.data.Response
        const keys = res.data.Keys
        for (let i = 0; i < keys.length; i++) {
          delete keys[i].PresharedKey
        }
        this.searchArray = keys
        this.dataRows = keys

        if (res.status === 202) {
          this.showBanner('success')
          this.infoLabel = response
        }
      } catch (err) {
        if (err.response) {
          this.infoLabel = err.response.data.response
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
          console.log(err)
        } else {
          this.infoLabel = 'Unable to connect to server.'
        }
        this.showBanner('error')
      }
    },
  },
}
</script>
