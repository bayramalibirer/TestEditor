<template>
  <div>
    <div class="controls mb-4">
      <!-- Çizim Modu Aç/Kapat -->
      <button
        @click="toggleDrawingMode"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {{ isDrawingMode ? "Cancel Drawing Mode" : "Enter Drawing Mode" }}
      </button>

      <!-- Fırça Genişliği -->
      <label class="ml-4">
        Brush Width:
        <input
          type="range"
          min="1"
          max="50"
          v-model="brushWidth"
          @input="updateBrushWidth"
        />
      </label>

      <!-- Fırça Rengi -->
      <label class="ml-4">
        Brush Color:
        <input type="color" v-model="brushColor" @input="updateBrushColor" />
      </label>

      <!-- Dikdörtgen Ekle -->
      <button
        @click="addRectangle"
        class="bg-green-500 text-white px-4 py-2 rounded ml-4"
      >
        Add Rectangle
      </button>

      <!-- Üçgen Ekle -->
      <button
        @click="addTriangle"
        class="bg-yellow-500 text-white px-4 py-2 rounded ml-4"
      >
        Add Triangle
      </button>

      <!-- Canvas Temizle -->
      <button
        @click="clearCanvas"
        class="bg-red-500 text-white px-4 py-2 rounded ml-4"
      >
        Clear Canvas
      </button>
    </div>

    <!-- Canvas Alanı -->
    <div
      class="flex justify-center items-center bg-white"
      style="height: 100vh; width: 100vw"
    >
      <canvas id="canvas" class="border"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useCanvasStore } from "@/stores/canvas";

const canvasStore = useCanvasStore();
const brushWidth = ref(5); // Varsayılan fırça genişliği
const brushColor = ref("#000000"); // Varsayılan fırça rengi

// Çizim modunun durumunu kontrol et
const isDrawingMode = computed(
  () => canvasStore.canvas?.isDrawingMode || false
);

// Çizim modunu aç/kapat
const toggleDrawingMode = () => {
  canvasStore.toggleDrawingMode();
};

// Fırça genişliğini güncelle
const updateBrushWidth = () => {
  canvasStore.setBrushWidth(brushWidth.value);
};

// Fırça rengini güncelle
const updateBrushColor = () => {
  canvasStore.setBrushColor(brushColor.value);
};

// Dikdörtgen ekle
const addRectangle = () => {
  canvasStore.addRectangle();
};

// Üçgen ekle
const addTriangle = () => {
  canvasStore.addTriangle();
};

// Canvas'ı temizle
const clearCanvas = () => {
  canvasStore.clearCanvas();
};

// Canvas'ı başlat
onMounted(() => {
  canvasStore.initializeCanvas();
});
</script>

<style scoped>
canvas {
  display: block;
  border: 1px solid black; /* Çerçeve */
}
</style>
