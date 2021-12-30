<template>
  <div class="inline-flex items-center space-x-2">
    <input
      type="checkbox"
      :checked="boxBool"
      :class="inputClasses"
      @change="checkData"
    />
    <p v-if="label != ''" class="text-white">{{label}}</p>
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
  computed: {
    inputClasses() {
      return {
        "h-4": true,
        "w-4": true,
        "rounded-sm": true,
        "bg-secondary": true,
        "text-white": true,
      }
    }
  },
  methods: {
    checkData() {
      this.boxCheck = !this.boxCheck
      this.$emit('checkChange', this.boxCheck)
    },
  }
}
</script>
