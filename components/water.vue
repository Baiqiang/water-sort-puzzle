<template>
  <div class="w-full" :class="`bg-${water.color}`">
    <div v-for="n in water.height" :key="n" class="square" />
  </div>
</template>

<script>
import { Water } from '~/libs/tube'

export default {
  props: {
    water: Water,
  },
}
</script>

<style lang="less">
.square {
  @apply w-full;

  padding-bottom: 100%;
}
</style>
