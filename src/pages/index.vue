<script setup lang="ts">
import ThemeButton from "@/components/Btn/ThemeButton.vue"; 
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-800 transition duration-300"
  >
    <h1
      class="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6 transition duration-300"
    >
      Welcome to Test Design App
    </h1>
    <nuxt-link
      to="/dashboard"
      class="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
    >
      Go to Dashboard
    </nuxt-link>
    <div class="mt-6">
      <ThemeButton />
    </div>
  </div>
</template>
