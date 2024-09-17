import { useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useFileExplorerWindowStore, useTextDocumentStore } from "@/lib/store";
import {
  RiFullscreenLine,
  RiFullscreenExitLine,
  RiSave3Fill,
} from "react-icons/ri";
import { MdFavoriteBorder } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { HiOutlineFilm } from "react-icons/hi";
import { APP_TYPE } from "@/lib/types";

const PictureContent = () => {
  const handle = useFullScreenHandle();

  const [scale, setScale] = useState<number>(1);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isFilmMode, setIsFilmMode] = useState<boolean>(false);

  const itemList = useFileExplorerWindowStore((state) => {
    return state.itemList;
  });

  const updateTargetWindowTabName = useFileExplorerWindowStore((state) => {
    return state.updateTargetWindowTabName;
  });

  const itemData = useTextDocumentStore((state) => {
    return state.itemData;
  });

  const updateItemData = useTextDocumentStore((state) => {
    return state.updateItemData;
  });

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
        {isFilmMode && (
          <div
            className="absolute bottom-[48px] left-0 w-full py-3 bg-zinc-200 dark:bg-[#202020]
                          flex items-center justify-center gap-3"
          >
            {itemList?.map((item: APP_TYPE) => {
              if (item?.type === "pictures") {
                return (
                  <div
                    key={uuidv4()}
                    className={`relative w-[100px] h-[60px] rounded-md ${
                      item?.id === itemData?.id && "border-2 border-sky-600"
                    }`}
                    onClick={() => {
                      updateItemData(item);
                      updateTargetWindowTabName(
                        item?.targetElementTabName
                          ? item?.targetElementTabName
                          : "Undefined picture"
                      );
                    }}
                  >
                    <Image
                      src={item?.content ? item?.content : ""}
                      alt="background"
                      layout="fill"
                      objectFit="cover"
                      style={{ borderRadius: "6px" }}
                    />
                  </div>
                );
              }
            })}
          </div>
        )}
        <div
          className="absolute bottom-0 left-0 w-full h-[48px] px-2 bg-zinc-200 dark:bg-[#202020]
                      text-black dark:text-white flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <div
              className="p-2 rounded-md hover:bg-zinc-300 hover:dark:bg-zinc-700"
              onClick={() => {
                setIsFilmMode(!isFilmMode);
              }}
            >
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
