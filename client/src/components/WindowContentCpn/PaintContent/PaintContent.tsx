import { useEffect, useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";

const PaintContent = () => {
  const screenRef = useRef<HTMLDivElement | null>(null);
  const canvasDrawRef = useRef<any>(null);
  const [canvasWidth, setCanvasWidth] = useState<number>(400);
  const [canvasHeight, setCanvasHeight] = useState<number>(400);
  const [saveData, setSaveData] = useState<string>("");

  const handleSave = () => {
    if (canvasDrawRef?.current.getSaveData()) {
      console.log("Save all");
      localStorage.setItem(
        "savedDrawing",
        canvasDrawRef?.current.getSaveData()
      );
    }
  };

  const handleLoad = () => {
    const sData = localStorage.getItem("savedDrawing");
    if (sData) {
      console.log("Load all");
      setSaveData(sData);
    }
  };

  const handleUndo = () => {
    if (canvasDrawRef?.current.undo()) {
      console.log("Undo");
      canvasDrawRef?.current.undo();
    }
  };

  const handleErase = () => {
    localStorage.removeItem("savedDrawing");
    if (canvasDrawRef?.current.eraseAll()) {
      console.log("Erase all");
      canvasDrawRef?.current.eraseAll();
    }
  };

  useEffect(() => {
    if (screenRef?.current) {
      setCanvasHeight(screenRef.current.clientHeight - 100);
      setCanvasWidth(screenRef.current.clientWidth);
    }
  }, [screenRef]);

  return (
    <div ref={screenRef} className="w-full h-full">
      <div className="w-full h-[100px] flex items-start gap-5">
        <button
          onClick={() => {
            handleSave();
          }}
        >
          Save
        </button>
        <button
          onClick={() => {
            handleLoad();
          }}
        >
          Load
        </button>
        <button
          onClick={() => {
            handleUndo();
          }}
        >
          Undo
        </button>
        <button
          onClick={() => {
            handleErase();
          }}
        >
          Erase
        </button>
      </div>
      <CanvasDraw
        ref={canvasDrawRef}
        style={{ width: canvasWidth, height: canvasHeight }}
        hideGrid={true}
        brushColor="red"
        saveData={saveData}
      />
    </div>
  );
};

export default PaintContent;
