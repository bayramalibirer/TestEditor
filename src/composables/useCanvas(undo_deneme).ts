import { ref } from "vue";
import * as fabric from "fabric";
import { useHistory } from "./useHistory";

let canvas: fabric.Canvas | null = null;
let brushWidth = 5;
let brushColor = "#000000";
let isDrawingMode = false;
const showSaveModal = ref(false);
let history: ReturnType<typeof useHistory> | null = null;

export const useCanvas1 = () => {
  const initializeCanvas = (canvasElement: HTMLCanvasElement) => {
    if (!canvasElement) {
      console.error("Canvas element is not provided!");
      return;
    }

    canvas = new fabric.Canvas(canvasElement, {
      backgroundColor: "white",
    });

    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.color = brushColor;
    canvas.freeDrawingBrush.width = brushWidth;

    history = useHistory(canvas);

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    canvas.on("object:added", () => {
      history?.value.saveCanvasState();
    });

    canvas.on("object:modified", () => {
      history?.value.saveCanvasState();
    });

    canvas.on("object:removed", () => {
      history?.value.saveCanvasState();
    });
  };

  const resizeCanvas = () => {
    if (!canvas) {
      console.error("Canvas instance is not initialized!");
      return;
    }

    const container = document.querySelector(
      ".canvas-container"
    ) as HTMLElement;
    if (!container) {
      console.error("Canvas container not found!");
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;

    canvas.setWidth(width);
    canvas.setHeight(height);

    canvas.getObjects().forEach((obj) => obj.setCoords());
    canvas.renderAll();
  };

  const undo = () => {
    history?.value.undo();
  };

  const redo = () => {
    history?.value.redo();
  };


  return {
    canvas,
    brushWidth,
    brushColor,
    isDrawingMode,
    showSaveModal,
    initializeCanvas,
    resizeCanvas,
    undo,
    redo,
    
  };
};