<template>
  <div class="flex flex-col">
    <Menu @refresh="refresh" @undo="undo" />
    <slot />
    <div class="text-center uppercase py-3 font-medium text-3xl">
      Level {{ level }}
    </div>
    <div class="text-center uppercase py-3 font-medium">
      Moves {{ steps.length }}
    </div>
    <div class="flex-1 flex items-center justify-center flex-wrap">
      <Tube
        v-for="(tube, index) in tubes"
        :key="index"
        :tube="tube"
        :selected="tube === selectedTube"
        :style="{ width }"
        @click="onTubeClick(tube)"
      />
    </div>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from '@nuxtjs/composition-api'
import Step from '~/libs/step'

export default defineComponent({
  props: {
    originalTubes: {
      type: Array,
      default() {
        return []
      },
    },
    level: [String, Number],
  },
  setup(props) {
    const steps = reactive([])
    const selectedTube = ref(null)
    const tubes = ref([])
    const originalTubes = computed(() =>
      props.originalTubes.map((t) => t.clone())
    )
    const solved = computed(() => tubes.value.every((tube) => tube.solved))
    const width = ref('5%')

    onMounted(() => {
      refresh()
    })

    const onTubeClick = (tube) => {
      if (solved.value) {
        return
      }
      if (selectedTube.value === tube) {
        selectedTube.value = null
        return
      }
      if (selectedTube.value === null) {
        selectedTube.value = tube
        return
      }
      const height = selectedTube.value.pourInto(tube)
      if (height > 0) {
        steps.push(new Step(selectedTube.value, tube, height))
      }
      selectedTube.value = null
    }

    const undo = () => {
      if (steps.length === 0) {
        return
      }
      const lastStep = steps.pop()
      lastStep.undo()
    }

    const refresh = () => {
      tubes.value = originalTubes.value.map((tube) => tube.clone())
      steps.value = []
    }

    watch(solved, () => {
      if (solved.value) {
        setTimeout(() => {
          alert('Solved!')
        }, 10)
      }
    })
    watch(originalTubes, refresh)

    return {
      tubes,
      selectedTube,
      steps,
      width,
      // methods
      undo,
      refresh,
      onTubeClick,
    }
  },
})
</script>
