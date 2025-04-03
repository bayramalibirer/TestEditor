<template>
  <div
    class="sidebar-container"
    :class="
      theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'
    "
  >
    <!-- Menü Butonu -->
    <SideBarButton
      v-if="!isSidebarOpen"
      image="/icons/menu.png"
      @click="toggleSidebar"
      class="menu-button fixed top-4 left-4 z-10"
    />

    <!-- Sidebar -->
    <div
      :class="[
        'sidebar-content p-4 flex flex-col h-screen transition-all',
        isSidebarOpen ? 'w-64' : 'w-0',
      ]"
    >
      <!-- Kapatma Butonu -->
      <SideBarButton
        v-if="isSidebarOpen"
        image="/icons/X.png"
        @click="toggleSidebar"
        class="close-button self-end mb-4"
      />

      <!-- Tema Butonu -->
      <div
        v-if="isSidebarOpen"
        class="flex justify-start mb-4 absolute top-4 left-4"
      >
        <ThemeButton />
        <!-- Tema butonunu buraya ekledik -->
      </div>

      <!-- Üst Butonlar -->
      <div v-if="isSidebarOpen" class="flex flex-col gap-4 w-full items-start">
        <!-- Fırça Rengi -->
        <label class="flex items-center gap-2 w-full">
          <input
            type="color"
            v-model="brushColor"
            @input="(event) => updateBrushColor((event.target as HTMLInputElement).value)"
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
            @input="(event) => updateBrushWidth(Number((event.target as HTMLInputElement).value))"
            class="border rounded w-full"
          />
        </label>

        <!-- Butonlar (2 Sütunlu Grid) -->
        <div class="grid gap-2 w-full grid-cols-2">
          <SideBarButton image="/icons/text.png" @click="addText" />
          <SideBarButton
            image="/icons/pencil.png"
            @click="toggleDrawingMode"
            :class="isDrawingMode ? 'bg-gray-300' : ''"
          />
          <SideBarButton image="/icons/eraser.png" @click="eraser" />
          <SideBarButton image="/icons/rectangle.png" @click="addRectangle" />
          <SideBarButton image="/icons/circle.png" @click="addCircle" />
          <SideBarButton image="/icons/triangle.png" @click="addTriangle" />
          <SideBarButton image="/icons/undo.png" @click="undo" />
          <SideBarButton image="/icons/redo.png" @click="redo" />
        </div>
      </div>

      <!-- Alt Butonlar (Yan Yana ve Tüm Alanı Dolduracak) -->
      <div v-if="isSidebarOpen" class="flex gap-2 mt-auto w-full">
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

    <!-- Kaydetme Modalı -->
    <SaveModal
      :isVisible="showSaveModal"
      @close="showSaveModal = false"
      @save="handleSave"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, inject } from "vue";
import SideBarButton from "./Btn/SideBarButton.vue";
import SaveModal from "./SaveModal.vue";
import ThemeButton from "./Btn/ThemeButton.vue";
import { useCanvas } from "@/composables/useCanvas";

const theme = inject("theme") as Ref<string>;

const {
  brushWidth,
  brushColor,
  isDrawingMode,
  toggleDrawingMode,
  updateBrushWidth,
  updateBrushColor,
  addRectangle,
  addCircle,
  addTriangle,
  addText,
  clearCanvas,
  eraser,
  undo,
  redo,
  saveCanvas: saveCanvasToFile,
  resizeCanvas,
} = useCanvas();

const isSidebarOpen = ref(true);
const showSaveModal = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
  setTimeout(() => {
    resizeCanvas();
  }, 300);
};

const saveCanvas = async () => {
  toggleSidebar();
  await nextTick();
  resizeCanvas();
  showSaveModal.value = true;
};

const handleSave = ({
  format,
  fileName,
}: {
  format: "png" | "jpeg";
  fileName: string;
}) => {
  saveCanvasToFile(format, fileName);
  showSaveModal.value = false;
};
</script>

<style scoped>
.sidebar-container {
  display: flex;
  height: 100vh;
}

.sidebar-content {
  overflow: hidden;
  transition: width 0.3s ease;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.menu-button,
.close-button {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
