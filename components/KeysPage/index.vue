<template>
  <div class="bg-background h-screen overflow-auto">
    <div class="p-8">
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
