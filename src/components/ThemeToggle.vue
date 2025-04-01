
<template>
  <button @click="toggleTheme" class="px-4 py-2 bg-gray-700 text-white rounded">Toggle Theme</button>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme';
const themeStore = useThemeStore();
const toggleTheme = () => themeStore.toggleTheme();
</script>
