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
import {
  appendEmptyTubes,
  BIG_PRIME,
  generateTubes,
  generateWaters,
  randomWater,
} from '~/libs/puzzle'

export default defineComponent({
  setup() {
    const tubeCount = ref(12)
    const tubeHeight = ref(5)
    const emptyTubeCount = ref(2)
    const tubes = ref([])

    const generate = () => {
      tubes.value = generateTubes(tubeCount.value, tubeHeight.value)
      const waters = generateWaters(tubes.value)
      const randomNumber = BigNumber(tubeCount.value)
        .times(tubeHeight.value)
        .times(Math.random())
        .times(BIG_PRIME)
        .dp(0)
      console.log(randomNumber.toFixed())
      randomWater(tubes.value, waters, randomNumber)
      appendEmptyTubes(tubes.value, emptyTubeCount.value)
    }

    onMounted(() => {
      generate()
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
