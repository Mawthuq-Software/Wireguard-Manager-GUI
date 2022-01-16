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
  </div>
</template>
<script>
import Button from '../Button'
import Table from '../Table'
import Input from '../Input'
import KeyGeneratorForm from '../KeyGeneratorForm'

export default {
  name: 'KeysSection',
  components: {
    Button,
    Table,
    Input,
    KeyGeneratorForm,
  },
  props: {
    rows: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      headers: ['KeyID', 'ServerID', 'Private IP', 'Enabled', 'Edit'],
      button: { exists: true, label: 'Modify' },
      searchArray: [],
      formOpen: false,
      keyID: 10101,
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
  },
  created() {
    this.searchArray = this.rows
  },
  methods: {
    searchFunc(search) {
      const searchRows = this.rows
      const outputRows = []

      if (search === '') {
        this.searchArray = searchRows
      } else {
        for (let i = 0; i < searchRows.length; i++) {
          for (let z = 0; z < searchRows[i].length; z++) {
            const element = searchRows[i][z].toLowerCase()
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
  },
}
</script>
