<template>
  <div>
    <div class="flex-grow p-6 overflow-auto bg-background">
      <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
        <StatisticCard :stat-name="'John'" :stat-count="2222" />
        <StatisticCard :stat-name="'John'" :stat-count="2222" />
        <StatisticCard :stat-name="'John'" :stat-count="2222" />
      </div>
    </div>
  </div>
</template>
<script>
import StatisticCard from '../StatisticCard'

export default {
  name: 'DashboardLayout',
  components: {
    StatisticCard,
  },
}
</script>
