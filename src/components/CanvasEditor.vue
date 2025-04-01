<script setup lang="ts">
import { onMounted } from "vue";
import { useCanvas } from "@/composables/useCanvas";

const { initializeCanvas, resizeCanvas } = useCanvas();

onMounted(() => {
  const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;

  if (canvasElement) {
    // Canvas'ı başlat
    initializeCanvas(canvasElement);
    resizeCanvas();
  }
});
</script>

<template>
  <div class="canvas-container">
    <canvas id="canvas"></canvas>
  </div>
</template>

<style scoped>
.canvas-container {
  position: relative;
  width: 100vw; /* Tüm ekran genişliği */
  height: 100vh; /* Tüm ekran yüksekliği */
  overflow: hidden; /* Taşan içerikleri gizle */
}

canvas {
  display: block;
  width: 100%; /* Görsel olarak kapsayıcıyı doldur */
  height: 100%; /* Görsel olarak kapsayıcıyı doldur */
  touch-action: none; /* Dokunmatik cihazlarda doğru çalışması için */
}
</style>
