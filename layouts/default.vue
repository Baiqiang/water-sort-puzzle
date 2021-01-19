<template>
  <Nuxt class="h-screen p-4" />
</template>

<script>
import { init } from '~/libs/state'
export default {
  mounted() {
    init()
  },
}
</script>

<style lang="less">
body {
  @apply bg-black text-white;
}
.button {
  @apply rounded-lg bg-yellow-500 text-black font-medium text-center px-4 py-2 tracking-wider;

  box-shadow: 0 4px 0 0 theme('colors.yellow.700');

  &:hover {
    @apply bg-opacity-75;
  }

  &:focus {
    @apply outline-none;
  }
}
</style>
