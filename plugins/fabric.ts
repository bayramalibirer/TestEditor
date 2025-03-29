import * as fabric  from "fabric";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      createFabricCanvas: (canvasId: string) => {
        const canvas = new fabric.Canvas(canvasId);
        return canvas;
      },
    },
  };
});
