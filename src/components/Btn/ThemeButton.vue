<template>
  <div
    @click="toggleTheme"
    class="w-16 h-8 flex items-center rounded-full cursor-pointer transition-all"
    :class="theme === 'light' ? 'bg-gray-300' : 'bg-gray-700'"
  >
    <!-- Switch yuvarlağı -->
    <div
      class="w-6 h-6 bg-white rounded-full shadow-md transform transition-transform"
      :class="theme === 'light' ? 'translate-x-1' : 'translate-x-9'"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/stores/themeStore";

const themeStore = useThemeStore();
const theme = themeStore.theme;
const toggleTheme = themeStore.toggleTheme;
</script>

<style scoped>
/* Switch buton için geçiş animasyonu */
div {
  transition: background-color 0.3s ease, transform 0.3s ease;
}
</style>
