<template>
  <div class="flex items-center">
    <svg
      :class="[imgClass, colorClass]"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-check"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <p :class="[textClass, colorClass]">{{ text }}</p>
  </div>
</template>
<script>
export default {
  name: 'ValidationText',
  props: {
    text: {
      type: String,
      default: 'Contains lowercase letter',
    },
    valid: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    textClass() {
      return {
        'text-xs': true,
        'font-semibold': true,
      }
    },
    colorClass() {
      return {
        'text-gray-600': !this.valid,
        'text-success': this.valid,
        'pl-1': true,
      }
    },
    imgClass() {
      return {
        'w-6': true,
        'h-6': true,
      }
    },
  },
}
</script>
