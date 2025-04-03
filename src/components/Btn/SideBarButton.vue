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
defineProps({
  image: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["click"]);

const handleClick = () => {
  emit("click");
};
</script>

<style scoped>
button {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, width 0.3s, height 0.3s;
  padding: 0;
}

@media (max-width: 768px) {
  button {
    width: 48px;
    height: 48px;
  }
}

@media (max-width: 480px) {
  button {
    width: 40px;
    height: 40px;
  }
}

img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
