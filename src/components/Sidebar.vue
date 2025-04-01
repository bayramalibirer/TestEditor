<template>
  <div class="flex">
    <!-- Menü Butonu (Küçük Ekranlar İçin) -->
    <button
      class="lg:hidden fixed top-4 left-4 p-2 bg-gray-200 rounded shadow"
      @click="toggleSidebar"
    >
      <i class="fas fa-bars"></i>
    </button>

    <!-- Sidebar -->
    <div
      :class="[
        'w-64 bg-gray-100 p-4 flex flex-col h-screen transition-transform',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0',
      ]"
    >
      <!-- Kapatma Butonu (Küçük Ekranlar İçin) -->
      <button
        class="lg:hidden self-end p-2 bg-gray-200 rounded shadow mb-4"
        @click="toggleSidebar"
      >
        <i class="fas fa-times"></i>
      </button>

      <!-- Üst Butonlar -->
      <div class="flex flex-col gap-4 w-full items-start">
        <!-- Fırça Rengi -->
        <label class="flex items-center gap-2 w-full">
          <input
            type="color"
            v-model="brushColor"
            @input="updateBrushColor"
            class="border rounded w-full"
          />
        </label>

        <!-- Fırça Genişliği -->
        <label class="flex flex-col gap-4 w-full items-start">
          <input
            type="range"
            min="1"
            max="50"
            v-model="brushWidth"
            @input="updateBrushWidth"
            class="border rounded w-full"
          />
        </label>

        <!-- Butonlar (Responsive Grid) -->
        <div class="grid gap-2 w-full lg:grid-cols-1 grid-cols-2">
          <SideBarButton image="/icons/text.png" @click="addText" />
          <SideBarButton
            image="/icons/pencil.png"
            @click="canvasStore.setPencil"
          />
          <SideBarButton
            image="/icons/eraser.png"
            @click="canvasStore.setEraser"
          />
          <SideBarButton image="/icons/rectangle.png" @click="addRectangle" />
          <SideBarButton image="/icons/circle.png" @click="addCircle" />
          <SideBarButton image="/icons/triangle.png" @click="addTriangle" />
          <SideBarButton image="/icons/undo.png" @click="canvasStore.undo" />
          <SideBarButton image="/icons/redo.png" @click="canvasStore.redo" />
        </div>
      </div>

      <!-- Alt Butonlar (Yan Yana ve Tüm Alanı Dolduracak) -->
      <div class="flex gap-2 mt-auto w-full">
        <SideBarButton
          image="/icons/delete.png"
          @click="clearCanvas"
          class="flex-1"
        />
        <SideBarButton
          image="/icons/save.png"
          @click="saveCanvas"
          class="flex-1"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCanvasStore } from "@/stores/canvas";
import SideBarButton from "./Btn/SideBarButton.vue";

const canvasStore = useCanvasStore();

// Sidebar durumu
const isSidebarOpen = ref(false);

// Sidebar'ı aç/kapat
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value; // Durumu tersine çevir
};

// Fırça özellikleri
const brushColor = ref("#000000"); // Varsayılan siyah renk
const brushWidth = ref(10); // Varsayılan genişlik

// Fırça rengi güncelleme
const updateBrushColor = () => {
  canvasStore.setBrushColor(brushColor.value);
};

// Fırça genişliği güncelleme
const updateBrushWidth = () => {
  canvasStore.setBrushWidth(brushWidth.value);
};

const addRectangle = () => {
  canvasStore.addRectangle();
};

const addText = () => {
  canvasStore.addText();
};

const clearCanvas = () => {
  canvasStore.clearCanvas();
};

const saveCanvas = () => {
  canvasStore.saveCanvas();
};

const addCircle = () => {
  canvasStore.addCircle(); // Canvas store'da bir daire ekleme işlemi
};

const addTriangle = () => {
  canvasStore.addTriangle(); // Canvas store'da bir üçgen ekleme işlemi
};
</script>

<style scoped>
/* Sidebar tam ekran yüksekliğinde olacak */
.h-screen {
  height: 100vh;
}

/* Responsive tasarım için */
@media (max-width: 768px) {
  .w-64 {
    width: 100%; /* Küçük ekranlarda tam genişlik */
  }
}

/* Alt Butonlar için */
.flex-1 {
  flex: 1; /* Butonların eşit genişlikte olmasını sağlar */
}
</style>
