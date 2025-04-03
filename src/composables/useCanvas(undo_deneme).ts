import { ref } from "vue";
import * as fabric from "fabric";
import { useHistory } from "./useHistory";

let canvas: fabric.Canvas | null = null;
let brushWidth = 5;
let brushColor = "#000000";
let isDrawingMode = false;
const showSaveModal = ref(false);
let history: ReturnType<typeof useHistory> | null = null;

export const useCanvas = () => {
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

  const toggleDrawingMode = () => {
    if (!canvas) return;

    isDrawingMode = !isDrawingMode;
    canvas.isDrawingMode = isDrawingMode;
  };

  const updateBrushWidth = (width: number) => {
    if (!canvas?.freeDrawingBrush) return;
    brushWidth = width;
    canvas.freeDrawingBrush.width = width;
  };

  const updateBrushColor = (color: string) => {
    if (!canvas?.freeDrawingBrush) return;
    brushColor = color;
    canvas.freeDrawingBrush.color = color;
  };

  const addRectangle = () => {
    if (!canvas) {
      console.error("Canvas instance is not initialized!");
      return;
    }

    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: brushColor,
      width: 100,
      height: 60,
      selectable: true,
      hasControls: true,
    });
    rect.setCoords();
    canvas.add(rect);
  };

  const addCircle = () => {
    if (!canvas) return;

    const circle = new fabric.Circle({
      left: 100,
      top: 200,
      fill: brushColor,
      radius: 50,
      selectable: true,
      hasControls: true,
    });

    canvas.add(circle);
  };

  const addTriangle = () => {
    if (!canvas) return;

    const triangle = new fabric.Triangle({
      left: 100,
      top: 300,
      fill: brushColor,
      width: 100,
      height: 100,
      selectable: true,
      hasControls: true,
    });

    canvas.add(triangle);
  };

  const addText = () => {
    if (!canvas) return;

    const text = new fabric.Textbox("Write Something", {
      left: 300,
      top: 100,
      fontSize: 5 + brushWidth * 5,
      fill: brushColor,
      selectable: true,
      hasControls: true,
    });

    canvas.add(text);
  };

  const clearCanvas = () => {
    if (!canvas) return;
    canvas.clear();
    canvas.renderAll();
    history?.value.clearHistory();
  };

  const eraser = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
    }
  };

  const saveCanvas = (format: "png" | "jpeg") => {
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: format,
      quality: format === "jpeg" ? 0.8 : 1,
      multiplier: 1,
    });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `canvas.${format}`;
    link.click();

    showSaveModal.value = false;
  };

  return {
    canvas,
    brushWidth,
    brushColor,
    isDrawingMode,
    showSaveModal,
    initializeCanvas,
    resizeCanvas,
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
    saveCanvas,
  };
};