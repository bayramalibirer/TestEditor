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
  }

  undo() {
    this.processing = true;

    const history = this.undoHistory.pop();
    if (history) {
      this.canvas.loadFromJSON(history, () => {
        this.render();

        const nextState = this.getNextCanvasHistory();
        if (nextState) {
          this.redoHistory.push(nextState);
        }

        this.nextState = history;

        if (this.undoHistory.length > 0) {
          this.undoHistory.pop();
          this.undoHistory.pop();
        }

        this.processing = false;
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
    return JSON.stringify(json);
  }
}

export const useHistory = (canvas: fabric.Canvas) => {
  const history = ref(new NewFabricHistory(canvas));
  return history;
};
