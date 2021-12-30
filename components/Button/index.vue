<template>
  <div>
    <button :class="btnClasses" @click="clicked()">
      {{ label }}
    </button>
  </div>
</template>
<script>
export default {
  name: 'Button',
  props: {
    label: {
      type: String,
      default: 'Button',
    },
    variant: {
      type: String,
      validator: (value) =>
        ['primary', 'secondary', 'success', 'warning', 'danger'].includes(
          value
        ),
      default: 'primary',
    },
  },
  computed: {
    btnClasses() {
      return {
        ['bg-' + this.variant]: true,
        ['hover:bg-' + this.variant+ '-dark']: true,
        'text-white': true,
        'text-sm': true,
        rounded: true,
        'py-2': true,
        'px-5': true,
        uppercase: true,
        'font-semibold': true,
      }
    },
  },
  methods: {
    clicked() {
      this.$emit('btn-click')
    },
  },
}
</script>
