import { ref } from "vue";
import * as fabric from "fabric";

let canvas: fabric.Canvas | null = null;
let brushWidth = 5;
let brushColor = "#000000";
let isDrawingMode = false;
const showSaveModal = ref(false);
const undoStack: fabric.Object[] = [];
const redoStack: fabric.Object[] = [];

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

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    (canvas as any)._isUndoing = false;

    canvas.on("object:added", () => {
      if (!(canvas as any)._isUndoing) {
        if (canvas) {
          undoStack.push(canvas.getObjects().slice(-1)[0]);
        }
        redoStack.length = 0;
      }
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
  };

  const eraser = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
    }
  };

  const undo = () => {
    if (!canvas || undoStack.length === 0) return;
    const lastObject = undoStack.pop();
    if (lastObject) {
      redoStack.push(lastObject);
      canvas.remove(lastObject);
    }
  };

  const redo = () => {
    if (!canvas || redoStack.length === 0) return;
    const lastRedoObject = redoStack.pop();
    if (lastRedoObject) {
      undoStack.push(lastRedoObject);
      canvas.add(lastRedoObject);
    }
  };

  const saveCanvas = (format: "png" | "jpeg", filename: string) => {
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: format,
      quality: format === "jpeg" ? 0.8 : 1,
      multiplier: 1,
    });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `${filename}.${format}`;
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
