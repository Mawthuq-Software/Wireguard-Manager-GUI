<template>
  <div>
    <div :class="upperClass">
      <Input
        label=""
        placeholder="Search"
        type="text"
        @data-change="searchFunc"
      />
      <div class="w-60">
        <Dropdown
          label="Server Filter"
          :items="servers"
          @item-selected="serverFilter"
        />
      </div>
      <div>
        <Button label="Add Key" @btn-click="addKey" />
      </div>
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
        <KeyGeneratorForm
          :key="keyPropID"
          :server-i-d="serverSelected"
          @closeKeyGen="toggleForm"
          @successCreation="getKeys"
        />
      </div>
    </div>
    <div :class="outerModifyFormClass">
      <div :class="modifyFormClass">
        <ModifyKeyForm
          :id="modifyFormID"
          :server-i-d="currentServerID"
          :key-i-d="currentKeyID"
          :key-enabled="keyEnabled"
          :bw-limit="bwLimit"
          :bw-used="bwUsed"
          @closeKeyGen="toggleModifyForm"
          @success-change="getKeys"
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
import Button from '../Button'
import Table from '../Table'
import Input from '../Input'
import Dropdown from '../Dropdown'
import KeyGeneratorForm from '../KeyGeneratorForm'
import ModifyKeyForm from '../ModifyKeyForm'
import jsonVal from '../../config.json'

export default {
  name: 'KeysSection',
  components: {
    Button,
    Table,
    Input,
    KeyGeneratorForm,
    ModifyKeyForm,
    Dropdown,
  },
  data() {
    return {
      headers: [
        'KeyID',
        'ServerID',
        'Public Key',
        'Private IP',
        'Enabled',
        'Edit',
      ],
      button: { exists: true, label: 'Modify' },
      searchArray: [],
      formOpen: false,
      modifyFormOpen: false,
      keyPropID: 10101,
      infoType: 'danger',
      infoLabel: 'test',
      infoOpen: false,
      dataRows: [],
      serverSelected: '',
      servers: [],
      currentServerID: '',
      currentKeyID: '',
      keyEnabled: '',
      modifyFormID: 999999,
      bwUsed: '-',
      bwLimit: '-',
    }
  },
  computed: {
    upperClass() {
      return {
        flex: true,
        'items-end': true,
        'place-content-between': true,
        'flex-wrap': true,
        'gap-2': true,
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
    modifyFormClass() {
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
    outerModifyFormClass() {
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
        visible: this.modifyFormOpen,
        invisible: !this.modifyFormOpen,
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
    serverFilter(server) {
      const searchRows = this.dataRows
      const outputRows = []

      if (server === '') {
        this.searchArray = searchRows
      } else {
        for (let i = 0; i < searchRows.length; i++) {
          if (searchRows[i][1] === server) {
            outputRows.push(searchRows[i])
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
      // Hard code the array values as we know the positison
      this.currentKeyID = row[0]
      this.currentServerID = row[1]
      this.getBWAPI(this.currentServerID, this.currentKeyID)
      this.keyEnabled = row[4]
      this.modifyFormOpen = true
      this.modifyFormID++
    },
    toggleForm() {
      this.formOpen = false
    },
    toggleModifyForm() {
      this.modifyFormOpen = false
    },
    forceRerender() {
      this.keyPropID += 1
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
    getServers() {
      for (const key in jsonVal.directAccess) {
        this.servers.push(key)
      }
    },
    async getKeys() {
      this.searchArray = []
      const keysArray = []

      for (let i = 0; i < this.servers.length; i++) {
        const server = this.servers[i]
        if (server === '') {
          return
        }
        const serverURL = jsonVal.directAccess[server].url
        const serverAuth = jsonVal.directAccess[server].auth
        try {
          const res = await this.$axios.get(serverURL + '/manager/key', {
            headers: {
              authorization: serverAuth,
            },
            timeout: 3000,
          })

          // const response = res.data.Response
          const keys = res.data.Keys

          for (let j = 0; j < keys.length; j++) {
            delete keys[j].PresharedKey
            const singleKeyArr = Object.values(keys[j])
            singleKeyArr.splice(1, 0, server)
            keysArray.push(singleKeyArr)
          }

          this.searchArray = keysArray
          this.dataRows = keysArray
          // if (res.status === 202) {

          // }
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
      }
    },
    async getBWAPI(serverID, keyID) {
      const serverURL = jsonVal.directAccess[serverID].url
      const serverAuth = jsonVal.directAccess[serverID].auth
      console.log('HERE')
      try {
        const res = await this.$axios.post(
          serverURL + '/manager/subscription',
          {
            keyID: String(keyID),
          },
          {
            headers: {
              authorization: serverAuth,
            },
            timeout: 3000,
          }
        )
        // const response = res.data.response

        if (res.status === 202) {
          this.bwLimit = res.data.bandwidthLimit
          this.bwUsed = res.data.bandwidthUsed
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
