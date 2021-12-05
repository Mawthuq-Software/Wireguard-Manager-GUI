<template>
  <div class="inline-flex items-center space-x-2">
    <div class="flex">
      <input
        id="checkBox"
        type="checkbox"
        :checked="boxBool"
        @change="checkData"
      />
    </div>
    <div class="flex">
      <label v-if="label != ''" for="checkBox" class="text-white">{{
        label
      }}</label>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Checkbox',
  props: {
    boxBool: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      boxCheck: this.boxBool,
    }
  },
  methods: {
    checkData() {
      this.boxCheck = !this.boxCheck
      this.$emit('checkChange', this.boxCheck)
    },
  },
}
</script>
<style scoped>
input {
  height: 15px;
  width: 15px;
  border-radius: 2.5px;
}
</style>
