<template>
  <div class="flex h-screen flex-col">
    
    <div class="flex flex-1">
      
      <div class="flex-1">
        <CanvasEditor />
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import CanvasEditor from "@/components/CanvasEditor.vue";
import Deneme from "~/components/Deneme.vue";
</script>
