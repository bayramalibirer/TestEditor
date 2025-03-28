<template>
  <div class="w-64 bg-gray-100 p-4 flex flex-col">
    <button @click="addRectangle" class="mb-2 px-4 py-2 bg-blue-500 text-white rounded">Add Rectangle</button>
    <button @click="addText" class="mb-2 px-4 py-2 bg-green-500 text-white rounded">Add Text</button>
  </div>
</template>

<script setup>
import { useCanvasStore } from '@/stores/canvas';
const canvasStore = useCanvasStore();

const addRectangle = () => {
  canvasStore.addRectangle();
};

const addText = () => {
  canvasStore.addText();
};
</script>