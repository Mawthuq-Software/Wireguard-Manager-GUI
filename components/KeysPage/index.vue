<template>
  <div class="bg-background h-full">
    <div class="p-4">
      <p class="text-white font-semibold text-4xl">Keys</p>
      <KeysSection />
    </div>
  </div>
</template>
<script>
import KeysSection from '../KeysSection'

export default {
  name: 'KeysPage',
  components: { KeysSection },
}
</script>
