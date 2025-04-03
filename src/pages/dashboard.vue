<template>
  <div class="app-container">
    <!-- Sidebar -->
    <Sidebar />
    <!-- Canvas Editor -->
    <CanvasEditor/>
  </div>
</template>

<script setup>
import Sidebar from "@/components/Sidebar.vue";
import CanvasEditor from "@/components/CanvasEditor.vue";
</script>

<style scoped>
/* Ana düzen için flex yapısı */
.app-container {
  display: flex;
  height: 100vh; /* Tüm ekran yüksekliği */
  width: 100vw; /* Tüm ekran genişliği */
}
</style>
