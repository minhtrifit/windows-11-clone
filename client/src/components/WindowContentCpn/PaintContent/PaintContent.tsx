import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CanvasDraw from "react-canvas-draw";
import ColorPicker from "react-pick-color";
import { LuMousePointer2 } from "react-icons/lu";
import { PiResize } from "react-icons/pi";
import { FaPaintBrush, FaFillDrip, FaSearch } from "react-icons/fa";
import { RiSave3Fill } from "react-icons/ri";
import { CgUndo, CgRedo } from "react-icons/cg";
import { MdOutlineCloudUpload } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { ImTextColor } from "react-icons/im";
import { RxEraser } from "react-icons/rx";
import { CiPickerEmpty } from "react-icons/ci";
import { Slider } from "@/components/ui/slider";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

const SingleColorPicker = (props: {
  width: number;
  height: number;
  color: string;
  setBrushColor?: Dispatch<SetStateAction<string>>;
}) => {
  const { width, height, color, setBrushColor } = props;

  return (
    <div
      className="w-4 h-4 rounded-full hover:cursor-pointer"
      style={{ width: width, height: height, backgroundColor: color }}
      onClick={() => {
        if (setBrushColor) setBrushColor(color);
      }}
    ></div>
  );
};

const COLOR_LIST = {
  ["LINE_1"]: [
    "#000",
    "#868686",
    "#8d0223",
    "#ed2831",
    "#ff8432",
    "#fff114",
    "#2cb452",
    "#0ea6e6",
    "#4751ca",
    "#A851A9",
  ],
  ["LINE_2"]: [
    "#fff",
    "#c2c1c6",
    "#bb8464",
    "#FEB1D0",
    "#fcc817",
    "#EEE4B1",
    "#B8E625",
    "#a1dbe9",
    "#7A97C1",
    "#ccc3ec",
  ],
};

const PaintContent = () => {
  const windowRef = useRef<HTMLDivElement | null>(null);
  const canvasDrawRef = useRef<any>(null);

  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [screenHeight, setScreenHeight] = useState<number>(0);
  const [saveData, setSaveData] = useState<string>("");
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState<string>("#000");
  const [activeColorPicker, setActiveColorPicker] = useState<boolean>(false);

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

  const handleMouseMove = (event: any) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleBrushSizeChange = (value: number) => {
    if (value > brushSize) {
      console.log("INCREASE BRUSH SIZE");
      setBrushSize(brushSize + value);
    } else if (value < brushSize) {
      console.log("DECREASE BRUSH SIZE");
      setBrushSize(brushSize - value);
    }
    setBrushSize(value);
  };

  // Init screen size
  useEffect(() => {
    if (windowRef?.current) {
      setScreenHeight(windowRef.current.clientHeight);
      setScreenWidth(windowRef.current.clientWidth);
    }
  }, []);

  // Handle screen resize event
  useEffect(() => {
    const handleResize = () => {
      if (windowRef?.current) {
        setScreenHeight(windowRef.current.clientHeight);
        setScreenWidth(windowRef.current.clientWidth);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={windowRef}
      className="w-full h-full text-black dark:text-white bg-[#efefef] dark:bg-[#252525]"
    >
      <div className="w-full h-[120px] flex flex-col bg-zinc-200 dark:bg-[#282828]">
        <div className="w-full flex items-center gap-2">
          <Menubar className="rounded-none bg-zinc-200 dark:bg-[#282828]">
            <MenubarMenu>
              <MenubarTrigger className="hover:bg-zinc-300 dark:hover:bg-zinc-700">
                File
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  New Window <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem disabled>New Incognito Window</MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>Share</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Email link</MenubarItem>
                    <MenubarItem>Messages</MenubarItem>
                    <MenubarItem>Notes</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem>
                  Print... <MenubarShortcut>⌘P</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="hover:bg-zinc-300 dark:hover:bg-zinc-700">
                Edit
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>Find</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Search the web</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Find...</MenubarItem>
                    <MenubarItem>Find Next</MenubarItem>
                    <MenubarItem>Find Previous</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem>Cut</MenubarItem>
                <MenubarItem>Copy</MenubarItem>
                <MenubarItem>Paste</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="hover:bg-zinc-300 dark:hover:bg-zinc-700">
                View
              </MenubarTrigger>
              <MenubarContent>
                <MenubarCheckboxItem>
                  Always Show Bookmarks Bar
                </MenubarCheckboxItem>
                <MenubarCheckboxItem checked>
                  Always Show Full URLs
                </MenubarCheckboxItem>
                <MenubarSeparator />
                <MenubarItem inset>
                  Reload <MenubarShortcut>⌘R</MenubarShortcut>
                </MenubarItem>
                <MenubarItem disabled inset>
                  Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>Toggle Fullscreen</MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>Hide Sidebar</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <div className="w-[1px] h-[50%] bg-zinc-400 dark:bg-zinc-600"></div>
          <div
            className="p-1 rounded-sm hover:bg-zinc-200 hover:dark:bg-zinc-700"
            onClick={() => {
              handleSave();
            }}
          >
            <RiSave3Fill size={20} />
          </div>
          <div className="w-[1px] h-[50%] bg-zinc-400 dark:bg-zinc-600"></div>
          <div
            className="p-1 rounded-sm hover:bg-zinc-200 hover:dark:bg-zinc-700"
            onClick={() => {
              handleUndo();
            }}
          >
            <CgUndo size={25} />
          </div>
          <div className="p-1 rounded-sm hover:bg-zinc-200 hover:dark:bg-zinc-700">
            <CgRedo size={25} />
          </div>
        </div>
        <div className="relative w-full h-full p-2 flex items-center gap-4 bg-[#f3f3f3] dark:bg-[#202327]">
          <div className="h-full flex items-center justify-center">
            <div
              className="h-full px-6 flex flex-col items-center justify-center gap-1 rounded-md
                          hover:cursor-pointer hover:bg-zinc-300 dark:hover:bg-zinc-700"
              onClick={() => {
                handleLoad();
              }}
            >
              <MdOutlineCloudUpload size={30} />
              <span className="text-[0.75rem]">Load</span>
            </div>
          </div>
          <div className="w-[1px] h-[50%] bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="h-full flex flex-col justify-between">
            <div className="grid grid-cols-3 gap-x-3">
              <div
                className="w-[30px] h-[30px] flex flex-col items-center justify-center gap-1 rounded-md
                          hover:cursor-pointer hover:bg-zinc-300 dark:hover:bg-zinc-700"
              >
                <GoPencil size={20} />
              </div>
              <div
                className="w-[30px] h-[30px] flex flex-col items-center justify-center gap-1 rounded-md
                          hover:cursor-pointer hover:bg-zinc-300 dark:hover:bg-zinc-700"
              >
                <FaFillDrip size={18} />
              </div>
              <div
                className="w-[30px] h-[30px] flex flex-col items-center justify-center gap-1 rounded-md
                          hover:cursor-pointer hover:bg-zinc-300 dark:hover:bg-zinc-700"
              >
                <ImTextColor size={25} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-3">
              <div
                className="w-[30px] h-[30px] flex flex-col items-center justify-center gap-1 rounded-md
                          hover:cursor-pointer hover:bg-zinc-300 dark:hover:bg-zinc-700"
                onClick={() => {
                  handleErase();
                }}
              >
                <RxEraser size={20} />
              </div>
              <div
                className="w-[30px] h-[30px] flex flex-col items-center justify-center gap-1 rounded-md
                          hover:cursor-pointer hover:bg-zinc-300 dark:hover:bg-zinc-700"
              >
                <CiPickerEmpty size={22} />
              </div>
              <div
                className="w-[30px] h-[30px] flex flex-col items-center justify-center gap-1 rounded-md
                          hover:cursor-pointer hover:bg-zinc-300 dark:hover:bg-zinc-700"
              >
                <FaSearch size={18} />
              </div>
            </div>
          </div>
          <div className="w-[1px] h-[50%] bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="h-full flex items-center gap-x-5">
            <div className="h-full flex flex-col justify-between">
              <SingleColorPicker
                width={24}
                height={24}
                color={"#000"}
                setBrushColor={setBrushColor}
              />
              <SingleColorPicker
                width={24}
                height={24}
                color={"#fff"}
                setBrushColor={setBrushColor}
              />
            </div>
            <div className="h-full flex flex-col gap-y-3">
              <div className="grid grid-cols-10 gap-x-3">
                {COLOR_LIST?.LINE_1?.map((color: string) => {
                  return (
                    <SingleColorPicker
                      key={uuidv4()}
                      width={18}
                      height={18}
                      color={color}
                      setBrushColor={setBrushColor}
                    />
                  );
                })}
              </div>
              <div className="grid grid-cols-10 gap-x-3">
                {COLOR_LIST?.LINE_2?.map((color: string) => {
                  return (
                    <SingleColorPicker
                      key={uuidv4()}
                      width={18}
                      height={18}
                      color={color}
                      setBrushColor={setBrushColor}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="w-[1px] h-[50%] bg-zinc-400 dark:bg-zinc-600"></div>
          <div
            className="w-[30px] h-[30px] rounded-full bg-gradient-to-r from-pink-500 to-orange-500"
            onClick={() => {
              setActiveColorPicker(!activeColorPicker);
            }}
          />
          {activeColorPicker && (
            <ColorPicker
              className="absolute z-[999] top-[70px] left-[630px]"
              color={brushColor}
              onChange={(color) => setBrushColor(color.hex)}
            />
          )}
        </div>
      </div>
      <div
        className="flex items-center justify-center bg-red-500 overflow-x-auto overflow-y-auto"
        style={{
          width: screenWidth,
          height: screenHeight - 160,
        }}
        onMouseMove={handleMouseMove}
      >
        <CanvasDraw
          ref={canvasDrawRef}
          style={{ width: screenWidth, height: screenHeight - 140 }}
          brushColor={brushColor}
          brushRadius={brushSize}
          saveData={saveData}
          hideGrid={true}
          immediateLoading={true}
          enablePanAndZoom={true}
        />
      </div>
      <div
        className="w-full h-[40px] rounded-b-md text-[0.75rem] px-4 bg-zinc-200 dark:bg-[#282828]
                    flex items-center justify-between"
      >
        <div className="h-full flex items-center gap-3">
          <div className="flex items-center gap-3">
            <LuMousePointer2 size={16} />
            <p>
              {mousePosition.x}, {mousePosition.y}px
            </p>
          </div>
          <div className="w-[1px] h-[50%] bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="flex items-center gap-3">
            <PiResize size={20} />
            <p>
              {screenWidth} x {screenHeight}px
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FaPaintBrush size={18} />
          <Slider
            className="w-40"
            defaultValue={[brushSize]}
            max={100}
            step={1}
            onValueChange={(value) => {
              handleBrushSizeChange(value[0]);
            }}
          />
          <p>{brushSize}</p>
        </div>
      </div>
    </div>
  );
};

// const PaintContent = () => {
//   return <div className="w-full h-full">Temp PaintContent</div>
// }

export default PaintContent;
