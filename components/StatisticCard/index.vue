<template>
  <div class="h-24 col-span-1 bg-background-light rounded">
    <div class="sm:flex sm:items-start p-5">
      <div class="text-center sm:mt-0 sm:ml-2 sm:text-left">
        <h3 class="text-sm leading-6 font-medium text-gray-400">
          {{ statName }}
        </h3>
        <p class="text-3xl font-bold text-white">{{ statCount }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StatisticCard',
  props: {
    statName: {
      type: String,
      default: 'PLACEHOLDER',
    },
    statCount: {
      type: String,
      default: '25000',
    },
  },
}
</script>
