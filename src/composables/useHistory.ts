import { ref } from "vue";
import * as fabric from "fabric";

export default class NewFabricHistory {
  private canvas: fabric.Canvas;
  private undoHistory: string[] = [];
  private redoHistory: string[] = [];
  private nextState: string | null = null;
  private processing = false;

  constructor(canvas: fabric.Canvas) {
    this.canvas = canvas;
    this.nextState = this.getNextCanvasHistory();
  }

  saveCanvasState() {
    if (this.processing) return;

    this.undoHistory.push(this.nextState!);
    this.nextState = this.getNextCanvasHistory();
    console.log("Undo History:", this.undoHistory); // Undo geçmişini kontrol et
  }

  undo() {
    this.processing = true;

    const history = this.undoHistory.pop();
    if (history) {
      // Önce canvas durumunu geri yükle
      this.canvas.loadFromJSON(history, () => {
        this.render();

        // Geri yükleme tamamlandıktan sonra mevcut durumu kaydet
        const nextState = this.getNextCanvasHistory();
        if (nextState) {
          this.redoHistory.push(nextState);
        }

        this.nextState = history;

        // this.undoHistory'nin son elemanını sil
        if (this.undoHistory.length > 0) {
          this.undoHistory.pop();
          this.undoHistory.pop();

        }

        this.processing = false;
        console.log(this.undoHistory.length, this.redoHistory.length); // Undo ve redo geçmişini kontrol et
      });
    } else {
      this.processing = false;
    }
  }

  redo() {
    this.processing = true;

    const history = this.redoHistory.pop();
    if (history) {
      this.undoHistory.push(this.getNextCanvasHistory());
      this.nextState = history;
      this.canvas.loadFromJSON(history, this.render.bind(this));
    }

    this.processing = false;
  }

  clearHistory() {
    this.undoHistory = [];
    this.redoHistory = [];
    this.processing = false;
  }

  private render() {
    this.canvas.requestRenderAll();
  }

  private getNextCanvasHistory(): string {
    this.canvas.includeDefaultValues = false;
    const json = this.canvas.toJSON();
    console.log("Canvas JSON:", json); // JSON çıktısını kontrol et
    return JSON.stringify(json);
  }
}

export const useHistory = (canvas: fabric.Canvas) => {
  const history = ref(new NewFabricHistory(canvas));
  return history;
};
