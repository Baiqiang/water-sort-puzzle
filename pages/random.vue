<template>
  <Level :original-tubes="tubes" level="Random">
    <div class="flex items-start">
      <div class="flex flex-col mr-3">
        <input
          v-model.number="tubeCount"
          type="tel"
          class="appearance-none w-12 text-black focus:outline-none px-2 text-center"
        />
        <label class="text-sm">Tubes</label>
      </div>
      <div class="flex flex-col mr-3">
        <input
          v-model.number="tubeHeight"
          type="tel"
          class="appearance-none w-12 text-black focus:outline-none px-2 text-center"
        />
        <label class="text-sm">Height</label>
      </div>
      <div class="flex flex-col mr-3">
        <input
          v-model.number="emptyTubeCount"
          type="tel"
          class="appearance-none w-12 text-black focus:outline-none px-2 text-center"
        />
        <label class="text-sm">Empties</label>
      </div>
      <button class="button" @click="generate">Generate</button>
    </div>
  </Level>
</template>

<script>
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import BigNumber from 'bignumber.js'
import COLORS from '~/libs/colors'
import {
  appendEmptyTubes,
  BIG_PRIME,
  generateTubes,
  randomWater,
} from '~/libs/puzzle'

export default defineComponent({
  setup() {
    const tubeCount = ref(12)
    const tubeHeight = ref(5)
    const emptyTubeCount = ref(2)
    const tubes = ref([])

    const generate = async () => {
      const { solve } = await import('~/libs/solver')
      tubes.value = generateTubes(
        Math.max(1, Math.min(tubeCount.value, COLORS.length)),
        Math.max(1, Math.min(tubeHeight.value, 10))
      )
      while (true) {
        const randomNumber = BigNumber(tubeCount.value)
          .times(tubeHeight.value)
          .times(Math.random())
          .times(BIG_PRIME)
          .dp(0)
        randomWater(tubes.value, randomNumber)
        if (solve(tubes.value, emptyTubeCount.value)) {
          break
        }
      }
      appendEmptyTubes(tubes.value, emptyTubeCount.value)
    }

    onMounted(async () => {
      await generate()
    })

    return {
      tubeCount,
      tubeHeight,
      emptyTubeCount,
      tubes,
      generate,
    }
  },
})
</script>
