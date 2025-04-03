<template>
  <div
    @click="toggleTheme"
    class="w-16 h-8 flex items-center rounded-full cursor-pointer transition-all"
    :class="theme === 'light' ? 'bg-gray-300' : 'bg-gray-700'"
  >
    <!-- Switch yuvarlağı -->
    <div
      class="w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300"
      :class="theme === 'light' ? 'translate-x-1' : 'translate-x-9'"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";

const theme = inject("theme") as Ref<string>;
const toggleTheme = inject("toggleTheme") as () => void;
</script>

<style scoped>
div {
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.translate-x-1 {
  transform: translateX(4px);
}

.translate-x-9 {
  transform: translateX(36px);
}
</style>
