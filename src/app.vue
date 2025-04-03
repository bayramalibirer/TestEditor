<script setup lang="ts">
import { ref, provide } from "vue";

const theme = ref("light"); // Varsayılan tema light

const toggleTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
  document.documentElement.classList.toggle("dark", theme.value === "dark");
};


provide("theme", theme);
provide("toggleTheme", toggleTheme);
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
