<template>
  <div class="wg-input flex flex-col">
    <label class="pb-2 leading-none text-white">{{ label }}</label>
    <input
      :placeholder="placeholder"
      :class="classes"
      :type="type"
      :disabled="disabled"
      @input="inputData"
    />
  </div>
</template>

<script>
export default {
  name: 'Input',

  props: {
    label: {
      type: String,
      default: 'Label',
    },
    placeholder: {
      type: String,
      default: 'Placeholder',
    },
    type: {
      type: String,
      validator: (value) => ['text', 'number', 'password'].includes(value),
      default: 'password',
    },
    success: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        'flex-1': true,
        rounded: true,
        'py-2': true,
        'px-4': true,
        border: true,
        'border-background-light': !this.success && !this.error,
        'border-green-500': this.success,
        'border-red-500': this.error,
        'focus:border-blue-500': !this.success && !this.error,
        'focus:outline-none': true,
        'bg-background-light': true,
        'text-white': true,
      }
    },
  },
  methods: {
    inputData(evt) {
      this.$emit('data-change', evt.target.value)
    },
  },
}
</script>
