<template>
  <div class="app-container">
    <Sidebar />
    <CanvasEditor />
  </div>
</template>

<script setup>
import Sidebar from "@/components/Sidebar.vue";
import CanvasEditor from "@/components/CanvasEditor.vue";
</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
  width: 100vw;
}
</style>
