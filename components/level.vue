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
    <div
      ref="tubesContainer"
      class="flex-1 flex items-center justify-center flex-wrap content-center"
    >
      <template v-for="(n, index) in tubes.length">
        <Tube
          :key="index"
          :tube="tubes[index]"
          :selected="tubes[index] === selectedTube"
          :style="{ width }"
          @click="onTubeClick(tubes[index])"
        />
        <div
          v-if="n % tubesPerRow === 0 && n < tubes.length"
          :key="`${index}-wrap`"
          class="w-full h-6"
        />
      </template>
    </div>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
} from '@nuxtjs/composition-api'
import debounce from 'debounce'
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
    const vm = getCurrentInstance()
    const steps = reactive([])
    const selectedTube = ref(null)
    const tubes = ref([])
    const originalTubes = computed(() =>
      props.originalTubes.map((t) => t.clone())
    )
    const solved = computed(() => tubes.value.every((tube) => tube.solved))
    const bestRow = ref(1)
    const tubesPerRow = computed(() =>
      Math.ceil(tubes.value.length / bestRow.value)
    )
    const width = ref('5%')

    onMounted(() => {
      window.addEventListener('resize', debouncedOnResize, false)
      refresh()
      onResize()
    })

    onUnmounted(() => {
      window.removeEventListener('resize', debouncedOnResize)
    })

    const onResize = () => {
      const container = vm.refs.tubesContainer
      const containerRatio = container.clientWidth / container.clientHeight
      const deltas = []
      if (tubes.value.length === 0) {
        return
      }
      for (let i = 1; i < 10; i++) {
        const tubeRatio =
          Math.ceil(tubes.value.length / i) / tubes.value[0].height / i
        const delta = Math.abs(tubeRatio / containerRatio - 1)
        deltas.push(delta)
      }
      const minDelta = Math.min(...deltas)
      bestRow.value = deltas.indexOf(minDelta) + 1
      width.value =
        Math.floor(
          Math.min(
            container.clientWidth / tubesPerRow.value - 10,
            container.clientWidth /
              (tubes.value[0].height * 1.1 * bestRow.value)
          ) * 100
        ) /
          100 +
        'px'
    }
    const debouncedOnResize = debounce(onResize, 200)

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
    watch(originalTubes, () => {
      refresh()
      onResize()
    })

    return {
      tubes,
      selectedTube,
      steps,
      width,
      bestRow,
      tubesPerRow,
      // methods
      undo,
      refresh,
      onTubeClick,
    }
  },
})
</script>
