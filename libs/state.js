import store from 'store'
import { reactive, watch } from '@nuxtjs/composition-api'

const KEY = 'state'

export const state = reactive({
  level: 0,
  levels: 100,
})

export function init() {
  Object.assign(state, store.get(KEY) || {})
}

watch(
  state,
  () => {
    store.set(KEY, state)
  },
  {
    deep: true,
  }
)
