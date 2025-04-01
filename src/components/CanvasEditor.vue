<template>
  <div class="flex flex-col bg-white" style="height: 100vh; width: 100vw">
    <!-- Kaydetme Butonu -->
    <button
      @click="showSaveModal = true"
      class="bg-blue-500 text-white px-4 py-2 rounded m-4"
    >
      Save Canvas
    </button>

    <!-- Kontrollerin bulunduğu üst kısım -->
    <div class="flex items-center justify-start gap-4 p-4 bg-gray-100 border-b">
      <!-- Çizim Modu Aç/Kapat -->
      <button
        @click="toggleDrawingMode"
        class="bg-green-500 text-white px-4 py-2 rounded"
      >
        {{ isDrawingMode ? "Cancel Drawing Mode" : "Enter Drawing Mode" }}
      </button>

      <!-- Fırça Rengi -->
      <label class="flex items-center gap-2">
        Brush Color:
        <input
          type="color"
          v-model="brushColor"
          @input="updateBrushColor"
          class="border rounded"
        />
      </label>

      <!-- Fırça Genişliği -->
      <label class="flex items-center gap-2">
        Brush Width:
        <input
          type="range"
          min="1"
          max="50"
          v-model="brushWidth"
          @input="updateBrushWidth"
          class="border rounded"
        />
      </label>

      <!-- Metin Ekle -->
      <button @click="addText" class="bg-blue-500 text-white px-4 py-2 rounded">
        Add Text
      </button>

      <!-- Dikdörtgen Ekle -->
      <button
        @click="addRectangle"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Rectangle
      </button>

      <!-- Üçgen Ekle -->
      <button
        @click="addTriangle"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Triangle
      </button>

      <!-- Daire Ekle -->
      <button
        @click="addCircle"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Circle
      </button>

      <!-- Canvas Temizle -->
      <button
        @click="clearCanvas"
        class="bg-red-500 text-white px-4 py-2 rounded"
      >
        Clear Canvas
      </button>

      <!-- Yeni Butonlar -->
      <button @click="eraser" class="bg-red-500 text-white px-4 py-2 rounded">
        Eraser
      </button>
      <button @click="undo" class="bg-yellow-500 text-white px-4 py-2 rounded">
        Undo
      </button>
      <button @click="redo" class="bg-purple-500 text-white px-4 py-2 rounded">
        Redo
      </button>
    </div>

    <!-- Canvas Alanı -->
    <div class="flex justify-center items-center flex-grow">
      <canvas id="canvas" class="border"></canvas>
    </div>

    <!-- Kaydetme Modalı -->
    <div
      v-if="showSaveModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-6 rounded shadow-lg">
        <h2 class="text-lg font-bold mb-4">Choose Save Format</h2>
        <div class="flex gap-4">
          <button
            @click="saveCanvas('png')"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save as PNG
          </button>
          <button
            @click="saveCanvas('jpeg')"
            class="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save as JPEG
          </button>
        </div>
        <button
          @click="showSaveModal = false"
          class="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as fabric from "fabric";
import { onMounted, ref } from "vue";

let canvas: fabric.Canvas;
const brushWidth = ref(5); // Varsayılan fırça genişliği
const brushColor = ref("#000000"); // Varsayılan fırça rengi
const isDrawingMode = ref(false); // Çizim modu durumu
const showSaveModal = ref(false); // Kaydetme modalını kontrol eder

// İşlem geçmişi
const undoStack: fabric.Object[] = [];
const redoStack: fabric.Object[] = [];

// Canvas'ı başlat
const initializeCanvas = () => {
  const canvasElement = document.getElementById("canvas");
  if (!(canvasElement instanceof HTMLCanvasElement)) {
    console.error("Canvas element is not an HTMLCanvasElement!");
    return;
  }

  // Fabric.js Canvas'ı oluştur
  canvas = new fabric.Canvas(canvasElement, {
    backgroundColor: "white", // Arka plan rengi
  });

  // Varsayılan fırça ayarları
  canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
  canvas.freeDrawingBrush.color = brushColor.value;
  canvas.freeDrawingBrush.width = brushWidth.value;

  // Canvas boyutlarını ekranın tamamına ayarla
  resizeCanvas();

  // Ekran boyutu değiştiğinde canvas'ı yeniden boyutlandır
  window.addEventListener("resize", resizeCanvas);

  // Canvas'ta yapılan işlemleri takip et
  // Add a custom property to track undoing state
  (canvas as any)._isUndoing = false;

  canvas.on("object:added", () => {
    if (!(canvas as any)._isUndoing) {
      undoStack.push(canvas.getObjects().slice(-1)[0]);
      redoStack.length = 0; // Redo yığınını temizle
    }
  });

  console.log("Canvas initialized");
};

// Canvas boyutlarını ekranın tamamına ayarla
const resizeCanvas = () => {
  if (!canvas) return;

  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.setWidth(width);
  canvas.setHeight(height);

  console.log(`Canvas resized to: ${width}x${height}`);
};

// Çizim modunu aç/kapat
const toggleDrawingMode = () => {
  if (!canvas) return;

  isDrawingMode.value = !isDrawingMode.value;
  canvas.isDrawingMode = isDrawingMode.value;
};

// Fırça genişliğini güncelle
const updateBrushWidth = () => {
  if (!canvas?.freeDrawingBrush) return;

  canvas.freeDrawingBrush.width = brushWidth.value;
};

// Fırça rengini güncelle
const updateBrushColor = () => {
  if (!canvas?.freeDrawingBrush) return;

  canvas.freeDrawingBrush.color = brushColor.value;
};

const addRectangle = () => {
  if (!canvas) return;

  const rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: brushColor.value, // Dikdörtgenin rengi seçilen renk
    width: 100,
    height: 60,
    selectable: true, // Seçilebilir
    hasControls: true, // Kontrol noktalarını etkinleştir
  });

  canvas.add(rect);
};
const addCircle = () => {
  if (!canvas) return;

  const circle = new fabric.Circle({
    left: 200,
    top: 200,
    fill: brushColor.value, // Dairenin rengi seçilen renk
    radius: 50,
    selectable: true, // Seçilebilir
    hasControls: true, // Kontrol noktalarını etkinleştir
  });

  canvas.add(circle);
};
const addTriangle = () => {
  if (!canvas) return;

  const triangle = new fabric.Triangle({
    left: 150,
    top: 150,
    fill: brushColor.value, // Üçgenin rengi seçilen renk
    width: 100,
    height: 100,
    selectable: true, // Seçilebilir
    hasControls: true, // Kontrol noktalarını etkinleştir
  });

  canvas.add(triangle);
};
const addText = () => {
  if (!canvas) return;

  const text = new fabric.Textbox("Write Someting", {
    left: 100,
    top: 100,
    fontSize: 5 + brushWidth.value * 5, // Metin boyutu fırça genişliği ile aynı
    fill: brushColor.value, // Metnin rengi seçilen renk
    selectable: true, // Seçilebilir
    hasControls: true, // Kontrol noktalarını etkinleştir
  });

  canvas.add(text);
};

// Canvas'ı kaydet
const saveCanvas = (format: "png" | "jpeg") => {
  if (!canvas) return;

  const dataURL = canvas.toDataURL({
    format: format,
    quality: format === "jpeg" ? 0.8 : 1, // JPEG için kalite ayarı
    multiplier: 1, // Required multiplier property
  });

  // Veriyi bir dosya olarak indirin
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = `canvas.${format}`;
  link.click();

  // Modalı kapat
  showSaveModal.value = false;
};

// Canvas'ı temizle
const clearCanvas = () => {
  if (!canvas) return;
  canvas.clear();
  canvas.renderAll();
};

// Yeni Fonksiyonlar
const eraser = () => {
  if (!canvas) return;

  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.remove(activeObject);
  }
};

const undo = () => {
  if (!canvas || undoStack.length === 0) return;

  const lastObject = undoStack.pop();
  if (lastObject) {
    redoStack.push(lastObject);
    canvas.remove(lastObject);
  }
};

const redo = () => {
  if (!canvas || redoStack.length === 0) return;

  const lastRedoObject = redoStack.pop();
  if (lastRedoObject) {
    undoStack.push(lastRedoObject);
    canvas.add(lastRedoObject);
  }
};

// Canvas'ı başlat
onMounted(() => {
  initializeCanvas();
});
</script>

<style scoped>
canvas {
  display: block;
  border: 1px solid black; /* Çerçeve */
}
button {
  position: relative;
  z-index: 10;
}
</style>
