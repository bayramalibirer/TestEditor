<template>
  <button
    :class="[
      'flex items-center justify-center rounded transition-colors',
      'bg-gray-200 hover:bg-gray-300',
    ]"
    @click="handleClick"
  >
    <!-- Resim -->
    <span v-if="image" class="w-full h-full">
      <img
        :src="image"
        alt="button image"
        class="w-full h-full object-contain"
      />
    </span>
  </button>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

// Props tanımları
defineProps({
  image: {
    type: String,
    required: true, // Resim yolu zorunlu
  },
});

// Emit tanımları
const emit = defineEmits(["click"]);

// Tıklama işlemi
const handleClick = () => {
  emit("click"); // Tıklama olayını dışarıya ilet
};
</script>

<style scoped>
button {
  width: 64px; /* Varsayılan genişlik */
  height: 64px; /* Varsayılan yükseklik */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px; /* Kenar yuvarlama */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Hafif gölge efekti */
  transition: background-color 0.3s, width 0.3s, height 0.3s; /* Geçiş efekti */
  padding: 0; /* İçerik boşluğu kaldırıldı */
}

/* Responsive boyutlandırma */
@media (max-width: 768px) {
  button {
    width: 48px; /* Küçük ekranlar için genişlik */
    height: 48px; /* Küçük ekranlar için yükseklik */
  }
}

@media (max-width: 480px) {
  button {
    width: 40px; /* Daha küçük ekranlar için genişlik */
    height: 40px; /* Daha küçük ekranlar için yükseklik */
  }
}

img {
  display: block;
  width: 100%; /* Resim genişliği buton genişliği ile aynı */
  height: 100%; /* Resim yüksekliği buton yüksekliği ile aynı */
  object-fit: contain; /* Resmi kapsayıcıya sığdır */
}
</style>
