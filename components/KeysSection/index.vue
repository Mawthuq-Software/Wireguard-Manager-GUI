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
  </div>
</template>
<script>
import Button from '../Button'
import Table from '../Table'
import Input from '../Input'

export default {
  name: 'KeysSection',
  components: {
    Button,
    Table,
    Input,
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
    },
    modifyKey(row) {},
  },
}
</script>
