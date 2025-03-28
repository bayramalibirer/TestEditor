<template>
  <div class="flex-1 flex justify-center items-center bg-gray-200">
    <canvas id="canvas" class="border w-full h-full"></canvas>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useCanvasStore } from "@/stores/canvas";

onMounted(() => {
  const canvasStore = useCanvasStore();
  if (canvasStore && typeof canvasStore.initializeCanvas === "function") {
    canvasStore.initializeCanvas();
  } else {
    console.error("Canvas store or initializeCanvas method is not available.");
  }
});
</script>
