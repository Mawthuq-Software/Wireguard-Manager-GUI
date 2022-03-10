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
          label="Server"
          :items="servers"
          @item-selected="updateServer"
        />
      </div>
      <div>
        <Button v-if="serverSelected != ''" label="Add Key" @btn-click="addKey"/>
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
          :key="keyID"
          :server-i-d="serverSelected"
          @closeKeyGen="toggleForm"
          @successCreation="getKeys"
        />
      </div>
    </div>
    <div :class="outerModifyFormClass">
      <div :class="modifyFormClass">
        <ModifyKeyForm
          :server-i-d="serverSelected"
          :key-i-d="currentKeyID"
          :key-enabled="keyEnabled"
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
import KeyGeneratorForm from '../KeyGeneratorForm'
import Dropdown from '../Dropdown'
import ModifyKeyForm from '../ModifyKeyForm'
import jsonVal from '../../template.json'

export default {
  name: 'KeysSection',
  components: {
    Button,
    Table,
    Input,
    KeyGeneratorForm,
    Dropdown,
    ModifyKeyForm,
  },
  data() {
    return {
      headers: ['KeyID', 'Public Key', 'Private IP', 'Enabled', 'Edit'],
      button: { exists: true, label: 'Modify' },
      searchArray: [],
      formOpen: false,
      modifyFormOpen: false,
      keyID: 10101,
      infoType: 'danger',
      infoLabel: 'test',
      infoOpen: false,
      dataRows: {},
      serverSelected: '',
      servers: [],
      currentKeyID: '',
      keyEnabled: '',
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
      if (this.serverSelected === '') {
        return
      }
      this.$emit('add-key')
      this.forceRerender()
      this.formOpen = true
    },
    modifyKey(row) {
      this.currentKeyID = row.KeyID
      this.keyEnabled = row.Enabled
      this.modifyFormOpen = true
    },
    toggleForm() {
      this.formOpen = false
    },
    toggleModifyForm() {
      this.modifyFormOpen = false
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
    updateServer(server) {
      this.serverSelected = server
      this.getKeys()
    },
    getServers() {
      for (const key in jsonVal.directAccess) {
        this.servers.push(key)
      }
    },
    async getKeys() {
      const server = this.serverSelected
      if (server === '') {
        return
      }
      this.searchArray = []
      const serverURL = jsonVal.directAccess[server].url
      const serverAuth = jsonVal.directAccess[server].auth
      try {
        const res = await this.$axios.get(serverURL + '/manager/key', {
          headers: {
            authorization: serverAuth,
          },
        })

        // const response = res.data.Response
        const keys = res.data.Keys
        for (let i = 0; i < keys.length; i++) {
          delete keys[i].PresharedKey
        }
        this.searchArray = keys
        this.dataRows = keys

        // if (res.status === 202) {

        // }
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
