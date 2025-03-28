export function useCanvasHistory(canvas: { loadFromJSON: (json: string, callback: () => void) => void; renderAll: () => void }) {
  let history: string[] = [];
  let currentStep = -1;

  const saveState = () => {
    if (currentStep < history.length - 1) {
      history = history.slice(0, currentStep + 1);
    }
    history.push(JSON.stringify(canvas));
    currentStep++;
  };

  const undo = () => {
    if (currentStep > 0) {
      currentStep--;
      canvas.loadFromJSON(history[currentStep], () => canvas.renderAll());
    }
  };

  const redo = () => {
    if (currentStep < history.length - 1) {
      currentStep++;
      canvas.loadFromJSON(history[currentStep], () => canvas.renderAll());
    }
  };

  return { undo, redo, saveState };
}
