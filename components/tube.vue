<template>
  <div class="tube" v-on="$listeners">
    <div
      class="overflow-hidden rounded-b-full border-2 border-white w-full pt-2 md:pt-4 flex flex-col-reverse transition-all duration-200 ease-linear"
      :class="{
        'transform -translate-y-6': selected,
      }"
    >
      <Water v-for="(water, index) in tube.water" :key="index" :water="water" />
      <template v-if="!tube.full">
        <Water :water="emptyWater" />
      </template>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'
import Tube, { Water } from '~/libs/tube'

export default defineComponent({
  props: {
    tube: Tube,
    selected: Boolean,
  },
  setup(props) {
    const emptyWater = computed(
      () =>
        new Water('transparent', props.tube.height - props.tube.filledHeight)
    )

    return {
      emptyWater,
    }
  },
})
</script>

<style lang="less" scoped>
.tube {
  @apply mb-2 cursor-pointer;

  margin-left: 5px;
  margin-right: 5px;

  &:hover {
    @apply opacity-80;
  }
}
</style>
