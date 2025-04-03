<script setup lang="ts">
import { onMounted } from "vue";
import { useCanvas } from "@/composables/useCanvas";

const { initializeCanvas, resizeCanvas } = useCanvas();

onMounted(() => {
  const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;

  if (canvasElement) {
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
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
  touch-action: none;
}
</style>
