import { defineStore } from "pinia";
import * as fabric from "fabric";

export const useCanvasStore = defineStore("canvas", {
  state: () => ({
    canvas: null as fabric.Canvas | null, // Canvas nesnesi
    selectedColor: "#000000", // Varsayılan renk (siyah)
  }),
  actions: {
    initializeCanvas() {
      const canvasElement = document.getElementById(
        "canvas"
      ) as HTMLCanvasElement;
      if (!canvasElement) {
        console.error("Canvas element not found!");
        return;
      }

      // Fabric.js Canvas'ı oluştur
      this.canvas = new fabric.Canvas("canvas", {
        isDrawingMode: true, // Çizim modunu etkinleştir
        selection: true, // Nesne seçimini etkinleştir
      });

      // Varsayılan fırçayı PencilBrush yap
      this.canvas!.freeDrawingBrush = new fabric.PencilBrush(
        this.canvas as fabric.Canvas
      );

      // Canvas boyutlarını ekranın tamamına ayarla
      this.resizeCanvas();

      // Çizim fırçası ayarları
      if (this.canvas?.freeDrawingBrush) {
        this.canvas.freeDrawingBrush.color = this.selectedColor; // Fırça rengi
        this.canvas.freeDrawingBrush.width = 5; // Fırça genişliği
      }

      // Ekran boyutu değiştiğinde canvas'ı yeniden boyutlandır
      window.addEventListener("resize", this.resizeCanvas);

      console.log(
        "Fabric.js Canvas initialized with drawing mode",
        this.canvas
      );
    },

    resizeCanvas() {
      if (!this.canvas) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      this.canvas.setWidth(width);
      this.canvas.setHeight(height);

      console.log(`Canvas resized to: ${width}x${height}`);
    },

    toggleDrawingMode() {
      if (!this.canvas) return;
      this.canvas.isDrawingMode = !this.canvas.isDrawingMode;
    },

    setBrushWidth(width: number) {
      if (this.canvas?.freeDrawingBrush) {
        this.canvas.freeDrawingBrush.width = width;
      }
    },

    setBrushColor(color: string) {
      this.selectedColor = color; // Renk paletinden seçilen rengi kaydet
      if (this.canvas?.freeDrawingBrush) {
        this.canvas.freeDrawingBrush.color = color;
      }
    },

    addRectangle() {
      if (!this.canvas) return;

      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: this.selectedColor, // Dikdörtgenin rengi seçilen renk
        width: 100,
        height: 60,
        selectable: true, // Seçilebilir
        hasControls: true, // Kontrol noktalarını etkinleştir
      });

      this.canvas.add(rect);
    },

    addTriangle() {
      if (!this.canvas) return;

      const triangle = new fabric.Triangle({
        left: 150,
        top: 150,
        fill: this.selectedColor, // Üçgenin rengi seçilen renk
        width: 100,
        height: 100,
        selectable: true, // Seçilebilir
        hasControls: true, // Kontrol noktalarını etkinleştir
      });

      this.canvas.add(triangle);
    },
    addCircle() {
      if (!this.canvas) return;

      const circle = new fabric.Circle({
        left: 200,
        top: 200,
        fill: this.selectedColor, // Dairenin rengi seçilen renk
        radius: 50,
        selectable: true, // Seçilebilir
        hasControls: true, // Kontrol noktalarını etkinleştir
      });

      this.canvas.add(circle);
    },
    

    clearCanvas() {
      if (this.canvas) {
        this.canvas.clear();
      }
    },

  },
});
