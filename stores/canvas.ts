import { defineStore } from "pinia";

export const useCanvasStore = defineStore("canvas", {
  state: () => ({
    objects: [] as any[],
  }),
  actions: {
    addObject(object: any) {
      this.objects.push(object);
    },
    removeObject(index: number) {
      this.objects.splice(index, 1);
    },
    initializeCanvas() {
      console.log("Canvas initialized");
      // Canvas başlatma işlemleri burada yapılabilir
    },
  },
});
