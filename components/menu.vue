<template>
  <div class="menu">
    <nuxt-link class="button" to="/">
      <img src="~assets/icons/menu.svg" class="w-6 h-6" />
    </nuxt-link>
    <button class="button ml-4">
      <img
        src="~assets/icons/refresh.svg"
        class="w-6 h-6"
        @click="$emit('refresh')"
      />
    </button>
    <button class="button ml-auto">
      <img
        src="~assets/icons/undo.svg"
        class="w-6 h-6"
        @click="$emit('undo')"
      />
    </button>
  </div>
</template>

<style scoped>
.menu {
  @apply py-2 flex items-center;

  backdrop-filter: saturate(50%) blur(5px);
}
</style>
