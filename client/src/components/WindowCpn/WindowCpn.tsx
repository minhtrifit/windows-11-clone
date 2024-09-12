"use client";

import { useRef } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { MdMinimize } from "react-icons/md";
import { FaRegSquare } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { useNavbarStore, useWindowStore } from "@/lib/store";
import { checkIsNavbarFixedApp, filterNavbarListByName } from "@/lib/utils";
import { NAVBAR_APP_LIST } from "../DestopNavbar/DestopNavbar";

interface PropType {
  constraints: any;
  contentCpn: React.ReactElement;
}

const WindowCpn = (props: PropType) => {
  const { constraints, contentCpn } = props;

  const isCloseTargetWindow = useWindowStore((state) => {
    return state.isCloseTargetWindow;
  });

  const isTargetWindowTab = useWindowStore((state) => {
    return state.isTargetWindowTab;
  });

  const updateIsCloseTargetWindow = useWindowStore((state) => {
    return state.updateIsCloseTargetWindow;
  });

  const targetWindowName = useWindowStore((state) => {
    return state.targetWindowName;
  });

  const targetWindowTabName = useWindowStore((state) => {
    return state.targetWindowTabName;
  });

  const targetWindowTabIcon = useWindowStore((state) => {
    return state.targetWindowTabIcon;
  });

  const updateTargetWindow = useWindowStore((state) => {
    return state.updateTargetWindow;
  });

  const updateTargetWindowName = useWindowStore((state) => {
    return state.updateTargetWindowName;
  });

  const updateAppList = useNavbarStore((state) => {
    return state.updateAppList;
  });

  const parentControls = useDragControls();

  const windowRef = useRef<HTMLDivElement>(null);
  const windowHeaderRef = useRef<HTMLHeadingElement>(null);
  const windowBodyRef = useRef<HTMLHeadingElement>(null);

  const handleFocusWindow = () => {
    console.log("Focus window");
  };

  const handleMinimizeScreen = () => {
    console.log("Minimize screen");
  };

  const handleFullScreen = () => {
    console.log("Full screen");
  };

  const handleClose = () => {
    console.log("Close");
    updateIsCloseTargetWindow(true);
    setTimeout(() => {
      updateTargetWindow(null);
      updateTargetWindowName("");

      const isFixedNavbarApp = checkIsNavbarFixedApp(
        NAVBAR_APP_LIST,
        targetWindowName
      );

      if (!isFixedNavbarApp) {
        const filterList = filterNavbarListByName(
          NAVBAR_APP_LIST,
          targetWindowName
        );

        updateAppList(filterList);
      }
    }, 100);
  };

  return (
    <AnimatePresence>
      {!isCloseTargetWindow && (
        <motion.div
          ref={windowRef}
          className={`absolute inset-0 m-auto w-[80%] h-[70%] 2xl:w-[60%] min-h-[600px]
                  border-[1px] border-zinc-300 dark:border-zinc-800 rounded-[10px]`}
          drag
          dragConstraints={constraints}
          dragControls={parentControls}
          dragMomentum={false}
          dragListener={false}
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={() => {
            handleFocusWindow();
          }}
        >
          <header
            ref={windowHeaderRef}
            className={`w-full h-[7%] min-h-[40px] bg-white dark:bg-black rounded-t-[10px]
                      dark:text-white flex justify-between items-center`}
            onPointerDown={(e) => {
              parentControls.start(e);
            }}
          >
            {isTargetWindowTab ? (
              <div className="h-full flex items-end px-4">
                <div
                  className="h-[80%] px-4 text-sm text-white flex items-center justify-start
                                gap-20 bg-[#3c3c3c] rounded-t-[6px]"
                >
                  <div className="flex items-center justify-center gap-3">
                    {targetWindowTabIcon}
                    <p>{targetWindowTabName}</p>
                  </div>
                  <button
                    className="p-1 rounded-full hover:bg-[#4f4f4f]"
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    <AiOutlineClose size={16} />
                  </button>
                </div>
                <div className="h-[100%] ml-3 p-2 flex items-center">
                  <button
                    className="h-full mt-1 p-1 rounded-full flex items-center justify-center
                                    hover:bg-[#efefef] dark:hover:bg-[#4f4f4f]"
                  >
                    <IoMdAdd size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center px-4">
                <div className="flex items-center justify-center gap-5">
                  {targetWindowTabIcon}
                  <p>{targetWindowTabName}</p>
                </div>
              </div>
            )}
            <div className="h-[100%] pb-2 flex items-center">
              <button
                className={`h-full px-4 flex hover:bg-[#efefef] dark:hover:bg-[#171717]`}
                onClick={() => {
                  handleMinimizeScreen();
                }}
              >
                <MdMinimize size={23} />
              </button>
              <button
                className={`h-full px-4 flex items-center hover:bg-[#efefef] dark:hover:bg-[#171717]`}
                onClick={() => {
                  handleFullScreen();
                }}
              >
                <FaRegSquare size={13} />
              </button>
              <button
                className={`h-full px-4 flex items-center hover:bg-red-500 hover:rounded-se-[10px]`}
                onClick={() => {
                  handleClose();
                }}
              >
                <AiOutlineClose size={16} />
              </button>
            </div>
          </header>
          <div
            ref={windowBodyRef}
            className={`w-full h-[93%] bg-[#171717] text-white rounded-b-[10px]`}
          >
            {contentCpn}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WindowCpn;
