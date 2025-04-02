<script setup lang="ts">
import { ref, provide } from "vue";

const theme = ref("light"); // Varsayılan tema light

const toggleTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
  // HTML elementine dark sınıfını ekleyerek CSS'i güncelle
  document.documentElement.classList.toggle("dark", theme.value === "dark");
};

// Global olarak tema durumunu ve değiştirme fonksiyonunu sağla
provide("theme", theme);
provide("toggleTheme", toggleTheme);
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
