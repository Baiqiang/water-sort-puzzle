<template>
  <Level :original-tubes="tubes" :level="level" />
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import { state } from '~/libs/state'
import { generate } from '~/libs/puzzle'

export default defineComponent({
  setup(props) {
    const { route } = useContext()
    const level = computed(() => route.value.params?.level ?? state.level)
    const tubes = ref([])
    onMounted(() => {
      tubes.value = generate(level.value)
    })

    return {
      tubes,
      level,
    }
  },
})
</script>
