<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >
    <div
      class="p-6 rounded shadow-lg relative w-96"
      :class="{
        'bg-gray-800 text-white': theme === 'dark',
        'bg-gray-100 text-black': theme === 'light',
      }"
    >
      <!-- Kapatma Butonu -->
      <button
        @click="closeModal"
        class="absolute top-2 right-2 bg-gray-300 text-black rounded-full w-8 h-8 flex items-center justify-center"
      >
        <img src="/icons/X.png" alt="Close" class="w-4 h-4" />
      </button>

      <!-- Başlık -->
      <h2 class="text-lg font-bold mb-4 text-center">Choose Save Format</h2>

      <!-- Dosya İsmi Girişi -->
      <div class="mb-4">
        <label
          for="filename"
          class="block text-sm font-medium"
          :class="theme === 'dark' ? 'text-white' : 'text-gray-700'"
        >
          File Name
        </label>
        <input
          id="filename"
          v-model="fileName"
          type="text"
          placeholder="Enter file name"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
        />
      </div>

      <!-- Format Seçenekleri -->
      <div class="flex gap-4 justify-center">
        <button
          @click="saveAs('png')"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save as PNG
        </button>
        <button
          @click="saveAs('jpeg')"
          class="bg-green-500 text-white px-4 py-2 rounded"
        >
          Save as JPEG
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject } from "vue";

defineProps({
  isVisible: Boolean,
});
const theme = inject("theme") as Ref<string>;

const emit = defineEmits(["close", "save"]);

const fileName = ref("");

const closeModal = () => {
  emit("close");
};

const saveAs = (format: "png" | "jpeg") => {
  if (!fileName.value.trim()) {
    alert("Please enter a file name.");
    return;
  }
  emit("save", { format, fileName: fileName.value });
};
</script>
