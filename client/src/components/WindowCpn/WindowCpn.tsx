"use client";

import { JSXElementConstructor, ReactElement, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { APP_TYPE } from "@/lib/types";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { MdMinimize } from "react-icons/md";
import { FaRegSquare } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import {
  APP_NAME,
  checkIsExistNavbarAppList,
  FILE_EXPLORER_APP_NAME,
  filterNavbarListByName,
  getAppByName,
  SETTING_NAME,
} from "@/lib/utils";
import { NAVBAR_APP_LIST } from "../DestopNavbar/DestopNavbar";
import { useFileExplorerWindowStore, useTextDocumentStore } from "@/lib/store";
import { FILE_EXPLORER_APP_LIST } from "../WindowContentCpn/FolderContent/FolderContent";

interface PropType {
  constraints: any;
  contentCpn: React.ReactElement;
  isCloseTargetWindow: boolean;
  isTargetWindowTab: boolean;
  targetWindowName: string;
  targetWindowTabName: string;
  targetWindowTabIcon: ReactElement<
    any,
    string | JSXElementConstructor<any>
  > | null;
  updateIsCloseTargetWindow: (value: boolean) => void;
  updateTargetWindow: (element: React.ReactElement | null) => void;
  updateTargetWindowName: (element: string) => void;
  updateAppList: (list: APP_TYPE[]) => void;
  updateSettingTab?: (value: string) => void;
}

const WindowCpn = (props: PropType) => {
  const {
    constraints,
    contentCpn,
    isCloseTargetWindow,
    isTargetWindowTab,
    targetWindowName,
    targetWindowTabName,
    targetWindowTabIcon,
    updateIsCloseTargetWindow,
    updateTargetWindow,
    updateTargetWindowName,
    updateAppList,
    updateSettingTab,
  } = props;

  const parentControls = useDragControls();

  const windowRef = useRef<HTMLDivElement>(null);
  const windowHeaderRef = useRef<HTMLHeadingElement>(null);
  const windowBodyRef = useRef<HTMLHeadingElement>(null);

  const targetSubWindowName = useFileExplorerWindowStore((state) => {
    return state.targetSubWindowName;
  });

  const itemData = useTextDocumentStore((state) => {
    return state.itemData;
  });

  const updateTargetSubWindowName = useFileExplorerWindowStore((state) => {
    return state.updateTargetSubWindowName;
  });

  const updateIsCloseTargetSubWindow = useFileExplorerWindowStore((state) => {
    return state.updateIsCloseTargetSubWindow;
  });

  const updateItemData = useTextDocumentStore((state) => {
    return state.updateItemData;
  });

  const handleCreateNewTextDocumentItem = () => {
    if (targetWindowName === FILE_EXPLORER_APP_NAME.notepad) {
      if (itemData === null) {
        const newItem = getAppByName(
          FILE_EXPLORER_APP_LIST,
          FILE_EXPLORER_APP_NAME.text_document
        );

        if (newItem !== null) {
          newItem.id = uuidv4();
          console.log("New text document item data:", newItem);
          updateItemData(newItem);
        }
      }
    }
  };

  useEffect(() => {
    handleCreateNewTextDocumentItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFocusWindow = () => {
    console.log("Focus window", targetWindowName);
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
    updateIsCloseTargetSubWindow(true);

    setTimeout(() => {
      updateTargetWindow(null);
      updateTargetWindowName("");
      updateItemData(null);

      const isFixedNavbarApp = checkIsExistNavbarAppList(
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

      // Update navbar icon for FILE EXPLORER app
      if (targetSubWindowName) {
        const isFixedNavbarApp2 = checkIsExistNavbarAppList(
          NAVBAR_APP_LIST,
          targetSubWindowName
        );

        if (!isFixedNavbarApp2) {
          const filterList = filterNavbarListByName(
            NAVBAR_APP_LIST,
            targetSubWindowName
          );

          updateAppList(filterList);
        }

        updateTargetSubWindowName("");
      }

      // Update SETTING tab
      if (targetWindowName === APP_NAME.settings && updateSettingTab)
        updateSettingTab(SETTING_NAME.home);
    }, 100);
  };

  return (
    <AnimatePresence>
      {!isCloseTargetWindow && (
        <motion.div
          ref={windowRef}
          className={`absolute z-10 inset-0 m-auto w-[80%] h-[70%] 2xl:w-[60%] min-h-[600px]
                  border-[1px] border-zinc-300 dark:border-zinc-800 rounded-[10px]`}
          drag
          dragConstraints={constraints}
          dragControls={parentControls}
          dragMomentum={false}
          dragListener={false}
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          // onClick={() => {
          //   handleFocusWindow();
          // }}
        >
          <header
            ref={windowHeaderRef}
            className={`w-full h-[7%] min-h-[40px] text-black dark:text-white bg-white dark:bg-black rounded-t-[10px]
                      flex justify-between items-center`}
            onPointerDown={(e) => {
              parentControls.start(e);
            }}
            onClick={() => {
              handleFocusWindow();
            }}
          >
            {isTargetWindowTab ? (
              <div className="h-full flex items-end px-4">
                <div
                  className="h-[80%] px-4 text-sm text-black dark:text-white flex items-center justify-start
                                gap-20 bg-zinc-300 dark:bg-[#3c3c3c] rounded-t-[6px]"
                >
                  <div className="flex items-center justify-center gap-3">
                    {targetWindowTabIcon}
                    <p>{targetWindowTabName}</p>
                  </div>
                  <button
                    className="p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-[#4f4f4f]"
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
