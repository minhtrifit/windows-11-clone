import { useState } from "react";
import { motion } from "framer-motion";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useTextDocumentStore } from "@/lib/store";
import {
  RiFullscreenLine,
  RiFullscreenExitLine,
  RiSave3Fill,
} from "react-icons/ri";
import { MdFavoriteBorder } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { HiOutlineFilm } from "react-icons/hi";

const PictureContent = () => {
  const itemData = useTextDocumentStore((state) => {
    return state.itemData;
  });

  const [scale, setScale] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handle = useFullScreenHandle();

  const handleWheel = (e: any) => {
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((prevScale) => Math.max(1, prevScale + delta));
  };

  const toggleFullScreen = () => {
    if (isFullScreen) {
      handle.exit();
    } else {
      handle.enter();
    }
    setIsFullScreen(!isFullScreen);
  };

  return (
    <FullScreen
      handle={handle}
      className="relative w-full h-full rounded-b-md text-black dark:text-white
                  bg-[#efefef] dark:bg-[#252525] overflow-hidden flex items-center justify-center"
    >
      <div
        onWheel={handleWheel}
        style={{
          cursor: scale > 1 ? "grab" : "default",
        }}
      >
        <motion.img
          src={itemData?.content}
          alt="picture"
          style={{ cursor: "grab" }}
          drag
          dragConstraints={{ top: -500, bottom: 500, left: -500, right: 500 }}
          dragMomentum={false}
          initial={{ scale: 1 }}
          animate={{ scale: scale }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <div
          className="absolute bottom-0 left-0 w-[100%] p-1 bg-zinc-200 dark:bg-[#202020]
                      text-black dark:text-white flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md hover:bg-zinc-300 hover:dark:bg-zinc-700">
              <HiOutlineFilm size={20} />
            </div>
            <div className="w-[1px] h-[25px] bg-zinc-400 dark:bg-zinc-600"></div>
            <div className="p-2 rounded-md hover:bg-zinc-300 hover:dark:bg-zinc-700">
              <MdFavoriteBorder size={20} />
            </div>
            <div className="p-2 rounded-md hover:bg-zinc-300 hover:dark:bg-zinc-700">
              <AiOutlineInfoCircle size={20} />
            </div>
            <div className="w-[1px] h-[25px] bg-zinc-400 dark:bg-zinc-600"></div>
            <div className="flex items-center gap-3">
              <RiSave3Fill size={23} />
              <span className="text-sm">{itemData?.size} KB</span>
            </div>
          </div>
          <div>
            <button
              onClick={toggleFullScreen}
              className="p-2 text-white border-none cursor-pointer rounded-md hover:bg-zinc-300 hover:dark:bg-zinc-700"
            >
              {isFullScreen ? (
                <RiFullscreenExitLine
                  className="text-black dark:text-white"
                  size={23}
                />
              ) : (
                <RiFullscreenLine
                  className="text-black dark:text-white"
                  size={23}
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </FullScreen>
  );
};

export default PictureContent;
